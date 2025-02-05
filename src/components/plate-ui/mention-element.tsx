'use client';

import { useMounted } from '@/hooks/use-mounted';
import { cn, withRef } from '@udecode/cn';
import { getHandler, IS_APPLE } from '@udecode/plate';
import type { TMentionElement } from '@udecode/plate-mention';
import { useFocused, useReadOnly, useSelected } from '@udecode/plate/react';
import React from 'react';

import { PlateElement } from './plate-element';

export const MentionElement = withRef<
  typeof PlateElement,
  {
    prefix?: string;
    onClick?: (mentionNode: any) => void;
  }
>(({ children, className, onClick, prefix, ...props }, ref) => {
  const element = props.element as TMentionElement;
  const selected = useSelected();
  const focused = useFocused();
  const mounted = useMounted();
  const readOnly = useReadOnly();

  return (
    <PlateElement
      className={cn(
        className,
        'inline-block rounded-md bg-muted px-1.5 py-0.5 align-baseline text-sm font-medium',
        !readOnly && 'cursor-pointer',
        selected && focused && 'ring-2 ring-ring',
        element.children[0].bold === true && 'font-bold',
        element.children[0].italic === true && 'italic',
        element.children[0].underline === true && 'underline'
      )}
      contentEditable={false}
      data-slate-value={element.value}
      draggable
      onClick={getHandler(onClick, element)}
      ref={ref}
      {...props}
    >
      {mounted && IS_APPLE ? (
        // Mac OS IME https://github.com/ianstormtaylor/slate/issues/3490
        <React.Fragment>
          {children}
          {prefix}
          {element.value}
        </React.Fragment>
      ) : (
        // Others like Android https://github.com/ianstormtaylor/slate/pull/5360
        <React.Fragment>
          {prefix}
          {element.value}
          {children}
        </React.Fragment>
      )}
    </PlateElement>
  );
});
