import { describe, it, expect, vi } from 'vitest';
import { mkdtemp, readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { fileUpload } from '../../../middlewares/upload/index.js';
import { bodyParser } from '../../../middlewares/body.js';
import { diskStorage } from '../../../upload/disk.js';
import { createContext } from '../../../context/index.js';
import type { Context } from '../../../context/types.js';
import type {
  StorageEngine,
  UploadedFile,
} from '../../../middlewares/upload/types.js';

/** Build a real multipart Request from field/file entries. */
function multipartRequest(entries: Array<[string, string | File]>): Request {
  const form = new FormData();
  for (const [name, value] of entries) form.append(name, value);
  return new Request('http://localhost/upload', {
    method: 'POST',
    body: form,
  });
}

function file(name: string, contents: string, type = 'text/plain'): File {
  return new File([contents], name, { type });
}

function createCtx(req: Request): Context {
  return createContext(req);
}

const NEXT = () => Promise.resolve(new Response('handled'));

describe('fileUpload — instance methods', () => {
  it('single() stores the file on ctx.state.file with text fields on body', async () => {
    const ctx = createCtx(
      multipartRequest([
        ['title', 'my avatar'],
        ['avatar', file('me.png', 'PNG-BYTES', 'image/png')],
      ])
    );

    const response = await fileUpload().single('avatar')(ctx, NEXT);
    expect(response.status).toBe(200);

    const stored = ctx.state.file as UploadedFile;
    expect(stored.fieldname).toBe('avatar');
    expect(stored.originalname).toBe('me.png');
    expect(stored.mimetype).toBe('image/png');
    expect(stored.size).toBe(9);
    expect(new TextDecoder().decode(stored.buffer)).toBe('PNG-BYTES');

    expect(ctx.state.body).toEqual({ title: 'my avatar' });
    expect(ctx.body).toEqual({ title: 'my avatar' });
  });

  it('single() rejects a second file on the same field', async () => {
    const ctx = createCtx(
      multipartRequest([
        ['avatar', file('a.png', 'a')],
        ['avatar', file('b.png', 'b')],
      ])
    );

    const response = await fileUpload().single('avatar')(ctx, NEXT);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error.code).toBe('LIMIT_UNEXPECTED_FILE');
  });

  it('single() rejects a file on an undeclared field', async () => {
    const ctx = createCtx(multipartRequest([['other', file('x.txt', 'x')]]));

    const response = await fileUpload().single('avatar')(ctx, NEXT);
    expect(response.status).toBe(400);
    expect((await response.json()).error.code).toBe('LIMIT_UNEXPECTED_FILE');
  });

  it('array() collects files up to maxCount', async () => {
    const ctx = createCtx(
      multipartRequest([
        ['photos', file('1.jpg', 'one')],
        ['photos', file('2.jpg', 'two')],
      ])
    );

    await fileUpload().array('photos', 3)(ctx, NEXT);
    const files = ctx.state.files as UploadedFile[];
    expect(files.map((f) => f.originalname)).toEqual(['1.jpg', '2.jpg']);
  });

  it('array() rejects when maxCount is exceeded', async () => {
    const ctx = createCtx(
      multipartRequest([
        ['photos', file('1.jpg', 'one')],
        ['photos', file('2.jpg', 'two')],
      ])
    );

    const response = await fileUpload().array('photos', 1)(ctx, NEXT);
    expect(response.status).toBe(400);
    expect((await response.json()).error.code).toBe('LIMIT_UNEXPECTED_FILE');
  });

  it('fields() groups files per declared field', async () => {
    const ctx = createCtx(
      multipartRequest([
        ['cover', file('cover.png', 'c')],
        ['gallery', file('g1.png', 'g1')],
        ['gallery', file('g2.png', 'g2')],
      ])
    );

    await fileUpload().fields([
      { name: 'cover', maxCount: 1 },
      { name: 'gallery', maxCount: 5 },
    ])(ctx, NEXT);

    const files = ctx.state.files as Record<string, UploadedFile[]>;
    expect(files.cover).toHaveLength(1);
    expect(files.gallery).toHaveLength(2);
  });

  it('none() rejects any file but keeps text fields', async () => {
    const withFile = createCtx(multipartRequest([['doc', file('d.txt', 'd')]]));
    const rejected = await fileUpload().none()(withFile, NEXT);
    expect(rejected.status).toBe(400);

    const textOnly = createCtx(multipartRequest([['name', 'sasuke']]));
    await fileUpload().none()(textOnly, NEXT);
    expect(textOnly.state.body).toEqual({ name: 'sasuke' });
  });

  it('any() accepts files on every field', async () => {
    const ctx = createCtx(
      multipartRequest([
        ['a', file('a.txt', 'a')],
        ['b', file('b.txt', 'b')],
      ])
    );

    await fileUpload().any()(ctx, NEXT);
    expect((ctx.state.files as UploadedFile[]).length).toBe(2);
  });

  it('passes non-multipart requests through untouched', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ a: 1 }),
      headers: { 'content-type': 'application/json' },
    });
    const ctx = createCtx(req);
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    await fileUpload().single('avatar')(ctx, next);
    expect(next).toHaveBeenCalledOnce();
    expect(ctx.state.file).toBeUndefined();
    expect(req.bodyUsed).toBe(false);
  });
});

describe('fileUpload — limits and filtering', () => {
  it('enforces limits.fileSize with a 413', async () => {
    const ctx = createCtx(
      multipartRequest([['doc', file('big.txt', 'x'.repeat(100))]])
    );

    const response = await fileUpload({ limits: { fileSize: 10 } }).single(
      'doc'
    )(ctx, NEXT);
    expect(response.status).toBe(413);
    expect((await response.json()).error.code).toBe('LIMIT_FILE_SIZE');
  });

  it('enforces limits.files', async () => {
    const ctx = createCtx(
      multipartRequest([
        ['docs', file('1.txt', '1')],
        ['docs', file('2.txt', '2')],
      ])
    );

    const response = await fileUpload({ limits: { files: 1 } }).array('docs')(
      ctx,
      NEXT
    );
    expect(response.status).toBe(400);
    expect((await response.json()).error.code).toBe('LIMIT_FILE_COUNT');
  });

  it('enforces limits.fields', async () => {
    const ctx = createCtx(
      multipartRequest([
        ['a', '1'],
        ['b', '2'],
      ])
    );

    const response = await fileUpload({ limits: { fields: 1 } }).none()(
      ctx,
      NEXT
    );
    expect(response.status).toBe(400);
    expect((await response.json()).error.code).toBe('LIMIT_FIELD_COUNT');
  });

  it('fileFilter rejection produces FILE_FILTER_REJECTED', async () => {
    const ctx = createCtx(
      multipartRequest([['doc', file('evil.exe', 'x', 'application/x-dos')]])
    );

    const response = await fileUpload({
      fileFilter: (_ctx, info) => info.mimetype.startsWith('image/'),
    }).single('doc')(ctx, NEXT);

    expect(response.status).toBe(400);
    expect((await response.json()).error.code).toBe('FILE_FILTER_REJECTED');
  });

  it('rolls back already-stored files when the engine fails mid-batch', async () => {
    const removed: string[] = [];
    const flaky: StorageEngine = {
      async handleFile(_ctx, _file, info) {
        if (info.originalname === '2.txt') throw new Error('disk full');
        return { path: `/fake/${info.originalname}` };
      },
      async removeFile(f) {
        removed.push(f.path as string);
      },
    };

    const ctx = createCtx(
      multipartRequest([
        ['docs', file('1.txt', '1')],
        ['docs', file('2.txt', '2')],
      ])
    );

    await expect(
      fileUpload({ storage: flaky }).array('docs')(ctx, NEXT)
    ).rejects.toThrow('disk full');
    expect(removed).toEqual(['/fake/1.txt']);
  });
});

describe('fileUpload — bodyParser coordination', () => {
  it('reuses the FormData bodyParser already stored on ctx.state', async () => {
    const ctx = createCtx(
      multipartRequest([['avatar', file('me.png', 'bytes', 'image/png')]])
    );

    // bodyParser consumes the request body first...
    await bodyParser()(ctx, () =>
      // ...then fileUpload must succeed WITHOUT re-reading the request.
      fileUpload().single('avatar')(ctx, NEXT)
    );

    const stored = ctx.state.file as UploadedFile;
    expect(stored.originalname).toBe('me.png');
  });

  it('bodyParser({ skipMultipart: true }) leaves the body for fileUpload', async () => {
    const ctx = createCtx(
      multipartRequest([['avatar', file('me.png', 'bytes')]])
    );

    await bodyParser({ skipMultipart: true })(ctx, () =>
      fileUpload().single('avatar')(ctx, NEXT)
    );

    expect((ctx.state.file as UploadedFile).originalname).toBe('me.png');
  });
});

describe('diskStorage', () => {
  it('writes the file with a random name and cleans up via removeFile', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'futon-upload-'));
    const upload = fileUpload({ storage: diskStorage({ destination: dir }) });

    const ctx = createCtx(
      multipartRequest([['doc', file('report.PDF', 'PDF-CONTENT')]])
    );
    await upload.single('doc')(ctx, NEXT);

    const stored = ctx.state.file as UploadedFile;
    expect(stored.destination).toBe(dir);
    expect(stored.path).toMatch(/\.pdf$/); // random hex + lowercased extension
    expect(stored.filename).not.toContain('report');
    expect(await readFile(stored.path as string, 'utf8')).toBe('PDF-CONTENT');

    const engine = diskStorage({ destination: dir });
    await engine.removeFile(stored);
    expect(existsSync(stored.path as string)).toBe(false);
  });

  it('supports destination and filename callbacks', async () => {
    const base = await mkdtemp(join(tmpdir(), 'futon-upload-'));
    const upload = fileUpload({
      storage: diskStorage({
        destination: (_ctx, info) => join(base, info.fieldname),
        filename: (_ctx, info) => `custom-${info.originalname}`,
      }),
    });

    const ctx = createCtx(
      multipartRequest([['invoices', file('march.txt', 'total: 3')]])
    );
    await upload.single('invoices')(ctx, NEXT);

    const stored = ctx.state.file as UploadedFile;
    expect(stored.path).toBe(join(base, 'invoices', 'custom-march.txt'));
    expect(await readdir(join(base, 'invoices'))).toEqual(['custom-march.txt']);
  });
});
