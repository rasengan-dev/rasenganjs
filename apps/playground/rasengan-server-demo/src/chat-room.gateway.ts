import {
  Gateway,
  GatewayRouter,
  type GatewayClient,
  type GatewayMessageHandler,
} from '@rasenganjs/ws';
import { ChatRoomService } from './chat-room.service';

/**
 * Playground smoke test for @rasenganjs/ws: rooms, broadcasting
 * (with sender-exclusion), and constructor-injected DI, all wired
 * through defineModule({ gateways: [...] }) -> the ModulePlugin system
 * -> app.websocket() (RFC-0001).
 *
 * Connect at ws://localhost:3006/rooms?room=<name> (defaults to "lobby").
 * See scripts/ws-rooms-client.mjs for a multi-client exercise.
 */
export class ChatRoomGateway extends Gateway {
  path = '/rooms';

  constructor(private chatRoomService: ChatRoomService) {
    super();
  }

  onConnect(client: GatewayClient) {
    const room =
      new URL(client.request.url).searchParams.get('room') ?? 'lobby';
    client.data.room = room;
    client.join(room);
    console.log(`[rooms] ${client.id} connected to room "${room}"`);
    client.emit('connected', { id: client.id, room });
  }

  onDisconnect(client: GatewayClient) {
    console.log(
      `[rooms] ${client.id} disconnected from room "${client.data.room}"`
    );
  }

  messages(router: GatewayRouter) {
    router.on('sendMessage', this.handleSendMessage);
    router.on('switchRoom', this.handleSwitchRoom);
  }

  handleSendMessage: GatewayMessageHandler<{ text: string }> = (
    client,
    data
  ) => {
    const room = client.data.room as string;
    const count = this.chatRoomService.recordMessage(room);

    // Everyone else in the room gets the message...
    client
      .to(room)
      .emit('newMessage', { text: data.text, from: client.id, count });
    // ...and the sender gets a direct ack instead (proves emit() vs to() differ).
    client.emit('messageSent', { count });
  };

  handleSwitchRoom: GatewayMessageHandler<{ room: string }> = (
    client,
    data
  ) => {
    const previousRoom = client.data.room as string;
    client.leave(previousRoom);
    client.join(data.room);
    client.data.room = data.room;
    client.emit('roomSwitched', { from: previousRoom, to: data.room });
  };
}
