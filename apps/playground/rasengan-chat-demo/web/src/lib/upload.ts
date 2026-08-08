import type { Attachment, AttachmentKind } from './protocol';

/**
 * HTTP side of chat attachments. Files are POSTed to the chat server
 * BEFORE the ws message is sent; the message then carries only the
 * returned `Attachment` descriptor — bytes never travel over the socket.
 */

const WS_URL =
  (import.meta.env.RASENGAN_CHAT_WS_URL as string | undefined) ??
  'ws://localhost:3007/chat';

/** The chat server's HTTP origin, derived from the ws endpoint. */
export const SERVER_ORIGIN = WS_URL.replace(/^ws/, 'http').replace(
  /\/chat$/,
  ''
);

/** Absolute URL for an attachment's server-relative `/files/...` path. */
export function fileUrl(attachment: Attachment): string {
  return SERVER_ORIGIN + attachment.url;
}

/** Mirror of the server's accepted types (see server/src/chat/media.ts). */
export const ACCEPT = [
  'image/*',
  'video/*',
  'audio/*',
  '.pdf',
  '.txt',
  '.csv',
  '.md',
  '.json',
  '.zip',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
].join(',');

/** Client-side guess of the kind, for the staged preview before upload. */
export function kindOf(file: File): AttachmentKind {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('audio/')) return 'audio';
  return 'document';
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Uppercased extension for document icons — "PDF", "DOCX", "FILE". */
export function extensionOf(name: string): string {
  const extension = /\.([A-Za-z0-9]{1,10})$/.exec(name)?.[1];
  return (extension ?? 'file').toUpperCase().slice(0, 4);
}

export async function uploadFile(file: File): Promise<Attachment> {
  const form = new FormData();
  form.append('file', file);

  const response = await fetch(`${SERVER_ORIGIN}/upload`, {
    method: 'POST',
    body: form,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.attachment) {
    const message =
      data?.error?.message ??
      data?.error ??
      `Upload failed (${response.status})`;
    throw new Error(message);
  }
  return data.attachment as Attachment;
}
