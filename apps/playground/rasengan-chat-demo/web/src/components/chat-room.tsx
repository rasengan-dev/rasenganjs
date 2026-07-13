import type { Attachment, FeedEntry } from '@/lib/protocol';
import Avatar from './avatar';
import Composer from './composer';
import Feed from './feed';
import TypingIndicator from './typing-indicator';

type Props = {
  room: string;
  username: string;
  feed: FeedEntry[];
  members: string[];
  typing: string[];
  onSend: (text: string, attachment?: Attachment) => void;
  onTyping: () => void;
  onLeave: () => void;
};

export default function ChatRoom({
  room,
  username,
  feed,
  members,
  typing,
  onSend,
  onTyping,
  onLeave,
}: Props) {
  return (
    <main className="h-screen flex flex-col max-w-5xl mx-auto md:py-6 md:px-4 animate-rise">
      <div className="flex-1 flex min-h-0 md:rounded-2xl md:border border-edge bg-panel/70 backdrop-blur overflow-hidden">
        {/* ── Conversation column ── */}
        <section className="flex-1 flex flex-col min-w-0">
          <header className="flex items-center gap-3 border-b border-edge bg-panel/60 px-4 py-3">
            <div>
              <h1 className="font-mono font-medium text-lg leading-tight">
                <span className="text-chakra-soft">#</span>
                {room}
              </h1>
              <p className="text-xs text-mist">
                <span className="inline-block size-1.5 rounded-full bg-leaf animate-pulse-dot align-middle mr-1.5" />
                {members.length} online — you are{' '}
                <span className="text-paper font-medium">{username}</span>
              </p>
            </div>

            <button
              onClick={onLeave}
              className="ml-auto font-display font-semibold tracking-wider text-xs uppercase text-mist border border-edge rounded-lg px-3 py-2 transition cursor-pointer hover:text-ember hover:border-ember/50"
            >
              Leave
            </button>
          </header>

          <Feed
            feed={feed}
            self={username}
            footer={<TypingIndicator typing={typing} />}
          />

          <Composer room={room} onSend={onSend} onTyping={onTyping} />
        </section>

        {/* ── Members sidebar ── */}
        <aside className="hidden sm:flex w-52 flex-col border-l border-edge bg-panel/50">
          <h2 className="font-display font-semibold tracking-wider text-xs uppercase text-mist px-4 pt-4 pb-2">
            Online — {members.length}
          </h2>
          <ul className="flex-1 overflow-y-auto px-2 pb-3">
            {members.map((member) => (
              <li
                key={member}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 animate-rise"
              >
                <Avatar name={member} size="sm" />
                <span className="text-sm truncate">
                  {member}
                  {member === username && (
                    <span className="text-mist text-xs ml-1">(you)</span>
                  )}
                </span>
                {typing.includes(member) && (
                  <span className="ml-auto text-[10px] text-chakra-soft font-mono">
                    typing…
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
