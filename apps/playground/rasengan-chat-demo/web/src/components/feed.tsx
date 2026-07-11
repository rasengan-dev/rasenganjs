import { useEffect, useRef } from 'react';
import { isSystemNotice, type FeedEntry } from '@/lib/protocol';
import Avatar, { avatarColor } from './avatar';

type Props = {
  feed: FeedEntry[];
  self: string;
  /** Rendered under the feed so it scrolls with it (typing indicator). */
  footer?: React.ReactNode;
};

const timeFormat = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
});

/** Group consecutive messages from one author within this window. */
const GROUP_WINDOW = 3 * 60 * 1000;

export default function Feed({ feed, self, footer }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);

  // Follow the bottom only while the user is already there — never yank
  // the scroll position away from someone reading history.
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    pinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (el && pinnedRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [feed, footer]);

  return (
    <div
      ref={scrollerRef}
      onScroll={onScroll}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
    >
      {feed.map((entry, i) => {
        if (isSystemNotice(entry)) {
          return (
            <p
              key={entry.id}
              className="text-center text-xs text-mist py-1.5 animate-rise"
            >
              <span
                className="font-medium"
                style={{ color: avatarColor(entry.username) }}
              >
                {entry.username}
              </span>{' '}
              {entry.kind === 'join' ? 'joined the room' : 'left the room'}
              <span className="mx-1.5 opacity-50">·</span>
              {timeFormat.format(entry.at)}
            </p>
          );
        }

        const prev = feed[i - 1];
        const grouped =
          prev !== undefined &&
          !isSystemNotice(prev) &&
          prev.username === entry.username &&
          entry.at - prev.at < GROUP_WINDOW;
        const own = entry.username === self;

        return (
          <div
            key={entry.id}
            className={`flex gap-2.5 animate-rise ${own ? 'flex-row-reverse' : ''} ${
              grouped ? 'mt-0.5' : 'mt-3'
            }`}
          >
            {/* Avatar column stays for alignment even when grouped */}
            <div className="w-9 shrink-0">
              {!grouped && !own && <Avatar name={entry.username} />}
            </div>

            <div className={`max-w-[72%] ${own ? 'text-right' : ''}`}>
              {!grouped && (
                <p className={`text-xs mb-1 ${own ? 'text-mist' : ''}`}>
                  {!own && (
                    <span
                      className="font-semibold"
                      style={{ color: avatarColor(entry.username) }}
                    >
                      {entry.username}
                    </span>
                  )}
                  <span className="text-mist/70 ml-1.5">
                    {timeFormat.format(entry.at)}
                  </span>
                </p>
              )}
              <div
                className={`inline-block rounded-2xl px-3.5 py-2 text-[0.94rem] leading-relaxed break-words text-left ${
                  own
                    ? 'bg-chakra text-white rounded-br-md'
                    : 'bg-panel-2 border border-edge rounded-bl-md'
                }`}
              >
                {entry.text}
              </div>
            </div>
          </div>
        );
      })}

      {footer}
    </div>
  );
}
