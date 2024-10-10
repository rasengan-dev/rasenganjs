import React from "react";
import { MDXRendererProps } from "../types/index.js";
import { CodeBlock, SimpleBlock } from "./codeblock.js";


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
  MDXRenderer
}