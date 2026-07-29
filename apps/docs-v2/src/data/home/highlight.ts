import {
  createHighlighter,
  type Highlighter,
  type ShikiTransformer,
} from 'shiki';
import { showcaseFrameworks } from './showcase-content';

/**
 * Adds `data-line` to every line span so the same CSS-counter based
 * line-number styling already used for MDX code blocks can apply here too
 * — raw shiki output only tags lines with `class="line"`, not `data-line`.
 */
function lineNumberTransformer(): ShikiTransformer {
  return {
    name: 'home-showcase-line-numbers',
    line(node) {
      node.properties['data-line'] = '';
    },
    pre(node) {
      node.properties['data-line-numbers'] = '';
    },
  };
}

export type HighlightedFile = {
  filename: string;
  code: string;
  html: string;
};

export type HighlightedFramework = {
  key: string;
  title: string;
  files: HighlightedFile[];
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['one-light', 'one-dark-pro'],
      langs: ['ts', 'tsx', 'js', 'json'],
    });
  }
  return highlighterPromise;
}

export async function getHighlightedShowcase(): Promise<
  HighlightedFramework[]
> {
  const highlighter = await getHighlighter();

  return showcaseFrameworks.map((framework) => ({
    key: framework.key,
    title: framework.title,
    files: framework.files.map((file) => ({
      filename: file.filename,
      code: file.code,
      html: highlighter.codeToHtml(file.code, {
        lang: file.lang,
        themes: { light: 'one-light', dark: 'one-dark-pro' },
        transformers: [lineNumberTransformer()],
      }),
    })),
  }));
}
