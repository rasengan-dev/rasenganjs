import { useState } from 'react';
import { LIMITS } from '@/lib/protocol';

type Props = {
  room: string;
  onSend: (text: string) => void;
  onTyping: () => void;
};

export default function Composer({ room, onSend, onTyping }: Props) {
  const [text, setText] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <form
      onSubmit={submit}
      className="flex gap-2 border-t border-edge bg-panel/60 backdrop-blur px-4 py-3"
    >
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value.trim() !== '') onTyping();
        }}
        maxLength={LIMITS.message.max}
        placeholder={`Message #${room}`}
        autoFocus
        className="flex-1 bg-panel-2 border border-edge rounded-xl px-4 py-2.5 text-paper placeholder:text-mist/50 outline-none transition focus:border-chakra focus:shadow-glow"
      />
      <button
        type="submit"
        disabled={text.trim() === ''}
        aria-label="Send message"
        className="rounded-xl px-4 grid place-items-center bg-chakra text-white transition cursor-pointer hover:bg-chakra-soft hover:shadow-glow disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {/* Paper-shuriken send glyph */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 11.5 21 3l-8.5 18-2.5-7-7-2.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
