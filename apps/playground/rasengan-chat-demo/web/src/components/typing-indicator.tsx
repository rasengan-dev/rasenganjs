type Props = { typing: string[] };

function label(typing: string[]): string {
  if (typing.length === 1) return `${typing[0]} is typing`;
  if (typing.length === 2) return `${typing[0]} and ${typing[1]} are typing`;
  return `${typing.length} people are typing`;
}

export default function TypingIndicator({ typing }: Props) {
  if (typing.length === 0) return null;

  return (
    <div className="flex items-center gap-2.5 mt-3 animate-rise">
      <div className="w-9" />
      <div className="inline-flex items-center gap-2 bg-panel-2 border border-edge rounded-2xl rounded-bl-md px-3.5 py-2.5">
        <span className="flex gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-chakra-soft animate-typing-dot"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
        <span className="text-xs text-mist">{label(typing)}…</span>
      </div>
    </div>
  );
}
