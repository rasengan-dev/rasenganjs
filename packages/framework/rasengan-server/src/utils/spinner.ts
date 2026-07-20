import { cyan, green, red } from './color.js';

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const INTERVAL_MS = 80;

export interface Spinner {
  /** Stop animating and print a green checkmark line. */
  succeed(text: string): void;
  /** Stop animating and print a red cross line. */
  fail(text: string): void;
}

/**
 * A minimal, dependency-free CLI spinner (no `ora`/etc — this codebase's
 * `utils/color.ts` already favors zero-dependency terminal output).
 *
 * Animates in place via `\r` line-rewriting when stdout is a TTY;
 * falls back to a single static line otherwise (piped output, CI logs —
 * `\r` redraws have no meaning there and would just look broken).
 */
export function startSpinner(text: string): Spinner {
  const isTTY = process.stdout.isTTY === true;
  let frame = 0;
  let timer: ReturnType<typeof setInterval> | undefined;

  if (isTTY) {
    timer = setInterval(() => {
      process.stdout.write(`\r${cyan(FRAMES[frame])} ${text}`);
      frame = (frame + 1) % FRAMES.length;
    }, INTERVAL_MS);
  } else {
    console.log(`  ${text}`);
  }

  const stop = (icon: string, finalText: string) => {
    if (timer) {
      clearInterval(timer);
      // Clear the spinner line before printing the final result.
      process.stdout.write(`\r${' '.repeat(text.length + 2)}\r`);
      console.log(`${icon} ${finalText}`);
    } else {
      console.log(`  ${icon} ${finalText}`);
    }
  };

  return {
    succeed: (finalText) => stop(green('✓'), finalText),
    fail: (finalText) => stop(red('✗'), finalText),
  };
}
