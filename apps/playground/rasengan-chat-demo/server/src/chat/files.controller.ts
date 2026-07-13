import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  Controller,
  fileUpload,
  type RouteHandler,
  type Router,
  type UploadedFile,
} from '@rasenganjs/server';
import { diskStorage } from '@rasenganjs/server/upload/disk';
import { classify, contentTypeFor } from './media.js';
import { LIMITS, type Attachment } from './protocol.js';

const UPLOADS_DIR = 'uploads';

/**
 * HTTP side of chat attachments (RFC-0002's fileUpload in action).
 *
 * Flow: the web app POSTs the file here BEFORE sending the chat
 * message, gets back an `Attachment` descriptor, then emits a regular
 * ws `message` carrying that descriptor — the file bytes never travel
 * over the WebSocket.
 */
const upload = fileUpload({
  storage: diskStorage({ destination: UPLOADS_DIR }),
  limits: { fileSize: LIMITS.fileSize, files: 1 },
  // Only the four kinds the chat UI can render.
  fileFilter: (_ctx, info) => classify(info.mimetype) !== null,
});

export class FilesController extends Controller {
  routes(router: Router) {
    router.post('/upload', upload.single('file'), this.upload);
    router.get('/files/:name', this.serve);
  }

  upload: RouteHandler = async (ctx) => {
    const file = ctx.get<UploadedFile>('file');
    if (!file) {
      return ctx.res
        .status(400)
        .json({ error: 'Send one file on the "file" field.' });
    }

    const attachment: Attachment = {
      kind: classify(file.mimetype)!,
      url: `/files/${file.filename}`,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
    return ctx.res.json({ ok: true, attachment });
  };

  serve: RouteHandler = async (ctx) => {
    const name = ctx.params.name ?? '';
    // DiskStorage names are random hex + extension — anything else
    // (especially path separators / dots) is rejected outright.
    if (!/^[a-f0-9]{32}(\.[a-z0-9]{1,10})?$/.test(name)) {
      return ctx.res.status(404).json({ error: 'Not found' });
    }

    try {
      const bytes = await readFile(join(UPLOADS_DIR, name));
      return new Response(new Uint8Array(bytes), {
        headers: {
          'content-type': contentTypeFor(name),
          'content-length': String(bytes.byteLength),
          // Immutable by construction: names are content-unique random hex.
          'cache-control': 'public, max-age=31536000, immutable',
        },
      });
    } catch {
      return ctx.res.status(404).json({ error: 'Not found' });
    }
  };
}
