const ESC = '\x1b';

const codes = {
  reset: `${ESC}[0m`,
  bold: `${ESC}[1m`,
  red: `${ESC}[31m`,
  green: `${ESC}[32m`,
  yellow: `${ESC}[33m`,
  blue: `${ESC}[34m`,
  magenta: `${ESC}[35m`,
  cyan: `${ESC}[36m`,
  gray: `${ESC}[90m`,
} as const;

function wrap(code: string, s: string): string {
  return `${code}${s}${codes.reset}`;
}

export function red(s: string): string {
  return wrap(codes.red, s);
}
export function green(s: string): string {
  return wrap(codes.green, s);
}
export function yellow(s: string): string {
  return wrap(codes.yellow, s);
}
export function blue(s: string): string {
  return wrap(codes.blue, s);
}
export function magenta(s: string): string {
  return wrap(codes.magenta, s);
}
export function cyan(s: string): string {
  return wrap(codes.cyan, s);
}
export function gray(s: string): string {
  return wrap(codes.gray, s);
}
export function bold(s: string): string {
  return wrap(codes.bold, s);
}
