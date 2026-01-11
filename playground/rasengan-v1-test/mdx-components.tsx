import {
  defineMDXConfig,
  CodeBlock,
  TableOfContents,
  useActiveTocItem,
} from '@rasenganjs/mdx';
import Image from '@rasenganjs/image';
import { ComponentProps } from 'react';

export default defineMDXConfig({
  components: {
    h1: ({ children }) => (
      <h1
        className="text-3xl font-bold mt-8 mb-6 text-foreground"
        children={children}
      />
    ),
    h2: ({ children, ...props }) => {
      console.log({ children, props });
      return (
        <h2
          {...(props as ComponentProps<'h2'>)}
          className="text-2xl font-bold mt-6 mb-2"
          children={children}
        />
      );
    },
    h3: ({ children, ...props }) => (
      <h3
        {...(props as ComponentProps<'h3'>)}
        className="text-xl font-bold mt-6 mb-1"
        children={children}
      />
    ),
    h4: ({ children, ...props }) => (
      <h4
        {...(props as ComponentProps<'h4'>)}
        className="text-md font-bold mt-4 mb-1"
        children={children}
      />
    ),
    h5: ({ children, ...props }) => (
      <h5
        {...(props as ComponentProps<'h5'>)}
        className="text-sm font-bold mt-3 mb-1"
        children={children}
      />
    ),
    h6: ({ children, ...props }) => (
      <h6
        {...(props as ComponentProps<'h6'>)}
        className="text-xs font-bold mt-3 mb-1"
        children={children}
      />
    ),

    p: ({ children }) => (
      <p className="mt-2 mb-2 text-foreground/20" children={children} />
    ),
    a: ({ children, href }: any) => {
      console.log({ children, href });
      return (
        <a
          href={href}
          className="text-foreground/20 font-bold cursor-pointer text-primary underline"
          children={children}
        />
      );
    },
    code: ({ children, ...rest }: any) => {
      console.log({ children, rest });

      if (rest['data-language']) {
        return <CodeBlock children={children} {...rest} />;
      }

      return (
        <code className="bg-[#eee] px-1 py-0.5 rounded text-sm">
          {children}
        </code>
      );
    },
    img: (props: any) => (
      <Image
        src={props.src}
        alt={props.alt || ''}
        className="mt-2 mb-2 w-full h-auto"
      />
    ),
    table: (props: any) => (
      <table
        className="w-full border-collapse border border-gray-300 mt-2 mb-2 [&_th]:p-2 [&_td]:p-2 [&_th]:border [&_td]:border [&_th]:border-gray-300 [&_td]:border-gray-300 [&_th]:bg-gray-100 [&_th]:text-left [&_th]:font-bold rounded-xl [&_td]:bg-gray-50"
        {...props}
      />
    ),
    blockquote: (props: any) => (
      <blockquote
        style={{
          borderLeft: '4px solid #ef4444',
          paddingLeft: '1rem',
          fontStyle: 'italic',
          color: '#6b7280',
        }}
        {...props}
      />
    ),
  },
  toc: (toc) => {
    const [activeId] = useActiveTocItem(toc);

    return (
      <div className="sticky top-[64px] hidden xl:flex max-h-screen overflow-y-auto flex-col gao-8">
        {/* <TableOfContents items={toc} /> */}

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
                        ? 'text-primary underline'
                        : 'text-foreground/20 cursor-pointer text-primary hover:underline'
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
                              ? 'text-primary underline'
                              : 'text-foreground/20 cursor-pointer text-primary hover:underline'
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
});
