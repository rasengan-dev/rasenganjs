import { themes, Highlight } from 'prism-react-renderer';
import React from 'react';
import { CodeBlockProps } from '../types/index.js';
import { SimpleBlock } from './codeblock.js';

/**
 * A React component that renders a code block with syntax highlighting and a copy button.
 *
 * The component uses the `prism-react-renderer` library to provide syntax highlighting for the code block.
 * It also includes a copy button that allows the user to copy the code to their clipboard.
 *
 * @param {object} props - The component props.
 * @param {string} props.children - The code content to be displayed in the code block.
 * @param {string} [props.className] - The CSS class name to apply to the code block.
 * @returns {React.ReactElement} - The rendered code block component.
 */
export const CodeBlock2 = ({
  children,
  className = '',
}: CodeBlockProps): React.ReactElement => {
  const language = className.replace(/language-/, '');
  const [hover, setHover] = React.useState(false);

  if (!language) {
    return <SimpleBlock>{children}</SimpleBlock>;
  }

  return (
    <Highlight
      theme={themes.oneDark}
      code={children.trim()}
      language={language}
    >
      {({ className, tokens, getLineProps, getTokenProps, ...rest }: any) => {
        const [copied, setCopied] = React.useState(false);

        React.useEffect(() => {
          /**
           * Sets the `copied` state to `false` after 2 seconds, effectively hiding the "copied" indicator.
           * This function is called after the user's clipboard is updated with the code content.
           */
          const timer = setTimeout(() => {
            setCopied(false);
          }, 2000);

          return () => clearTimeout(timer);
        }, [copied]);

        /**
         * Copies the trimmed text content of the `children` prop to the user's clipboard.
         * This function is called when the "Copy" button is clicked in the code block component.
         * It sets the `copied` state to `true` for 2 seconds to display a "copied" indicator.
         */
        const handleCopy = () => {
          navigator.clipboard.writeText((children ?? '').trim());
          setCopied(true);
        };

        return (
          <figure>
            <pre
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              data-language={language}
            >
              <div>
                {hover ? (
                  <button className="copy-button" onClick={handleCopy}>
                    {copied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        color="#f0f0f0"
                        fill="none"
                      >
                        <path
                          d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8 12.5L10.5 15L16 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        color="#f0f0f0"
                        fill="none"
                      >
                        <path
                          d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ) : (
                  <span className="lang">{language}</span>
                )}

                <code className={`${className} code-block`} data-line-numbers>
                  {tokens.map((line: any, i: number) => (
                    <span data-line key={i} {...getLineProps({ line })}>
                      <span> </span>
                      {line.map((token: any, key: number) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  ))}
                </code>
              </div>
            </pre>
          </figure>
        );
      }}
    </Highlight>
  );
};
