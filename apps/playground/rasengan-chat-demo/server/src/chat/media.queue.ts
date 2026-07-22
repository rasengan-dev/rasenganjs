import { Queue, JobRouter, type JobHandler } from '@rasenganjs/queue';
import { ChatGateway } from './chat.gateway.js';

/** Payload for the one job this demo queue knows about. */
export type ScanJobData = {
  url: string;
  originalname: string;
};

/**
 * RFC-0004 dogfood: a tiny background queue exercising `@rasenganjs/queue`
 * alongside RFC-0002's `fileUpload` and RFC-0001's `Gateway`.
 *
 * `FilesController.upload` enqueues a `scan` job right after saving an
 * attachment (see files.controller.ts) instead of doing any
 * "processing" inline on the request — the point being demonstrated is
 * the queue mechanics (background work, retries, broadcasting on
 * completion), not real media processing, so the "scan" here is just a
 * short delay standing in for e.g. a virus scan or thumbnail generation.
 *
 * No room context exists at upload time (the file is POSTed before the
 * chat message that references it — see files.controller.ts's docstring)
 * so completion is broadcast to every connected client rather than a
 * specific room. The web app doesn't render `attachmentReady` today;
 * this only demonstrates the backend wiring.
 */
export class MediaQueue extends Queue {
  name = 'media';

  constructor(private chatGateway: ChatGateway) {
    super();
  }

  jobs(router: JobRouter) {
    router.process('scan', this.scan, {
      attempts: 2,
      backoff: 1_000,
      concurrency: 2,
    });
  }

  scan: JobHandler<ScanJobData> = async (job) => {
    // Stand-in for real work (virus scan, thumbnail generation, ...).
    await new Promise((resolve) => setTimeout(resolve, 10500));

    console.log(`[media-queue] "${job.data.originalname}" scanned OK`);

    // ChatGateway.server is wired by createWsPlugin() after the gateway
    // resolves — safe to read here since this runs well after boot.
    await this.chatGateway.server.emit('attachmentReady', {
      url: job.data.url,
      originalname: job.data.originalname,
    });
  };
}
