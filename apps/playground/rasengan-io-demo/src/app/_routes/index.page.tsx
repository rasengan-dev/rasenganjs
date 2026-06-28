import { useState } from 'react';
import { useConnection, useEvent, useEmit } from '@rasenganjs/io';

type ServerEvents = {
  'system:message': (data: { text: string }) => void;
  'chat:message': (data: {
    id: string;
    user: string;
    text: string;
    timestamp: number;
  }) => void;
  'user:registered': (data: { name: string; users: string[] }) => void;
  'user:error': (data: { message: string }) => void;
  'users:update': (data: { users: string[] }) => void;
};

type ClientEvents = {
  'user:register': (data: { name: string }) => void;
  'chat:message': (data: { text: string }) => void;
};

export default function HomePage() {
  const { isConnected, isConnecting, error } = useConnection();
  const emit = useEmit<ClientEvents>();

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [registerError, setRegisterError] = useState('');

  const [messages, setMessages] = useState<
    Array<{ id: string; user: string; text: string; timestamp: number }>
  >([]);
  const [users, setUsers] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState('');

  useEvent<ServerEvents, 'system:message'>('system:message', (data) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        user: 'system',
        text: data.text,
        timestamp: Date.now(),
      },
    ]);
  });

  useEvent<ServerEvents, 'chat:message'>('chat:message', (data) => {
    setMessages((prev) => [...prev, data]);
  });

  useEvent<ServerEvents, 'user:registered'>('user:registered', (data) => {
    setLoggedIn(true);
    setUsername(data.name);
    setUsers(data.users);
    setRegisterError('');
  });

  useEvent<ServerEvents, 'user:error'>('user:error', (data) => {
    setRegisterError(data.message);
  });

  useEvent<ServerEvents, 'users:update'>('users:update', (data) => {
    setUsers(data.users);
  });

  const handleRegister = () => {
    if (!loginInput.trim()) return;
    emit('user:register', { name: loginInput.trim() });
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    // setMessages((prev) => [
    //   ...prev,
    //   { id: crypto.randomUUID(), user: username, text: chatInput.trim(), timestamp: Date.now() },
    // ]);
    emit('chat:message', { text: chatInput.trim() });
    setChatInput('');
  };

  if (!loggedIn) {
    return (
      <div
        style={{
          maxWidth: 400,
          margin: '80px auto',
          fontFamily: 'sans-serif',
          textAlign: 'center',
        }}
      >
        <h1>Rasengan IO</h1>

        <div style={{ marginBottom: 16 }}>
          {isConnecting && (
            <span style={{ color: '#f59e0b' }}>Connecting...</span>
          )}
          {isConnected && <span style={{ color: '#22c55e' }}>Connected</span>}
          {error && (
            <span style={{ color: '#ef4444' }}>Error: {error.message}</span>
          )}
        </div>

        <div style={{ marginTop: 32 }}>
          <input
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
            placeholder="Choose a unique name"
            disabled={!isConnected}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
              fontSize: 16,
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleRegister}
            disabled={!isConnected}
            style={{
              width: '100%',
              marginTop: 8,
              padding: '10px',
              borderRadius: 6,
              border: 'none',
              background: isConnected ? '#3b82f6' : '#9ca3af',
              color: '#fff',
              fontSize: 16,
              cursor: isConnected ? 'pointer' : 'not-allowed',
            }}
          >
            Join Chat
          </button>
          {registerError && (
            <p style={{ color: '#ef4444', marginTop: 8 }}>{registerError}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}
    >
      <h1>Rasengan IO</h1>

      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>
          Logged in as <strong>{username}</strong>
        </span>
        <span style={{ color: '#6b7280' }}>{users.length} online</span>
      </div>

      <div
        style={{
          height: 300,
          overflowY: 'auto',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          background: '#f9fafb',
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: 8 }}>
            <strong
              style={{
                color:
                  msg.user === 'system'
                    ? '#6b7280'
                    : msg.user === 'You'
                      ? '#22c55e'
                      : '#3b82f6',
              }}
            >
              {msg.user}:
            </strong>{' '}
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #d1d5db',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!chatInput.trim()}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            background: chatInput.trim() ? '#3b82f6' : '#9ca3af',
            color: '#fff',
            cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
