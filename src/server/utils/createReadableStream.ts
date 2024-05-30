import { Readable, PassThrough } from 'stream';

/**
 * Creates a ReadableStream from a Readable or PassThrough stream.
 *
 * The returned ReadableStream will emit the same data events as the input stream,
 * and will close or error out when the input stream does.
 *
 * @param readable The Readable or PassThrough stream to convert to a ReadableStream.
 * @returns A new ReadableStream instance that wraps the input stream.
 */
export function createReadableStreamFromReadable(
  readable: Readable | PassThrough
) {
  return new ReadableStream({
    start(controller) {
      readable.on("data", (chunk) => {
        controller.enqueue(chunk);
      });

      readable.on("end", () => {
        controller.close();
      });

      readable.on("error", (err) => {
        controller.error(err);
      });
    },
    cancel() {
      readable.destroy();
    },
  });
}
