import type { SlateElementProps } from '@udecode/plate';
import { SlateElement } from '@udecode/plate';
import React from 'react';

export const CodeLineElementStatic = ({
  children,
  ...props
}: SlateElementProps) => {
  return <SlateElement {...props}>{children}</SlateElement>;
};
