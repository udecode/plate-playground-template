import { cn } from '@udecode/cn';
import type { SlateElementProps } from '@udecode/plate';
import { SlateElement } from '@udecode/plate';
import React from 'react';

export function HrElementStatic({
  children,
  className,
  nodeProps,
  ...props
}: SlateElementProps) {
  return (
    <SlateElement className={className} nodeProps={nodeProps} {...props}>
      <div className="cursor-text py-6" contentEditable={false}>
        <hr
          {...nodeProps}
          className={cn(
            'h-0.5 rounded-sm border-none bg-muted bg-clip-content'
          )}
        />
      </div>
      {children}
    </SlateElement>
  );
}
