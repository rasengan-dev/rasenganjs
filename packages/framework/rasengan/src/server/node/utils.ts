import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import chalk from 'chalk';

/**
 * Log formatted and grouped HTML build output, similar to Vite/Next.js style.
 * @param files List of absolute or relative HTML file paths
 */
export async function logRenderedPagesGrouped(files: string[]) {
  const rows: {
    file: string;
    size: number;
    gzip: number;
  }[] = [];

  // Collect all files data
  for (const file of files) {
    try {
      const content = fs.readFileSync(file);
      const size = content.length;
      const gzipSize = zlib.gzipSync(content).length;
      const relative = path.relative(process.cwd(), file);
      rows.push({ file: relative, size, gzip: gzipSize });
    } catch (e) {
      console.error(`❌ Failed to read file: ${file}`, e);
    }
  }

  // Sort by folder then by size
  rows.sort((a, b) => a.file.localeCompare(b.file));

  // Group by first-level directory (after dist/)
  const groups = new Map<string, typeof rows>();

  for (const row of rows) {
    const parts = row.file.split(path.sep);
    const baseFolder =
      parts.length > 2 && parts[1] !== 'assets' ? parts[1] : 'root';
    if (!groups.has(baseFolder)) groups.set(baseFolder, []);
    groups.get(baseFolder)!.push(row);
  }

  console.log();

  // Compute max filename length for nice column alignment
  const longestPath = Math.max(...rows.map((r) => r.file.length));

  for (const [folder, group] of groups) {
    console.log(
      chalk.bold.blueBright(`📁 ${folder === 'root' ? '/' : '/' + folder}`)
    );
    for (const { file, size, gzip } of group) {
      const paddedFile = chalk.white(file.padEnd(longestPath + 4, ' '));
      const sizeStr = chalk.yellow(formatSize(size));
      const gzipStr = chalk.gray(formatSize(gzip));
      console.log(`   ${paddedFile}${sizeStr} │ gzip: ${gzipStr}`);
    }
    console.log();
  }

  console.log(chalk.blueBright('🎉 Static generation completed.\n'));
}

/**
 * Convert bytes into human-readable units.
 */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes.toFixed(2)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} kB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

/**
 * Match a route pattern like "/blog/**" or "/profile"
 * to a list of available page paths.
 */
export function filterRoutesForPrerender(
  routes: string[],
  availablePages: string[]
) {
  // Convert route patterns to RegExp
  const routeRegexList = routes.map((route) => {
    // Escape regex special chars except for *
    const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Replace wildcard `**` with `.*` (match anything after)
    const regexStr = '^' + escaped.replace(/\\\*\\\*/g, '.*') + '$';
    return new RegExp(regexStr);
  });

  // Filter pages that match at least one route pattern
  const matchedPages = availablePages.filter((page) =>
    routeRegexList.some((regex) => regex.test(page))
  );

  // Remove duplicates, add /* for 404 page and sort
  return [...new Set([...matchedPages, '/*'])].sort();
}

// Convert seconds to minutes and seconds
export function convertSecondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    if (remainingSeconds < 1) {
      return `${remainingSeconds * 1000}ms`;
    }
    return `${remainingSeconds.toFixed(2)}s`;
  }

  return `${minutes}m ${remainingSeconds.toFixed(2)}s`;
}
