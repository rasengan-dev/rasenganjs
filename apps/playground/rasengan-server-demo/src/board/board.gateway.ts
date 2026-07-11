import {
  Gateway,
  GatewayRouter,
  type GatewayClient,
  type GatewayMessageHandler,
} from '@rasenganjs/ws';

export class BoardGateway extends Gateway {
  path = '/board';

  constructor() {
    super();
  }

  onConnect(client: GatewayClient) {
    // TODO: Implement board connection logic

    client.emit('connected', { id: client.id });
  }

  onDisconnect(client: GatewayClient) {
    // TODO: Implement board disconnection logic

    console.log(`[board] ${client.id} disconnected`);
  }

  messages(router: GatewayRouter) {
    router.on('sendMessage', this.handleSendMessage);
  }

  handleSendMessage: GatewayMessageHandler<{ text: string }> = (
    client,
    data
  ) => {
    // Emit to all other clients connected on the server
    client.broadcast.emit('message', data);

    // Emit to the sender only
    client.emit('message', data);

    // Emit to all clients in the board
    client.to('board').emit('message', data);
  };
}
