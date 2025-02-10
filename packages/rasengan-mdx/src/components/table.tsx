import React from 'react';
import { ComponentWithTextChildrenProps } from '../types/index.js';

export const Table = ({
  children,
}: ComponentWithTextChildrenProps): React.ReactElement => {
  return (
    <div className="ra-table-wrapper">
      <table>{children}</table>
    </div>
  );
};
