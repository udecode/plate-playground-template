'use client';

import { cn, withRef } from '@udecode/cn';
import { PlateElement, useSelected } from '@udecode/plate/react';
import React from 'react';

export const TableRowElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const selected = useSelected();

    return (
      <PlateElement
        as="tr"
        className={cn(className, 'h-full')}
        data-selected={selected ? 'true' : undefined}
        ref={ref}
        {...props}
      >
        {children}
      </PlateElement>
    );
  }
);
