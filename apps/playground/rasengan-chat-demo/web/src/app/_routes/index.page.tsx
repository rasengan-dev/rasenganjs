import { PageComponent } from 'rasengan';
import { useChat } from '@/hooks/use-chat';
import Lobby from '@/components/lobby';
import ChatRoom from '@/components/chat-room';

const Page: PageComponent = () => {
  const chat = useChat();

  // Also shown during SSR — the socket only connects client-side.
  if (chat.status === 'connecting') {
    return (
      <main className="min-h-screen grid place-items-center">
        <div className="text-center animate-rise">
          {/* Spinning chakra ring */}
          <div className="mx-auto size-12 rounded-full border-2 border-edge border-t-chakra animate-spin" />
          <p className="font-display font-semibold tracking-widest uppercase text-mist mt-4">
            Connecting…
          </p>
          <p className="text-mist/60 text-xs mt-1 font-mono">
            expecting the gateway on ws://localhost:3007/chat
          </p>
        </div>
      </main>
    );
  }

  if (chat.status === 'chat' && chat.room && chat.username) {
    return (
      <ChatRoom
        room={chat.room}
        username={chat.username}
        feed={chat.feed}
        members={chat.members}
        typing={chat.typing}
        onSend={chat.sendMessage}
        onTyping={chat.notifyTyping}
        onLeave={chat.leave}
      />
    );
  }

  return (
    <Lobby rooms={chat.rooms} joinError={chat.joinError} onJoin={chat.join} />
  );
};

Page.metadata = {
  title: 'ChakraChat — Rasengan WS demo',
  description:
    'Real-time chat rooms built with @rasenganjs/server and @rasenganjs/ws',
};

export default Page;
