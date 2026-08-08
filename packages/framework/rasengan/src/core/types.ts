import React from 'react';
import { RootComponentProps } from '../routing/types.js';

/**
 * Props for App component
 */
export type AppProps = {
  /**
   * Represents the component that will be rendered
   */
  Component: React.FC<Omit<RootComponentProps, 'Router'>>;

  /**
   * Represents the children of the component
   */
  children?: React.ReactNode;
};
