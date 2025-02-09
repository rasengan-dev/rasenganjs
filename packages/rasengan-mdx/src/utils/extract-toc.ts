import { remark } from "remark";
import remarkToc from "remark-toc";

export async function extractToc(markdown: string) {
	const file = await remark()
		.use(remarkToc, {
			heading: "structure",
			maxDepth: 3,
		})
		.process(markdown);

	return String(file);
}

