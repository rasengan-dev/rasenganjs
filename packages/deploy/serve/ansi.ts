/**
 * Minimal ANSI color helpers — built-in replacement for `chalk`,
 * covering only what this CLI's startup banner uses (bold, blue, green,
 * and bold+blue combined). Colors are skipped when stdout isn't a TTY or
 * `NO_COLOR` is set, matching `chalk`'s own default behavior.
 */

const supportsColor = !process.env.NO_COLOR && !!process.stdout.isTTY;

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const BLUE = '\x1b[34m';
const GREEN = '\x1b[32m';

function wrap(open: string): (text: string) => string {
  return (text: string) => (supportsColor ? `${open}${text}${RESET}` : text);
}

export const bold = wrap(BOLD);
export const blue = wrap(BLUE);
export const green = wrap(GREEN);
export const boldBlue = wrap(BOLD + BLUE);
