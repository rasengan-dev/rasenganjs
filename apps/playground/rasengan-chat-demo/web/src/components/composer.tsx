import { useEffect, useRef, useState } from 'react';
import { LIMITS, type Attachment } from '@/lib/protocol';
import {
  ACCEPT,
  extensionOf,
  formatBytes,
  kindOf,
  uploadFile,
} from '@/lib/upload';

type Props = {
  room: string;
  onSend: (text: string, attachment?: Attachment) => void;
  onTyping: () => void;
};

export default function Composer({ room, onSend, onTyping }: Props) {
  const [text, setText] = useState('');
  const [staged, setStaged] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Object URL for the staged image thumbnail, revoked on replace/unmount.
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  useEffect(() => {
    if (!staged || kindOf(staged) !== 'image') {
      setThumbnail(null);
      return;
    }
    const url = URL.createObjectURL(staged);
    setThumbnail(url);
    return () => URL.revokeObjectURL(url);
  }, [staged]);

  const stage = (file: File | undefined) => {
    setError(null);
    if (!file) return;
    if (file.size > LIMITS.fileSize) {
      setError(
        `"${file.name}" is larger than ${formatBytes(LIMITS.fileSize)}.`
      );
      return;
    }
    setStaged(file);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if ((!trimmed && !staged) || uploading) return;

    // Upload first (HTTP), then send the ws message referencing the file.
    if (staged) {
      setUploading(true);
      setError(null);
      try {
        const attachment = await uploadFile(staged);
        onSend(trimmed, attachment);
        setStaged(null);
        setText('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed.');
      } finally {
        setUploading(false);
      }
      return;
    }

    onSend(trimmed);
    setText('');
  };

  return (
    <form
      onSubmit={submit}
      className="border-t border-edge bg-panel/60 backdrop-blur px-4 py-3"
    >
      {/* Staged attachment preview — what will be sent with the message */}
      {staged && (
        <div className="mb-2 flex items-center gap-3 rounded-xl border border-edge bg-panel-2 px-3 py-2 animate-rise">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={staged.name}
              className="size-10 rounded-lg object-cover border border-edge"
            />
          ) : (
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-chakra/15 border border-chakra/30 font-mono text-[10px] font-bold text-chakra-soft">
              {extensionOf(staged.name)}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">{staged.name}</p>
            <p className="text-xs text-mist">
              {uploading
                ? 'Uploading…'
                : `${kindOf(staged)} · ${formatBytes(staged.size)}`}
            </p>
          </div>
          {uploading ? (
            <span className="size-4 shrink-0 rounded-full border-2 border-edge border-t-chakra animate-spin" />
          ) : (
            <button
              type="button"
              onClick={() => setStaged(null)}
              aria-label="Remove attachment"
              className="grid size-7 shrink-0 place-items-center rounded-lg text-mist transition cursor-pointer hover:text-ember"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {error && (
        <p role="alert" className="mb-2 text-xs text-ember animate-rise">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => {
            stage(e.target.files?.[0]);
            e.target.value = ''; // same file can be re-picked later
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          aria-label="Attach a file"
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-edge text-mist transition cursor-pointer hover:text-chakra-soft hover:border-chakra/50 disabled:opacity-40"
        >
          {/* Paperclip glyph */}
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="m21 11.5-8.5 8.5a6 6 0 0 1-8.5-8.5l8.5-8.5a4 4 0 0 1 5.7 5.7L9.7 17.2a2 2 0 0 1-2.9-2.9l7.8-7.8" />
          </svg>
        </button>

        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.trim() !== '') onTyping();
          }}
          maxLength={LIMITS.message.max}
          placeholder={
            staged ? 'Add a caption… (optional)' : `Message #${room}`
          }
          autoFocus
          className="flex-1 bg-panel-2 border border-edge rounded-xl px-4 py-2.5 text-paper placeholder:text-mist/50 outline-none transition focus:border-chakra focus:shadow-glow"
        />
        <button
          type="submit"
          disabled={(text.trim() === '' && !staged) || uploading}
          aria-label="Send message"
          className="rounded-xl px-4 grid place-items-center bg-chakra text-white transition cursor-pointer hover:bg-chakra-soft hover:shadow-glow disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {/* Paper-shuriken send glyph */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 11.5 21 3l-8.5 18-2.5-7-7-2.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
