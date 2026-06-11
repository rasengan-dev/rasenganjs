import {
  defineMDXConfig,
  CodeBlock,
  TableOfContents,
  useActiveTocItem,
  getIconForLanguageExtension,
} from '@rasenganjs/mdx';
import Image from '@rasenganjs/image';
import { ComponentProps } from 'react';
import { useRef } from 'react';

export default defineMDXConfig({
  components: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-6 text-foreground">
        {children}
      </h1>
    ),

    h2: ({ children, ...props }) => (
      <h2
        {...(props as ComponentProps<'h2'>)}
        className="text-2xl font-bold mt-6 mb-2"
      >
        {children}
      </h2>
    ),

    h3: ({ children, ...props }) => (
      <h3
        {...(props as ComponentProps<'h3'>)}
        className="text-xl font-bold mt-6 mb-1"
      >
        {children}
      </h3>
    ),

    h4: ({ children, ...props }) => (
      <h4
        {...(props as ComponentProps<'h4'>)}
        className="text-md font-bold mt-4 mb-1"
      >
        {children}
      </h4>
    ),

    h5: ({ children, ...props }) => (
      <h5
        {...(props as ComponentProps<'h5'>)}
        className="text-sm font-bold mt-3 mb-1"
      >
        {children}
      </h5>
    ),

    h6: ({ children, ...props }) => (
      <h6
        {...(props as ComponentProps<'h6'>)}
        className="text-xs font-bold mt-3 mb-1"
      >
        {children}
      </h6>
    ),

    p: ({ children }) => (
      <p className="mt-2 mb-2 text-foreground/70">{children}</p>
    ),

    a: ({ children, href }: any) => (
      <a
        href={href}
        className="text-primary font-bold underline underline-offset-4 cursor-pointer"
      >
        {children}
      </a>
    ),

    /* -------------------------------- */
    /* Code blocks wrapper (figure)     */
    /* -------------------------------- */

    figure: ({ className, ...props }: React.ComponentProps<'figure'>) => {
      return (
        <figure
          className={`
            my-[10px]
            rounded-lg
            border border-border
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

    figcaption: ({
      className,
      children,
      ...props
    }: React.ComponentProps<'figcaption'>) => {
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
            text-sm font-normal
            bg-[var(--bg-code-highlight)]
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

    pre: ({ className, children, ...props }: any) => {
      return <pre {...props}>{children}</pre>;
    },

    /* -------------------------------- */
    /* CODE                              */
    /* -------------------------------- */

    code: ({
      className,
      ...props
    }: React.ComponentProps<'code'> & { 'data-language': string }) => {
      if (!props['data-language']) {
        return (
          <code
            className="rounded-md border border-border text-[0.8rem] px-1 bg-muted"
            {...props}
          ></code>
        );
      }

      return (
        <code
          className={`
            font-mono
            text-[0.8rem]
            py-3
            break-words

            bg-[var(--shiki-light-bg)]
            dark:bg-[var(--shiki-dark-bg)]

            data-[line-numbers]:[counter-reset:line]

            data-[line-numbers]:[&_span[data-line]::before]:[counter-increment:line]
            data-[line-numbers]:[&_span[data-line]::before]:content-[counter(line)]
            data-[line-numbers]:[&_span[data-line]::before]:inline-block
            data-[line-numbers]:[&_span[data-line]::before]:w-[2ch]
            data-[line-numbers]:[&_span[data-line]::before]:text-right
            data-[line-numbers]:[&_span[data-line]::before]:mr-4
            data-[line-numbers]:[&_span[data-line]::before]:opacity-70

            [&>span[data-line]]:px-4
            [&>span[data-line]]:border-l-4
            [&>span[data-line]]:border-transparent

            [&>span[data-highlighted-line]]:bg-[#3e4bff33]
            [&>span[data-highlighted-line]]:border-l-[#3e4bff99]

            scrollbar-thin
            scrollbar-thumb-[var(--border-dark)]
            scrollbar-track-transparent

            [&::-webkit-scrollbar]:w-[6px]
            [&::-webkit-scrollbar]:h-[6px]
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[var(--border-dark)]
            [&::-webkit-scrollbar-thumb]:rounded-full

            ${className}
          `}
          {...props}
        />
      );
    },

    /* -------------------------------- */
    /* Highlight characters              */
    /* -------------------------------- */

    mark: (props: any) => (
      <mark
        className="bg-[var(--bg-code-highlight-2)] rounded px-[5px]"
        {...props}
      />
    ),

    /* -------------------------------- */
    /* Image                             */
    /* -------------------------------- */

    img: (props: any) => (
      <Image
        src={props.src}
        alt={props.alt || ''}
        className="w-full h-auto my-2"
      />
    ),

    /* -------------------------------- */
    /* Table                             */
    /* -------------------------------- */

    table: ({ className, ...props }: React.ComponentProps<'table'>) => (
      <div className="no-scrollbar my-6 w-full overflow-y-auto rounded-xl border">
        <table
          className={`relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0 ${className}`}
          {...props}
        />
      </div>
    ),
    tr: ({ className, ...props }: React.ComponentProps<'tr'>) => (
      <tr className={`m-0 border-b ${className}`} {...props} />
    ),
    th: ({ className, ...props }: React.ComponentProps<'th'>) => (
      <th
        className={`px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ${className}`}
        {...props}
      />
    ),
    td: ({ className, ...props }: React.ComponentProps<'td'>) => (
      <td
        className={`px-4 py-2 text-left whitespace-nowrap [&[align=center]]:text-center [&[align=right]]:text-right ${className}`}
        {...props}
      />
    ),

    /* -------------------------------- */
    /* Blockquote                        */
    /* -------------------------------- */

    blockquote: (props: any) => (
      <blockquote
        className="border-l-4 border-red-500 pl-4 italic text-gray-500"
        {...props}
      />
    ),
  },

  /* -------------------------------- */
  /* TOC                               */
  /* -------------------------------- */

  toc: (toc) => {
    const [activeId] = useActiveTocItem(toc);

    return (
      <div className="sticky top-[64px] hidden xl:flex max-h-screen overflow-y-auto flex-col">
        <div className="mt-8">
          <h2 className="text-sm mt-6 mb-2 text-foreground/50">
            Table of Contents
          </h2>

          <ul className="list-inside text-sm">
            {toc.map((item, index) => (
              <>
                <li key={index} className="py-1">
                  <a
                    href={`#${item.anchor.id}`}
                    className={
                      activeId === item.anchor.id
                        ? 'text-primary underline underline-offset-4'
                        : 'text-primary hover:underline hover:underline-offset-4'
                    }
                  >
                    {item.anchor.text}
                  </a>
                </li>

                {item.children?.length > 0 && (
                  <ul className="list-inside ml-4">
                    {item.children.map((child) => (
                      <li key={child.anchor.id} className="py-1">
                        <a
                          href={`#${child.anchor.id}`}
                          className={
                            activeId === child.anchor.id
                              ? 'text-primary underline underline-offset-4'
                              : 'text-primary hover:underline hover:underline-offset-4'
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
        </div>
      </div>
    );
  },

  /* -------------------------------- */
  /* Layout                            */
  /* -------------------------------- */

  layout: ({ children, toc }) => {
    return (
      <section className="px-10 bg-background py-10 flex gap-10 dark">
        <div className="w-full flex flex-col items-center">
          <div className="max-w-[800px]">{children}</div>
        </div>

        {toc && <div className="w-[275px]">{toc}</div>}
      </section>
    );
  },
});
