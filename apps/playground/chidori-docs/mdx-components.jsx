import { isValidElement } from 'react';
import {
  defineMDXConfig,
  useActiveTocItem,
  getIconForLanguageExtension,
  Icons,
} from '@rasenganjs/mdx';
import { Link } from 'rasengan';
import { AdsCard } from '@/components/common/molecules/ads';
import { Pagination } from '@/components/common/molecules/pagination';
import { Note } from '@/components/common/molecules/note';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Check } from 'lucide-react';

export default defineMDXConfig({
  components: {
    p: ({ children, ...props }) => (
      <p
        {...props}
        className="text-[0.9rem] font-medium leading-relaxed [&:not(:first-child)]:mt-6 text-foreground/90"
      >
        {children}
      </p>
    ),
    a: ({ children, ...props }) => (
      <a
        {...props}
        className="text-foreground font-semibold underline underline-offset-4 cursor-pointer"
      >
        {children}
      </a>
    ),
    h1: ({ children, ...props }) => (
      <h1
        {...props}
        className="sm:text-3xl text-4xl font-semibold mt-4 mb-5 text-foreground"
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        {...props}
        className="text-xl font-semibold mt-8 mb-3 text-foreground border-b pb-2"
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        {...props}
        className="text-lg font-semibold mt-8 mb-3 text-foreground"
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 {...props} className="text-md font-medium mt-8 mb-3 text-foreground">
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 {...props} className="text-md font-medium mt-8 mb-3 text-foreground">
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6 {...props} className="text-md font-medium mt-8 mb-3 text-foreground">
        {children}
      </h6>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="my-6 ml-6 list-decimal">
        {children}
      </ol>
    ),
    ul: ({ children, ...props }) => (
      <ul {...props} className="my-6 ml-6 list-decimal list-inside">
        {children}
      </ul>
    ),
    li: ({ children, ...props }) => (
      <li {...props} className="mt-2 text-sm font-medium text-foreground/90">
        {children}
      </li>
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn('mt-6 border-l-2 pl-6 italic', className)}
        {...props}
      />
    ),
    /* -------------------------------- */
    /* Code blocks wrapper (figure)     */
    /* -------------------------------- */

    figure: ({ className, ...props }) => {
      return (
        <figure
          className={`
            my-[10px]
            rounded-lg
            bg-[var(--bg-code)]
            text-[var(--fg-code)]
            overflow-hidden
            has-[pre[data-language]]:block
            ${className}
          `}
          {...props}
        />
      );
    },

    /* -------------------------------- */
    /* Code block header                */
    /* -------------------------------- */

    figcaption: ({ className, children, ...props }) => {
      const iconExtension =
        'data-language' in props && typeof props['data-language'] === 'string'
          ? getIconForLanguageExtension(props['data-language'])
          : null;

      return (
        <figcaption
          className={`
            flex items-center gap-2
            px-5 py-2.5
            border-b border-b-border
            text-sm font-bold
            bg-(--code-block-bg)!
            text-[var(--fg-code)]
            [&_svg]:size-4 [&_svg]:opacity-70
            ${className}
          `}
          {...props}
        >
          {iconExtension}
          {children}
        </figcaption>
      );
    },

    /* -------------------------------- */
    /* PRE                              */
    /* -------------------------------- */

    pre: ({ className, children, ...props }) => {
      return (
        <pre
          className={`
            [&_span[data-highlighted-line]]:bg-(--code-block-highlight-bg)!
            [&_span[data-highlighted-line]]:border-l-(--code-block-highlight-border)!
            [&_span>mark[data-highlighted-chars]]:bg-(--code-block-highlight-border)/20!
            [&_span>mark[data-highlighted-chars]]:rounded-md
            [&_span>mark[data-highlighted-chars]]:px-1
            [&_span>mark[data-highlighted-chars]]:py-[0.2rem]
          `}
          {...props}
        >
          {children}
        </pre>
      );
    },

    /* -------------------------------- */
    /* CODE                              */
    /* -------------------------------- */

    code: ({ className, children, ...props }) => {
      const [isCopied, setIsCopied] = useState(false);

      useEffect(() => {
        let timer = 0;

        if (isCopied) {
          timer = setTimeout(() => {
            setIsCopied(false);
          }, [2000]);
        }

        return () => clearTimeout(timer);
      }, [isCopied]);

      if (!props['data-language']) {
        return (
          <code className="rounded-md text-[0.8rem] px-1 bg-muted" {...props}>
            {children}
          </code>
        );
      }

      function extractText(node) {
        if (node === null || node === undefined || typeof node === 'boolean') {
          return '';
        }

        if (typeof node === 'string' || typeof node === 'number') {
          return String(node);
        }

        if (Array.isArray(node)) {
          return node.map(extractText).join('');
        }

        if (isValidElement(node)) {
          return extractText(node.props.children);
        }

        return '';
      }

      async function copyToClipboard(node) {
        try {
          const text = extractText(node);
          await navigator.clipboard.writeText(text);
          setIsCopied(true);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      }

      return (
        <code
          className={`
            relative
            font-mono
            font-normal
            text-[0.9rem]
            py-3
            break-words

            bg-(--code-block-bg)!

            data-[line-numbers]:[counter-reset:line]

            data-[line-numbers]:[&_span[data-line]::before]:[counter-increment:line]
            data-[line-numbers]:[&_span[data-line]::before]:content-[counter(line)]
            data-[line-numbers]:[&_span[data-line]::before]:inline-block
            data-[line-numbers]:[&_span[data-line]::before]:w-[2ch]
            data-[line-numbers]:[&_span[data-line]::before]:text-right
            data-[line-numbers]:[&_span[data-line]::before]:mr-4
            data-[line-numbers]:[&_span[data-line]::before]:opacity-70

            [&>span[data-line]]:px-4
            [&>span[data-line]]:border-l-2
            [&>span[data-line]]:border-transparent

            scrollbar-thin
            scrollbar-thumb-[var(--muted)]
            scrollbar-track-transparent

            [&::-webkit-scrollbar]:w-[6px]
            [&::-webkit-scrollbar]:h-[6px]
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[var(--muted)]
            [&::-webkit-scrollbar-thumb]:rounded-full

            ${className}
          `}
          {...props}
        >
          {children}

          <div
            onClick={() => copyToClipboard(children)}
            className="absolute top-2 right-2 text-foreground/70 hover:text-foreground transition-all rounded-sm p-2 hover:bg-muted"
          >
            {isCopied ? <Check size={14} /> : <Copy size={14} />}
          </div>
        </code>
      );
    },

    table: ({ className, ...props }) => (
      <div className="no-scrollbar my-6 w-full overflow-y-auto rounded-xl border">
        <table
          className={cn(
            'relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0',
            className
          )}
          {...props}
        />
      </div>
    ),
    tr: ({ className, ...props }) => (
      <tr className={cn('m-0 border-b', className)} {...props} />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          'px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          'px-4 py-2 text-left whitespace-nowrap [&[align=center]]:text-center [&[align=right]]:text-right',
          className
        )}
        {...props}
      />
    ),

    /* -------------------------------- */
    /* Custom Components                */
    /* -------------------------------- */
    Note,
    Pagination,
    Link: ({ className, ...props }) => (
      <Link
        className={cn(
          'text-foreground font-semibold underline underline-offset-4 cursor-pointer',
          className
        )}
        {...props}
      />
    ),
  },

  toc: (toc) => {
    const [activeId] = useActiveTocItem(toc, {
      threshold: 0.5,
      rootMargin: '0px 0px -80% 0px',
    });

    return (
      <div className="sticky w-[300px] top-4 max-h-[calc(100vh-2rem)] overflow-y-auto hidden xl:flex flex-col gap-8 hide-scrollbar pb-20">
        <div className="mt-12">
          <h2 className="text-xs font-semibold mt-0 mb-2 text-foreground/80">
            On This Page
          </h2>
          <ul className="list-inside text-xs font-semibold text-foreground/10 border-b pb-4">
            {toc.map((item, index) => (
              <>
                <li key={index} className="py-1">
                  <a
                    href={`#${item.anchor.id}`}
                    className={
                      activeId === item.anchor.id
                        ? 'text-foreground font-bold'
                        : 'cursor-pointer text-foreground/70'
                    }
                  >
                    {item.anchor.text}
                  </a>
                </li>
                {item.children && item.children.length > 0 && (
                  <ul className="list-inside ml-4">
                    {item.children.map((child) => (
                      <li key={child.anchor.id} className="py-1">
                        <a
                          href={`#${child.anchor.id}`}
                          className={
                            activeId === child.anchor.id
                              ? 'text-foreground font-bold'
                              : 'cursor-pointer text-foreground/70'
                          }
                        >
                          {child.anchor.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>

          <AdsCard />
        </div>
      </div>
    );
  },

  /* -------------------------------- */
  /* Layout                            */
  /* -------------------------------- */

  layout: ({ children, toc }) => {
    return (
      <section className="px-10 py-10 flex gap-10">
        <div className="w-full flex flex-col items-center">
          <div className="max-w-[600px] w-full">{children}</div>
        </div>

        {toc && toc}
      </section>
    );
  },
});
