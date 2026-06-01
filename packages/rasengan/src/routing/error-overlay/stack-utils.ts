type StackFrame = {
  file: string;
  line: number;
  column: number;
};

/**
 * Parse an error stack trace and extract the first meaningful user frame.
 * Handles Chrome/V8 and Firefox stack trace formats.
 * Skips the "Error:" header line.
 *
 * @param stack - The full error.stack string
 * @returns The first parsed StackFrame, or null if none found
 */
export function parseStackFrame(stack: string): StackFrame | null {
  const lines = stack.split('\n');

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith('Error:')) continue;

    // Match: /path/file.ext:line:col  (absolute path, any extension)
    const match = line.match(
      /(\/[^\s:]+\.(?:tsx?|jsx?|m?js|mdx?|css|json|html)):(\d+):(\d+)/
    );

    if (match) {
      const file = match[1].split('?')[0].split('#')[0];
      return { file, line: parseInt(match[2]), column: parseInt(match[3]) };
    }
  }

  return null;
}

/**
 * Vite plugin transforms may wrap a file's original source in
 * `export default "..."` with escape sequences. Detect and unwrap.
 */
function unwrapExportDefaultString(source: string): string {
  const match = source.match(/^export default\s+"((?:[^"\\]|\\.)*)"/s);

  if (match) {
    try {
      return JSON.parse('"' + match[1] + '"');
    } catch {
      return source;
    }
  }

  return source;
}

/**
 * Fetch the source file from the Vite dev server (using ?raw to get original
 * source) and return a snippet of lines surrounding the error line.
 *
 * @param file         - File path (absolute, e.g. /src/app/page.tsx)
 * @param errorLine    - 1-indexed line number where the error occurred
 * @param contextLines - Number of lines to show above and below the error
 * @returns An object with the snippet string, the 0-indexed error line
 *          position within the snippet, and the total file line count,
 *          or null on failure
 */
export async function fetchSourceSnippet(
  file: string,
  errorLine: number,
  contextLines = 2
): Promise<{
  snippet: string;
  errorLineIndex: number;
  totalLines: number;
} | null> {
  try {
    const url = file + '?raw';
    const response = await fetch(url);

    if (!response.ok) return null;

    let source = await response.text();

    // Some Vite transforms wrap the source in `export default "..."`,
    // escaping newlines and quotes. Detect and unescape it.
    source = unwrapExportDefaultString(source);

    const lines = source.split('\n');
    const totalLines = lines.length;
    const start = Math.max(0, errorLine - contextLines - 1);
    const end = Math.min(lines.length, errorLine + contextLines);
    const snippet = lines.slice(start, end).join('\n');
    const errorLineIndex = errorLine - 1 - start;

    return { snippet, errorLineIndex, totalLines };
  } catch {
    return null;
  }
}
