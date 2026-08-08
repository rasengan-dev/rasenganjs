import {
  Gateway,
  GatewayRouter,
  type GatewayClient,
  type GatewayMessageHandler,
} from '@rasenganjs/ws';
import { ChatService } from './chat.service.js';
import {
  LIMITS,
  type Attachment,
  type JoinPayload,
  type SendMessagePayload,
  type TypingPayload,
} from './protocol.js';
import { classify } from './media.js';

/**
 * Rebuild the attachment from scratch instead of trusting the client's
 * object: only `/files/<hex>` urls the FilesController actually serves,
 * only kinds derived from the mimetype server-side.
 */
function sanitizeAttachment(input: unknown): Attachment | null {
  if (typeof input !== 'object' || input === null) return null;
  const raw = input as Record<string, unknown>;

  const url = typeof raw.url === 'string' ? raw.url : '';
  const mimetype = typeof raw.mimetype === 'string' ? raw.mimetype : '';
  const kind = classify(mimetype);
  if (!kind || !/^\/files\/[a-f0-9]{32}(\.[a-z0-9]{1,10})?$/.test(url)) {
    return null;
  }

  return {
    kind,
    url,
    mimetype,
    originalname:
      typeof raw.originalname === 'string'
        ? raw.originalname.slice(0, 255)
        : 'file',
    size: typeof raw.size === 'number' && raw.size >= 0 ? raw.size : 0,
  };
}

/**
 * The chat gateway behind the rasengan-chat-demo web app.
 *
 * A connection starts in the "lobby" (no room): it immediately receives
 * the room list and live `rooms` updates so the login screen can show
 * member counts. "Login" is the `join` event — username uniqueness is
 * checked per-room there. Everything else requires a joined client.
 */
export class ChatGateway extends Gateway {
  path = '/chat';

  constructor(private chatService: ChatService) {
    super();
  }

  onConnect(client: GatewayClient) {
    client.emit('connected', { id: client.id });
    client.emit('rooms', { rooms: this.chatService.roomSummaries() });
  }

  onDisconnect(client: GatewayClient) {
    this.leaveCurrentRoom(client);
  }

  messages(router: GatewayRouter) {
    router.on('join', this.handleJoin);
    router.on('leave', this.handleLeave);
    router.on('message', this.handleMessage);
    router.on('typing', this.handleTyping);
  }

  handleJoin: GatewayMessageHandler<JoinPayload> = (client, data) => {
    const username = (data?.username ?? '').trim();
    // Normalized so "General " and "general" are the same room.
    const room = (data?.room ?? '').trim().toLowerCase();

    const error = this.chatService.validateJoin(room, username);
    if (error) {
      client.emit('joinError', { message: error });
      return;
    }

    // A client can only be in one room; joining while joined = switch.
    this.leaveCurrentRoom(client);

    this.chatService.join(room, client.id, username);
    client.join(room);
    client.data.username = username;
    client.data.room = room;

    client.emit('joined', {
      room,
      username,
      members: this.chatService.memberNames(room),
      history: this.chatService.history(room),
    });

    const notice = this.chatService.record(room, {
      id: crypto.randomUUID(),
      kind: 'join' as const,
      username,
      at: Date.now(),
    });
    // to() without a sender exclusion — the joiner sees their own notice.
    this.server.to(room).emit('system', notice);
    this.server.to(room).emit('members', {
      members: this.chatService.memberNames(room),
    });
    // Lobby screens everywhere refresh their member counts.
    this.server.emit('rooms', { rooms: this.chatService.roomSummaries() });
  };

  handleLeave: GatewayMessageHandler<void> = (client) => {
    this.leaveCurrentRoom(client);
    // Back to the lobby: hand the client a fresh room list.
    client.emit('left', {});
    client.emit('rooms', { rooms: this.chatService.roomSummaries() });
  };

  handleMessage: GatewayMessageHandler<SendMessagePayload> = (client, data) => {
    const room = client.data.room as string | undefined;
    const username = client.data.username as string | undefined;
    if (!room || !username) return;

    const text = (data?.text ?? '').trim().slice(0, LIMITS.message.max);
    const attachment = sanitizeAttachment(data?.attachment);
    // A message must carry something: text, a file, or both.
    if (!text && !attachment) return;

    const message = this.chatService.record(room, {
      id: crypto.randomUUID(),
      username,
      text,
      at: Date.now(),
      ...(attachment ? { attachment } : {}),
    });
    // Includes the sender — the UI renders its own message from this
    // broadcast, so everyone shares one canonical id/timestamp.
    this.server.to(room).emit('message', message);
  };

  handleTyping: GatewayMessageHandler<TypingPayload> = (client, data) => {
    const room = client.data.room as string | undefined;
    const username = client.data.username as string | undefined;
    if (!room || !username) return;

    // Excludes the sender — you never see your own typing indicator.
    client.to(room).emit('typing', {
      username,
      isTyping: data?.isTyping === true,
    });
  };

  /** Shared by explicit `leave`, room switching, and disconnect. */
  private leaveCurrentRoom(client: GatewayClient) {
    const room = client.data.room as string | undefined;
    const username = client.data.username as string | undefined;
    if (!room || !username) return;

    this.chatService.leave(room, client.id);
    client.leave(room);
    delete client.data.room;
    delete client.data.username;

    // Only record/broadcast the notice if someone is left to see it —
    // recording into an emptied custom room would resurrect the feed
    // that ChatService.leave() just dropped.
    const remaining = this.chatService.memberNames(room);
    if (remaining.length > 0) {
      const notice = this.chatService.record(room, {
        id: crypto.randomUUID(),
        kind: 'leave' as const,
        username,
        at: Date.now(),
      });
      this.server.to(room).emit('system', notice);
      this.server.to(room).emit('members', { members: remaining });
    }
    this.server.emit('rooms', { rooms: this.chatService.roomSummaries() });
  }
}
