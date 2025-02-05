import { cn } from '@udecode/cn';
import type { SlateElementProps } from '@udecode/plate';
import { SlateElement } from '@udecode/plate';
import React from 'react';

export const LinkElementStatic = ({
  children,
  className,
  ...props
}: SlateElementProps) => {
  return (
    <SlateElement
      as="a"
      className={cn(
        className,
        'font-medium text-primary underline decoration-primary underline-offset-4'
      )}
      {...props}
    >
      {children}
    </SlateElement>
  );
};
