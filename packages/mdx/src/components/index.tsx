import React from "react";
import { MDXRendererProps } from "../types/index.js";
import { CodeBlock } from "./codeblock.js";
import { Table } from "./table.js";
import { Heading } from "./heading.js";

import MarkdownComponent from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";

/**
 * Renders an MDX content component with a custom code block component.
 *
 * @param {MDXRendererProps} props - The props for the MDX renderer.
 * @param {React.ReactNode} props.children - The MDX content to render.
 * @param {string} [props.className] - An optional CSS class name to apply to the rendered section.
 * @returns {React.ReactElement} - The rendered MDX content with the custom code block component.
 */
const MDXRenderer = ({
	children: MDXContent,
	className,
}: MDXRendererProps): React.ReactElement => {
	return (
		<section className={"rasengan-markdown-body " + className}>
			<MDXContent
				components={{
					code: CodeBlock,
					table: Table,
					h1: Heading({ variant: "h1" }),
					h2: Heading({ variant: "h2" }),
					h3: Heading({ variant: "h3" }),
					h4: Heading({ variant: "h4" }),
					h5: Heading({ variant: "h5" }),
					h6: Heading({ variant: "h6" }),
				}}
			/>
		</section>
	);
};

function Markdown({
	content,
	className,
}: {
	content: string;
	className?: React.ComponentProps<"section">["className"];
}) {
	return (
		<section className={"rasengan-markdown-body " + className}>
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
					code: CodeBlock,
					table: Table,
					h1: Heading({ variant: "h1" }),
					h2: Heading({ variant: "h2" }),
					h3: Heading({ variant: "h3" }),
					h4: Heading({ variant: "h4" }),
					h5: Heading({ variant: "h5" }),
					h6: Heading({ variant: "h6" }),
				}}
				
			/>
		</section>
	);
}

export { MDXRenderer, Markdown };
