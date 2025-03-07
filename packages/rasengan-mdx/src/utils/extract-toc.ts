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
export const generateAnchor = (title: string) => {
  // Regex pattern to match links in the format [#link text]
  const regex = new RegExp('^\\[#.+\\]');

  // split the children into an array of strings based on space
  const childrenArray = title.split(' [#');
  let lastWord = '';
  let remainingWords = '';
  let id = '';

  // Check if we have more than one word and if the last word is a link
  if (
    childrenArray.length > 1 &&
    childrenArray.at(-1).includes(']') &&
    regex.test(`[#${childrenArray.at(-1)}`)
  ) {
    lastWord = childrenArray.pop();
  }

  if (lastWord) {
    id = lastWord.replace(']', '').split(' ').join('-').toLowerCase();
    remainingWords = childrenArray[0];
  } else {
    id = title.split(' ').join('-').toLowerCase();
    remainingWords = title;
  }

  return {
    id,
    text: remainingWords,
  };
};
