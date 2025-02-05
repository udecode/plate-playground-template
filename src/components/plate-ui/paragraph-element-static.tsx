import { cn } from '@udecode/cn';
import type { SlateElementProps } from '@udecode/plate';
import { SlateElement } from '@udecode/plate';
import React from 'react';

export const ParagraphElementStatic = ({
  children,
  className,
  ...props
}: SlateElementProps) => {
  return (
    <SlateElement className={cn(className, 'm-0 px-0 py-1')} {...props}>
      {children}
    </SlateElement>
  );
};
