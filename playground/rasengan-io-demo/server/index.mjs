import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*' },
});

const ROOM = 'lobby';
const users = new Map();

io.on('connection', (socket) => {
  console.log(`[connect] ${socket.id}`);

  socket.emit('system:message', { text: 'Enter a unique name to join the chat.' });

  socket.on('user:register', ({ name }) => {
    const trimmed = name?.trim();
    if (!trimmed) {
      socket.emit('user:error', { message: 'Name cannot be empty.' });
      return;
    }

    const taken = [...users.values()].some((u) => u.name.toLowerCase() === trimmed.toLowerCase());
    if (taken) {
      socket.emit('user:error', { message: `"${trimmed}" is already taken.` });
      return;
    }

    users.set(socket.id, { name: trimmed });
    socket.join(ROOM);

    socket.emit('user:registered', { name: trimmed, users: listUsers() });
    socket.to(ROOM).emit('users:update', { users: listUsers() });
    socket.to(ROOM).emit('system:message', { text: `${trimmed} joined.` });

    console.log(`[register] ${socket.id} as "${trimmed}"`);
  });

  socket.on('chat:message', ({ text }) => {
    const user = users.get(socket.id);
    if (!user) return;

    io.to(ROOM).emit('chat:message', {
      id: crypto.randomUUID(),
      user: user.name,
      text,
      timestamp: Date.now(),
    });
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      io.to(ROOM).emit('users:update', { users: listUsers() });
      socket.to(ROOM).emit('system:message', { text: `${user.name} left.` });
      console.log(`[disconnect] ${socket.id} ("${user.name}")`);
    }
  });
});

function listUsers() {
  return [...users.values()].map((u) => u.name);
}

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`WS server running on http://localhost:${PORT}`);
});
