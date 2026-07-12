# RFC 0002 — File Upload Middleware for Futon

**Status:** Implemented (v1)  
**Author:** Rasengan.js Core Team  
**Date:** 2026-07-11 · Implemented 2026-07-12

## Executive Summary

This RFC proposes `fileUpload()`, a Multer-style file upload middleware built into `@rasenganjs/futon`.

The middleware parses `multipart/form-data` requests using the Web Standard `Request.formData()` API, applies limits and filtering, hands accepted files to a pluggable storage engine, and exposes the results on `ctx.state` — giving Rasengan Server controllers the `upload.single('avatar')` ergonomics Express users know from Multer, with zero runtime dependencies.

Uploads are an HTTP concern (Request → Response), so unlike WebSockets (RFC-0001), this feature belongs **inside** Futon.

---

# Motivation

Handling file uploads today requires hand-rolling everything on top of `bodyParser()`:

```ts
// today
const form = ctx.get('body'); // raw FormData, if bodyParser ran
const file = form.get('avatar'); // File | string | null — untyped, unvalidated
// no size limits per file, no count limits, no storage, no cleanup
```

Every real application needs the same missing pieces:

- Field-aware file extraction (`single`, `array`, `fields`)
- Per-file size and count limits with proper `413`/`400` responses
- MIME/extension filtering before storage
- A storage abstraction (memory, disk, object storage)
- Cleanup of already-stored files when a later file in the batch is rejected

Express solved this with Multer. Rasengan should offer the same capability natively, portable across runtimes.

---

# Goals

- Multer-familiar API surface (`single`, `array`, `fields`, `none`, `any`).
- Zero runtime dependencies — parse with the Web Standard `formData()`.
- Pluggable storage via a public `StorageEngine` interface; `MemoryStorage` and `DiskStorage` shipped.
- Keep WinterCG builds clean: `node:fs` never enters a workerd bundle.
- Safe coordination with the existing eager `bodyParser()` (a Request body reads once).
- Multer-compatible error codes (`LIMIT_FILE_SIZE`, `LIMIT_FILE_COUNT`, `LIMIT_UNEXPECTED_FILE`, …).
- Rollback of stored files when a request is rejected mid-batch.

## Non-goals

- Streaming multipart parsing (GB-scale uploads). The v1 parser buffers via `formData()`; the public API deliberately hides this so a streaming parser can replace the internals in a later minor release.
- Object-storage engines (S3, R2). The `StorageEngine` interface makes them user- or ecosystem-writable; none ship in v1.
- Resumable/chunked upload protocols (tus, multipart-by-parts).
- Client-side upload helpers.

---

# Proposed API

```ts
import { fileUpload } from '@rasenganjs/futon'; // re-exported by @rasenganjs/server
import { diskStorage } from '@rasenganjs/futon/upload/disk';

const upload = fileUpload({
  storage: diskStorage({ destination: 'uploads/' }), // default: MemoryStorage
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
  fileFilter: (ctx, info) => info.mimetype.startsWith('image/'),
});

class MediaController extends Controller {
  routes(router: Router) {
    // drops into the existing per-route middleware slot
    router.post('/avatar', upload.single('avatar'), this.setAvatar);
    router.post('/gallery', upload.array('photos', 5), this.addPhotos);
    router.post(
      '/mixed',
      upload.fields([{ name: 'cover', maxCount: 1 }]),
      this.mixed
    );
  }

  setAvatar: RouteHandler = async (ctx) => {
    const file = ctx.get('file');
    // { fieldname, originalname, mimetype, size, path, filename, destination }
    return ctx.res.json({ ok: true, path: file.path });
  };
}
```

Results land on the context state:

| Method                | Populates                                         |
| --------------------- | ------------------------------------------------- |
| `.single(field)`      | `ctx.state.file: UploadedFile`                    |
| `.array(field, max?)` | `ctx.state.files: UploadedFile[]`                 |
| `.fields([...])`      | `ctx.state.files: Record<string, UploadedFile[]>` |
| `.any()`              | `ctx.state.files: UploadedFile[]`                 |
| `.none()`             | files rejected; text fields only                  |

Text fields are always exposed as a plain record on `ctx.state.body`, matching Multer's `req.body` behaviour.

---

# Types

```ts
interface UploadedFile {
  fieldname: string;
  originalname: string;
  mimetype: string;
  size: number;
  // storage-dependent:
  buffer?: Uint8Array; // MemoryStorage
  path?: string; // DiskStorage
  filename?: string; // DiskStorage
  destination?: string; // DiskStorage
}

interface StorageEngine {
  handleFile(
    ctx: Context,
    file: File,
    info: Pick<UploadedFile, 'fieldname' | 'originalname' | 'mimetype' | 'size'>
  ): Promise<Partial<UploadedFile>>;
  removeFile(file: UploadedFile): Promise<void>;
}

interface UploadOptions {
  storage?: StorageEngine; // default: MemoryStorage
  limits?: {
    fileSize?: number; // bytes, per file
    files?: number; // total file count
    fields?: number; // total text field count
  };
  fileFilter?: (ctx: Context, info: FileInfo) => boolean | Promise<boolean>;
}
```

`StorageEngine` mirrors Multer's `_handleFile`/`_removeFile` contract, so custom engines (S3, R2, GCS) are straightforward ports.

---

# Architecture

```
multipart/form-data Request
          │
          ▼
   fileUpload middleware
          │
   ┌──────┴────────────────────────────┐
   │ 1. obtain FormData                │  reuse ctx.state.body if bodyParser
   │                                   │  already parsed it; else formData()
   │ 2. field selection                │  unexpected file → 400
   │ 3. fileFilter + limits            │  fileSize/files → 413/400
   │ 4. storage.handleFile per file    │  rollback via removeFile on failure
   │ 5. populate ctx.state             │  file / files / body
   └──────┬────────────────────────────┘
          ▼
        next()
```

## Placement

`packages/framework/futon/src/middlewares/upload/`

- `index.ts` — `fileUpload()`, instance methods, orchestration
- `types.ts` — `UploadedFile`, `StorageEngine`, `UploadOptions`, error codes
- `memory.ts` — `MemoryStorage` (default)

`packages/framework/futon/src/upload/disk.ts` — `DiskStorage`, exposed **only** through the `./upload/disk` subpath export. This is the same isolation principle as `@rasenganjs/ws`'s type-only `ioredis` import, applied at the package-exports level: importing the main entry never pulls `node:fs`, so workerd/WinterCG bundles stay clean. `MemoryStorage` works on every runtime.

## DiskStorage mechanics

```
handleFile(ctx, file, info)
  1. destination ── static string, or callback (ctx, info) => string
     └─ mkdir(destination, { recursive: true })
  2. filename ──── callback (ctx, info) => string, or the default:
     └─ crypto random hex + sanitized extension of originalname
  3. write ─────── file.stream()  →  node:fs write stream (flags 'wx')
     └─ on failure: unlink the partial file, rethrow
  4. return ────── { destination, filename, path }
```

- **The write is a stream, not a copy** — `file.stream()` pipes into a
  `createWriteStream`, allocating no second buffer on top of what
  `formData()` already holds.
- **`originalname` never becomes a path.** It is user-controlled
  (`filename="../../etc/cron.d/x"`), so the default name is random hex
  keeping only a sanitized, lowercased extension. A user's `filename`
  callback may choose to trust it — explicitly.
- **Engine placement rule:** engines with no dependencies live in futon
  (`MemoryStorage` on the main entry, `DiskStorage` behind the subpath);
  engines with vendor SDKs (S3, R2, GCS) live in ecosystem packages or
  user-land via the public `StorageEngine` interface. `node:fs` is
  natively available on Node, Bun and Deno, so one disk engine covers
  every runtime that has a disk — workerd is excluded at build time by
  the subpath split, not at runtime by a crash.

## bodyParser coordination

`bodyParser()` consumes the body eagerly, and a Web `Request` body can only be read once. The upload middleware therefore:

1. Uses `ctx.state.body` when it is already a `FormData` instance (bodyParser ran first — the default in Rasengan Server via `configureBodyParser()`).
2. Calls `parseFormData(ctx.request)` itself otherwise.

Non-breaking in both orders. `bodyParser` gains an optional `skipMultipart` flag for apps that want multipart handled exclusively by `fileUpload`.

## Error semantics

Failures produce `4xx` responses carrying Multer-compatible codes:

| Code                    | Status | Trigger                               |
| ----------------------- | ------ | ------------------------------------- |
| `LIMIT_FILE_SIZE`       | 413    | a file exceeds `limits.fileSize`      |
| `LIMIT_FILE_COUNT`      | 400    | more files than `limits.files`        |
| `LIMIT_UNEXPECTED_FILE` | 400    | file on an undeclared field           |
| `LIMIT_FIELD_COUNT`     | 400    | more text fields than `limits.fields` |
| `FILE_FILTER_REJECTED`  | 400    | `fileFilter` returned false           |

Before any error response is returned, files already persisted for the same request are removed through `storage.removeFile()` — no orphans on disk.

---

# Package Responsibilities

## @rasenganjs/futon

Owns the middleware, the parsing, the `StorageEngine` contract, and both shipped engines. Uploads are Request → Response work: squarely Futon's job.

## @rasenganjs/server

Re-exports `fileUpload` and its types so controllers import a single package. Optionally adds `ctx.req.file` / `ctx.req.files` sugar over `ctx.state` on its request wrapper. No upload logic of its own.

---

# Delivery Phases

1. **Core** — types, `fileUpload()` instance, `MemoryStorage`, error codes.
2. **DiskStorage** — `./upload/disk` subpath export, `destination`/`filename` callbacks, collision-safe default names.
3. **bodyParser coordination** — `FormData` reuse from `ctx.state`, `skipMultipart` option, docs.
4. **Tests** — vitest units for every instance method, limits with rollback, filtering, both storage engines, bodyParser-first ordering; multipart requests built natively via `new Request(url, { body: formData })`.
5. **Integration** — `@rasenganjs/server` re-export, playground upload route in `rasengan-server-demo`, live verification script.

Estimated size: ~350 lines core, ~80 disk engine, ~400 tests.

---

# Trade-offs

`formData()` buffers the entire request body in memory before per-file limits apply. This is the right trade for avatar/document-scale uploads (MBs) and keeps the parser at ~zero lines of bespoke code across all runtimes; it is the wrong trade for GB-scale uploads. Mitigations:

- Documentation recommends pairing with `bodyLimit()` as the hard outer cap.
- The public API never exposes the buffering, so a boundary-streaming parser (busboy-style) can replace the internals later — enforcing `fileSize` mid-stream and piping straight to storage — without breaking users.

---

# Conclusion

Futon gains the one HTTP capability every production application eventually needs and currently has to hand-roll. The Web Standard parser keeps v1 small and portable across Node, Bun, Deno and workerd; the Multer-shaped surface makes migration from Express mechanical; and the pluggable `StorageEngine` plus subpath-isolated `DiskStorage` keep the zero-dependency, WinterCG-first principles of Futon intact.
