import React from 'react';
import { Table } from './table.js';
import { Heading } from './heading.js';

import MarkdownComponent from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
// import rehypePrettyCode from "rehype-pretty-code";
import { CodeBlock2 } from './codeblock2.js';

function Markdown({
  content,
  className,
}: {
  content: string;
  className?: React.ComponentProps<'section'>['className'];
}) {
  return (
    <section className={'rasengan-markdown-body ' + className}>
      <MarkdownComponent
        children={content}
        remarkPlugins={[remarkParse, remarkGfm]}
        rehypePlugins={[
          remarkRehype,
          rehypeStringify,
          // [rehypePrettyCode, {

          // }]
        ]}
        components={{
          code: CodeBlock2,
          table: Table,
          h1: Heading({ variant: 'h1' }),
          h2: Heading({ variant: 'h2' }),
          h3: Heading({ variant: 'h3' }),
          h4: Heading({ variant: 'h4' }),
          h5: Heading({ variant: 'h5' }),
          h6: Heading({ variant: 'h6' }),
        }}
      />
    </section>
  );
}

export { Markdown };
