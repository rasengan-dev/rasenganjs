import { useState } from 'react';
import type { Attachment } from '@/lib/protocol';
import { extensionOf, fileUrl, formatBytes } from '@/lib/upload';

/**
 * One message body per attachment kind:
 *   image    → inline thumbnail, click opens a full-size lightbox
 *   video    → inline <video controls>
 *   audio    → compact player card
 *   document → file card with extension badge + open/download actions
 */
export default function AttachmentView({
  attachment,
}: {
  attachment: Attachment;
}) {
  switch (attachment.kind) {
    case 'image':
      return <ImageAttachment attachment={attachment} />;
    case 'video':
      return <VideoAttachment attachment={attachment} />;
    case 'audio':
      return <AudioAttachment attachment={attachment} />;
    case 'document':
      return <DocumentAttachment attachment={attachment} />;
  }
}

// ── Image: thumbnail + lightbox preview ─────────────────────────────

function ImageAttachment({ attachment }: { attachment: Attachment }) {
  const [open, setOpen] = useState(false);
  const src = fileUrl(attachment);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block cursor-zoom-in"
        aria-label={`Preview ${attachment.originalname}`}
      >
        <img
          src={src}
          alt={attachment.originalname}
          loading="lazy"
          className="max-h-64 max-w-full rounded-lg border border-edge object-cover"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={attachment.originalname}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 grid place-items-center bg-ink/90 backdrop-blur-sm p-6 cursor-zoom-out animate-rise"
        >
          <img
            src={src}
            alt={attachment.originalname}
            className="max-h-[82vh] max-w-full rounded-xl shadow-2xl"
          />
          <div className="mt-3 flex items-center gap-3 text-sm text-mist">
            <span className="text-paper font-medium truncate max-w-[50vw]">
              {attachment.originalname}
            </span>
            <span>{formatBytes(attachment.size)}</span>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-chakra-soft hover:underline"
            >
              Open original
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// ── Video: inline player ────────────────────────────────────────────

function VideoAttachment({ attachment }: { attachment: Attachment }) {
  return (
    <div>
      <video
        controls
        preload="metadata"
        src={fileUrl(attachment)}
        className="max-h-64 max-w-full rounded-lg border border-edge bg-black"
      />
      <p className="mt-1 text-xs text-mist truncate">
        {attachment.originalname} · {formatBytes(attachment.size)}
      </p>
    </div>
  );
}

// ── Audio: compact player card ──────────────────────────────────────

function AudioAttachment({ attachment }: { attachment: Attachment }) {
  return (
    <div className="min-w-56">
      <p className="mb-1.5 flex items-center gap-1.5 text-xs text-mist truncate">
        {/* Note glyph */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9 18V5l12-2v13a3 3 0 1 1-2-2.83V7.6L11 9.1V19a3 3 0 1 1-2-2.83Z" />
        </svg>
        {attachment.originalname} · {formatBytes(attachment.size)}
      </p>
      <audio
        controls
        preload="metadata"
        src={fileUrl(attachment)}
        className="w-full h-10"
      />
    </div>
  );
}

// ── Document: file card with actions ────────────────────────────────

function DocumentAttachment({ attachment }: { attachment: Attachment }) {
  const src = fileUrl(attachment);
  return (
    <div className="flex items-center gap-3 min-w-56">
      {/* Extension badge doubles as the file icon */}
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-chakra/15 border border-chakra/30 font-mono text-[10px] font-bold text-chakra-soft">
        {extensionOf(attachment.originalname)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {attachment.originalname}
        </p>
        <p className="text-xs text-mist">{formatBytes(attachment.size)}</p>
      </div>
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${attachment.originalname}`}
        className="grid size-8 shrink-0 place-items-center rounded-lg border border-edge text-mist transition hover:text-chakra-soft hover:border-chakra/50"
      >
        {/* Open-in-new glyph */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M14 4h6v6M20 4 10 14M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
        </svg>
      </a>
    </div>
  );
}
