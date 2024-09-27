import { themes, Highlight } from "prism-react-renderer";
import React from "react";
import { MDXPageComponent } from "../types/index.js";

type ComponentWithTextChildrenProps = {
	children: string;
};

type MDXRendererProps = {
  children: MDXPageComponent;
  className?: string;
};

type CodeBlockProps = ComponentWithTextChildrenProps & {
  className?: string;
};


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
const CodeBlock = ({ children, className = "" }: CodeBlockProps): React.ReactElement => {
	const language = className.replace(/language-/, "");

	if (!language) {
		return <SimpleBlock>{children}</SimpleBlock>;
	}

	return (
		<Highlight
			theme={themes.oneDark}
			code={children.trim()}
			language={language}
		>
			{({ className, tokens, getLineProps, getTokenProps }: any) => {
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
					navigator.clipboard.writeText(children.trim());
					setCopied(true);
				};

				return (
					<pre
						className={className}
						style={{
							color: "#fff",
							backgroundColor: "#1d2529",
							borderRadius: "20px",
							overflow: "hidden",
							padding: "0px",
						}}
					>
						<div
							style={{
								width: "100%",
								height: "50px",
								backgroundColor: "#28373f",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								paddingLeft: "20px",
								paddingRight: "20px",
							}}
						>
							<span>Filename</span>

							<button className='copy-button' onClick={handleCopy}>
								{copied ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										width='24'
										height='24'
										color='#f0f0f0'
										fill='none'
									>
										<path
											d='M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z'
											stroke='currentColor'
											strokeWidth='1.5'
										/>
										<path
											d='M8 12.5L10.5 15L16 9'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										width='24'
										height='24'
										color='#f0f0f0'
										fill='none'
									>
										<path
											d='M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								)}
							</button>
						</div>

						<div
							style={{
								padding: "20px",
								fontSize: "14px",
							}}
						>
							<code>
								{tokens.map((line: any, i: number) => (
									<div key={i} {...getLineProps({ line })}>
										<span
											style={{
												opacity: 0.6,
												marginRight: "5px",
											}}
										>
											{i + 1}
										</span>
										<span> </span>
										{line.map((token: any, key: number) => (
											<span key={key} {...getTokenProps({ token })} />
										))}
									</div>
								))}
							</code>
						</div>
					</pre>
				);
			}}
		</Highlight>
	);
};

const SimpleBlock = ({ children }: ComponentWithTextChildrenProps): React.ReactElement => {
	return (
		<span 
			className="simple-block"
			style={{
				fontSize: "14px",
				borderRadius: "5px",
				paddingLeft: "3.6px",
				paddingRight: "3.6px",
				paddingTop: "2px",
				paddingBottom: "2px",
				marginInline: "0px",
				backgroundColor: "#f7f7f7",
				border: "1px solid #f0f0f0",
			}}
		>{children}</span>
	);
};

/**
 * Renders an MDX content component with a custom code block component.
 *
 * @param {MDXRendererProps} props - The props for the MDX renderer.
 * @param {React.ReactNode} props.children - The MDX content to render.
 * @param {string} [props.className] - An optional CSS class name to apply to the rendered section.
 * @returns {React.ReactElement} - The rendered MDX content with the custom code block component.
 */
const MDXRenderer = ({ children: MDXContent, className }: MDXRendererProps): React.ReactElement => {
	return (
		<section className={"rasengan-markdown-body " + className}>
			<MDXContent
				components={{
					code: CodeBlock,
				}}
			/>
		</section>
	);
};

export {
  MDXRenderer,
  CodeBlock,
	SimpleBlock
}