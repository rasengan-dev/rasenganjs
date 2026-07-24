/**
 * Upload types — the contracts behind `fileUpload()` (RFC-0002).
 *
 * `StorageEngine` mirrors Multer's `_handleFile`/`_removeFile` pair so
 * custom engines (S3, R2, GCS, ...) are mechanical ports. Engines
 * receive the Web `File` (not a Buffer) on purpose: when a streaming
 * multipart parser replaces the buffered `formData()` internals in a
 * later release, existing engines keep working unchanged — only the
 * stream's source moves from a memory blob to the wire.
 */

import type { Context } from '../../context/types.js';

/** Identity of one incoming file, known before storage runs. */
export interface FileInfo {
  /** The multipart field name the file arrived on. */
  fieldname: string;
  /** Client-supplied file name. User-controlled — never use as a path. */
  originalname: string;
  /** Client-supplied content type of the part. */
  mimetype: string;
  /** Size in bytes. */
  size: number;
}

/**
 * A stored file, as exposed on `ctx.state.file` / `ctx.state.files`.
 * Which optional fields are present depends on the storage engine.
 */
export interface UploadedFile extends FileInfo {
  /** File contents (MemoryStorage). */
  buffer?: Uint8Array;
  /** Absolute or cwd-relative path of the stored file (DiskStorage). */
  path?: string;
  /** Name of the file inside `destination` (DiskStorage). */
  filename?: string;
  /** Directory the file was written to (DiskStorage). */
  destination?: string;
  /** Custom engines may attach extra metadata (e.g. an S3 URL). */
  [key: string]: unknown;
}

/**
 * Where accepted files go. `handleFile` returns the storage-specific
 * fields to merge into the resulting `UploadedFile`; `removeFile`
 * undoes a successful `handleFile` (used for mid-batch rollback).
 */
export interface StorageEngine {
  handleFile(
    ctx: Context,
    file: File,
    info: FileInfo
  ): Promise<Partial<UploadedFile>>;
  removeFile(file: UploadedFile): Promise<void>;
}

export interface UploadLimits {
  /** Maximum size of a single file, in bytes. */
  fileSize?: number;
  /** Maximum number of files in the whole request. */
  files?: number;
  /** Maximum number of non-file text fields. */
  fields?: number;
}

/**
 * Accept/reject one file before it reaches storage. Rejection produces
 * a 400 `FILE_FILTER_REJECTED` response (unlike Multer, which skips
 * the file silently — an explicit response is harder to misread).
 */
export type FileFilter = (
  ctx: Context,
  info: FileInfo
) => boolean | Promise<boolean>;

export interface UploadOptions {
  /** Defaults to `MemoryStorage`. */
  storage?: StorageEngine;
  limits?: UploadLimits;
  fileFilter?: FileFilter;
}

/** One entry of `upload.fields([...])`. */
export interface FieldSpec {
  name: string;
  /** Default 1. */
  maxCount?: number;
}

/** Multer-compatible error codes carried by upload failure responses. */
export const UPLOAD_ERROR_CODES = {
  LIMIT_FILE_SIZE: 'LIMIT_FILE_SIZE',
  LIMIT_FILE_COUNT: 'LIMIT_FILE_COUNT',
  LIMIT_FIELD_COUNT: 'LIMIT_FIELD_COUNT',
  LIMIT_UNEXPECTED_FILE: 'LIMIT_UNEXPECTED_FILE',
  FILE_FILTER_REJECTED: 'FILE_FILTER_REJECTED',
  MALFORMED_BODY: 'MALFORMED_BODY',
} as const;

export type UploadErrorCode =
  (typeof UPLOAD_ERROR_CODES)[keyof typeof UPLOAD_ERROR_CODES];
