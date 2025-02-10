// @ts-ignore
import { type Metadata } from 'rasengan';

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

/**
 * A React functional component that represents a simple block element.
 */
export type ComponentWithTextChildrenProps = {
  children: string;
};

/**
 * A React functional component that represents a simple block element.
 */
export type MDXRendererProps = {
  children: MDXPageComponent;
  className?: string;
};

/**
 * A React functional component that represents a simple block element.
 */
export type CodeBlockProps = ComponentWithTextChildrenProps & {
  className?: string;
};

export type HeadingProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export type HeadingProps2 = ComponentWithTextChildrenProps & {
  className?: string;
};

export type NavigationStructure = {
  title: string;
  link: string;
  level: number;
  children?: NavigationStructure[];
};
