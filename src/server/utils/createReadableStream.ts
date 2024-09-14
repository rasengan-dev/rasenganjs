import { Readable, PassThrough, Stream } from 'node:stream';

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

// export function createReadableStreamFromReadable2(
//   source: Readable
// ) {
//   let pump = new StreamPump(source);
//   let stream = new ReadableStream(pump, pump);
//   return stream;
// }

// class StreamPump {
//   constructor(stream: Readable) {
//     this.highWaterMark = stream.readableHighWaterMark || new Stream.Readable().readableHighWaterMark;
//     this.accumalatedSize = 0;
//     this.stream = stream;
//     this.enqueue = this.enqueue.bind(this);
//     this.error = this.error.bind(this);
//     this.close = this.close.bind(this);
//   }
//   size(chunk) {
//     return (chunk === null || chunk === void 0 ? void 0 : chunk.byteLength) || 0;
//   }
//   start(controller) {
//     this.controller = controller;
//     this.stream.on("data", this.enqueue);
//     this.stream.once("error", this.error);
//     this.stream.once("end", this.close);
//     this.stream.once("close", this.close);
//   }
//   pull() {
//     this.resume();
//   }
//   cancel(reason) {
//     if (this.stream.destroy) {
//       this.stream.destroy(reason);
//     }
//     this.stream.off("data", this.enqueue);
//     this.stream.off("error", this.error);
//     this.stream.off("end", this.close);
//     this.stream.off("close", this.close);
//   }
//   enqueue(chunk) {
//     if (this.controller) {
//       try {
//         let bytes = chunk instanceof Uint8Array ? chunk : Buffer.from(chunk);
//         let available = (this.controller.desiredSize || 0) - bytes.byteLength;
//         this.controller.enqueue(bytes);
//         if (available <= 0) {
//           this.pause();
//         }
//       } catch (error) {
//         this.controller.error(new Error("Could not create Buffer, chunk must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object"));
//         this.cancel();
//       }
//     }
//   }
//   pause() {
//     if (this.stream.pause) {
//       this.stream.pause();
//     }
//   }
//   resume() {
//     if (this.stream.readable && this.stream.resume) {
//       this.stream.resume();
//     }
//   }
//   close() {
//     if (this.controller) {
//       this.controller.close();
//       delete this.controller;
//     }
//   }
//   error(error) {
//     if (this.controller) {
//       this.controller.error(error);
//       delete this.controller;
//     }
//   }
// }