import { type Metadata } from "rasengan";

/**
 * A React functional component that represents an MDX page.
 *
 * The `MDXPageComponent` type extends the `React.FC<ReactComponentProps>` type, which means it is a React functional component that accepts the standard props for a React component.
 *
 * The `MDXPageComponent` type also has an optional `metadata` property of type `Metadata`, which can be used to store metadata about the page.
 */
export type MDXPageComponent = React.FC<any> & {
	metadata?: {
		path: string;
		metadata: Metadata;
	};
};
