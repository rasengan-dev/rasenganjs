import React from 'react';
import { TOCItem } from '../types/index.js';

/**
 * This function is used to extract TOC (Table Of Content) from markdown text
 * @param markdown
 * @returns
 */
export function extractTOC(markdown: string) {
  const lines = markdown.split('\n');
  const toc: TOCItem[] = [];

  lines.forEach((line: string) => {
    const h2Match = line.match(/^## (.+)/); // Titres H2
    const h3Match = line.match(/^### (.+)/); // Titres H3

    if (h2Match) {
      const title = h2Match[1].trim();
      const anchor = generateAnchor(title);
      toc.push({
        title,
        anchor,
        level: 2,
        children: [],
      });
    } else if (h3Match && toc.length > 0) {
      const title = h3Match[1].trim();
      const anchor = generateAnchor(title);
      toc[toc.length - 1].children.push({
        title,
        anchor,
        level: 3,
      });
    }
  });

  return toc;
}

/**
 * This function is used to extract the link from a heading text coming from a markdown
 * @param title
 * @returns
 */
export const generateAnchor = (title: React.ReactNode) => {
  if (Array.isArray(title)) {
    const text = title
      .map((item) => {
        if (React.isValidElement(item)) {
          return item.props['children'].toString().trim();
        }

        return item.toString().trim();
      })
      .join(' ');

    const lastItem = title[title.length - 1];

    if (typeof lastItem === 'string') {
      // Pattern to match a markdown anchor link at the end: [#something]
      const match1 = text.match(/\s\[#([^\]]+)\]$/);

      if (match1) {
        return {
          id: match1[1],
          // remove the last element from title
          text: title.slice(0, title.length - 1),
        };
      }
    }

    return {
      id: text.replace(/\s+/g, '-').toLowerCase(),
      text: title,
    };
  }

  // If the title is a React element
  if (React.isValidElement(title)) {
    return {
      id: title.props['children']
        .toString()
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase(),
      text: title,
    };
  }

  const strippedTitle = String(toText(title).trim());

  // Pattern to match a markdown anchor link at the end: [#something]
  const match = strippedTitle.match(/\s\[#([^\]]+)\]$/);

  let id: string;
  let text: string;

  if (match) {
    // match[1] is the content inside [#...]
    id = match[1].trim().replace(/\s+/g, '-').toLowerCase();
    // remove the matched anchor from the original text
    text = strippedTitle.replace(match[0], '').trim();
  } else {
    // No markdown anchor found, generate id from the whole title
    id = strippedTitle.replace(/\s+/g, '-').toLowerCase();
    text = strippedTitle;
  }

  return { id, text };
};

function toText(input: unknown): string {
  if (input == null) return ''; // null/undefined
  if (typeof input === 'string') return input; // already a string
  if (Array.isArray(input)) return input.map(toText).join(' ');
  if (input instanceof Uint8Array)
    // Buffer/typed array
    return new TextDecoder().decode(input);
  try {
    return String(input);
  } catch {
    return '';
  } // fallback
}
