/**
 * `fileUpload()` — Multer-style multipart handling for Futon (RFC-0002).
 *
 * ```ts
 * const upload = fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } });
 *
 * router.post('/avatar', upload.single('avatar'), async (ctx) => {
 *   const file = ctx.get('file'); // UploadedFile
 *   return json({ size: file.size });
 * });
 * ```
 *
 * Parsing uses the Web Standard `request.formData()`, so the whole
 * body is buffered before limits apply — pair with `bodyLimit()` as
 * the hard outer cap. When `bodyParser()` already ran (the default in
 * Rasengan Server), its parsed `FormData` is reused instead of
 * re-reading the request body, which a Web `Request` forbids.
 */

import type { Context } from '../../context/types.js';
import type { Middleware } from '../index.js';
import { parseFormData } from '../../request/body.js';
import { json } from '../../response/utils.js';
import { MemoryStorage } from './memory.js';
import {
  UPLOAD_ERROR_CODES,
  type FieldSpec,
  type FileInfo,
  type StorageEngine,
  type UploadErrorCode,
  type UploadOptions,
  type UploadedFile,
} from './types.js';

export { MemoryStorage } from './memory.js';
export { UPLOAD_ERROR_CODES } from './types.js';
export type {
  FieldSpec,
  FileFilter,
  FileInfo,
  StorageEngine,
  UploadErrorCode,
  UploadLimits,
  UploadOptions,
  UploadedFile,
} from './types.js';

/** Which multipart fields a given instance method accepts files on. */
type Selection =
  | { kind: 'single'; field: string }
  | { kind: 'array'; field: string; maxCount: number }
  | { kind: 'fields'; maxCounts: Map<string, number> }
  | { kind: 'none' }
  | { kind: 'any' };

export interface Uploader {
  /** Accept one file on `field` → `ctx.state.file`. */
  single(field: string): Middleware;
  /** Accept up to `maxCount` files on `field` → `ctx.state.files: UploadedFile[]`. */
  array(field: string, maxCount?: number): Middleware;
  /** Accept the declared fields → `ctx.state.files: Record<string, UploadedFile[]>`. */
  fields(specs: FieldSpec[]): Middleware;
  /** Accept text fields only; any file is rejected. */
  none(): Middleware;
  /** Accept every file → `ctx.state.files: UploadedFile[]`. */
  any(): Middleware;
}

export function fileUpload(options: UploadOptions = {}): Uploader {
  const storage = options.storage ?? new MemoryStorage();

  const middleware = (selection: Selection): Middleware =>
    createUploadMiddleware(selection, storage, options);

  return {
    single: (field) => middleware({ kind: 'single', field }),
    array: (field, maxCount = Infinity) =>
      middleware({ kind: 'array', field, maxCount }),
    fields: (specs) =>
      middleware({
        kind: 'fields',
        maxCounts: new Map(specs.map((s) => [s.name, s.maxCount ?? 1])),
      }),
    none: () => middleware({ kind: 'none' }),
    any: () => middleware({ kind: 'any' }),
  };
}

function createUploadMiddleware(
  selection: Selection,
  storage: StorageEngine,
  options: UploadOptions
): Middleware {
  return async (ctx, next) => {
    const contentType =
      ctx.request.headers.get('content-type')?.toLowerCase() ?? '';
    if (!contentType.includes('multipart/form-data')) {
      return next();
    }

    // A Request body reads once — reuse bodyParser's result when present.
    let form: FormData;
    const preParsed = ctx.state.body;
    if (preParsed instanceof FormData) {
      form = preParsed;
    } else {
      try {
        form = await parseFormData(ctx.request);
      } catch {
        return errorResponse(
          400,
          UPLOAD_ERROR_CODES.MALFORMED_BODY,
          'Could not parse the multipart body.'
        );
      }
    }

    // ── Validate every part before storing anything ────────────────
    const textFields: Record<string, string> = {};
    const accepted: Array<{ file: File; info: FileInfo }> = [];
    const perField = new Map<string, number>();
    let textFieldCount = 0;

    for (const [name, value] of form.entries()) {
      if (!(value instanceof File)) {
        textFieldCount++;
        if (
          options.limits?.fields !== undefined &&
          textFieldCount > options.limits.fields
        ) {
          return errorResponse(
            400,
            UPLOAD_ERROR_CODES.LIMIT_FIELD_COUNT,
            `Too many fields (max ${options.limits.fields}).`
          );
        }
        textFields[name] = value;
        continue;
      }

      const info: FileInfo = {
        fieldname: name,
        originalname: value.name,
        mimetype: value.type,
        size: value.size,
      };

      const count = (perField.get(name) ?? 0) + 1;
      perField.set(name, count);

      const unexpected = isUnexpected(selection, name, count);
      if (unexpected) {
        return errorResponse(
          400,
          UPLOAD_ERROR_CODES.LIMIT_UNEXPECTED_FILE,
          `Unexpected file on field "${name}".`
        );
      }

      if (
        options.limits?.files !== undefined &&
        accepted.length + 1 > options.limits.files
      ) {
        return errorResponse(
          400,
          UPLOAD_ERROR_CODES.LIMIT_FILE_COUNT,
          `Too many files (max ${options.limits.files}).`
        );
      }

      if (
        options.limits?.fileSize !== undefined &&
        info.size > options.limits.fileSize
      ) {
        return errorResponse(
          413,
          UPLOAD_ERROR_CODES.LIMIT_FILE_SIZE,
          `File "${info.originalname}" exceeds the ${options.limits.fileSize} byte limit.`
        );
      }

      if (options.fileFilter && !(await options.fileFilter(ctx, info))) {
        return errorResponse(
          400,
          UPLOAD_ERROR_CODES.FILE_FILTER_REJECTED,
          `File "${info.originalname}" was rejected.`
        );
      }

      accepted.push({ file: value, info });
    }

    // ── Store, rolling back on mid-batch failure ───────────────────
    const stored: UploadedFile[] = [];
    for (const { file, info } of accepted) {
      try {
        const extra = await storage.handleFile(ctx, file, info);
        stored.push({ ...info, ...extra });
      } catch (error) {
        await rollback(storage, stored);
        throw error;
      }
    }

    // ── Populate the context ───────────────────────────────────────
    // Text fields become the body, like Multer's req.body.
    ctx.state.body = textFields;
    ctx.body = textFields;

    switch (selection.kind) {
      case 'single':
        ctx.state.file = stored[0];
        break;
      case 'array':
      case 'any':
        ctx.state.files = stored;
        break;
      case 'fields': {
        const byField: Record<string, UploadedFile[]> = {};
        for (const file of stored) {
          (byField[file.fieldname] ??= []).push(file);
        }
        ctx.state.files = byField;
        break;
      }
      case 'none':
        break;
    }

    return next();
  };
}

/** True when `selection` does not allow a `count`-th file on `field`. */
function isUnexpected(
  selection: Selection,
  field: string,
  count: number
): boolean {
  switch (selection.kind) {
    case 'any':
      return false;
    case 'none':
      return true;
    case 'single':
      return field !== selection.field || count > 1;
    case 'array':
      return field !== selection.field || count > selection.maxCount;
    case 'fields': {
      const max = selection.maxCounts.get(field);
      return max === undefined || count > max;
    }
  }
}

async function rollback(
  storage: StorageEngine,
  stored: UploadedFile[]
): Promise<void> {
  for (const file of stored) {
    try {
      await storage.removeFile(file);
    } catch {
      // Rollback is best-effort — the original error matters more.
    }
  }
}

function errorResponse(
  status: number,
  code: UploadErrorCode,
  message: string
): Response {
  return json({ error: { code, message } }, { status });
}
