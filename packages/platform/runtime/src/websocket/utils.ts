/**
 * Shared helpers for adapting native runtime WebSocket APIs into the
 * runtime-agnostic shapes in `./types.ts`. Used by both the Node (`ws`
 * package, Node `Buffer`) and Bun (`Bun.serve()`, Bun's `Buffer`) adapters,
 * which both deliver binary message payloads as a `Buffer`-like `Uint8Array`.
 */

/**
 * Convert a `Buffer`/`Uint8Array`-like binary payload into a plain
 * `ArrayBuffer`, since `WebSocketHandlers.message` expects `ArrayBuffer`
 * for binary frames (not a runtime-specific `Buffer` type).
 */
export function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength
  ) as ArrayBuffer;
}
