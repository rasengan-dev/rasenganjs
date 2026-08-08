import { describe, it, expect, vi } from 'vitest';
import { logRedirection } from '../../../core/utils/log.js';

describe('logRedirection', () => {
  it('logs a message containing both the source and destination', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    logRedirection('/old', '/new');

    expect(log).toHaveBeenCalledOnce();
    const message = log.mock.calls[0][0] as string;
    expect(message).toContain('/old');
    expect(message).toContain('/new');

    log.mockRestore();
  });
});
