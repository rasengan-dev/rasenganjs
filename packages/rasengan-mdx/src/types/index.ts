// @ts-ignore
import { type Metadata } from 'rasengan';
import React from 'react';

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

  toc?: Array<TOCItem>;
};

export type TOCItem = {
  title: string;
  anchor: {
    id: string;
    text: React.ReactNode;
  };
  level: 2 | 3;
  children: Array<Omit<TOCItem, 'children'>>;
};

/**
 * A React functional component that represents a simple block element.
 */
export type ComponentWithTextChildrenProps = {
  children: React.ReactNode;
};

/**
 * A React functional component that represents a simple block element.
 */
export type MDXRendererProps = {
  children: MDXPageComponent;
  className?: string;

  // Used to customise the mdx visual aspect
  config?: MDXConfigProps;
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

type TOCConfig = (toc: Array<TOCItem>) => React.ReactNode;

type ComponentConfig = {
  [Key in Extract<React.ElementType, string>]?: React.ElementType<
    React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>
  >;
};

export type MDXConfigProps = {
  components?: ComponentConfig;
  toc?: TOCConfig;
};
