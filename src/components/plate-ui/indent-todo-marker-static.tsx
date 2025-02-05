import { cn } from '@udecode/cn';
import type { SlateRenderElementProps } from '@udecode/plate';
import React from 'react';

import { CheckboxStatic } from './checkbox-static';

export const TodoMarkerStatic = ({
  element,
}: Omit<SlateRenderElementProps, 'children'>) => {
  return (
    <div contentEditable={false}>
      <CheckboxStatic
        checked={element.checked as boolean}
        className="pointer-events-none absolute -left-6 top-1"
      />
    </div>
  );
};

export const TodoLiStatic = ({
  children,
  element,
}: SlateRenderElementProps) => {
  return (
    <li
      className={cn(
        'list-none',
        (element.checked as boolean) && 'text-muted-foreground line-through'
      )}
    >
      {children}
    </li>
  );
};
