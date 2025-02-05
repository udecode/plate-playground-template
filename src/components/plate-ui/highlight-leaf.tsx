'use client';

import { cn, withRef } from '@udecode/cn';
import { PlateLeaf } from '@udecode/plate/react';
import React from 'react';

export const HighlightLeaf = withRef<typeof PlateLeaf>(
  ({ children, className, ...props }, ref) => (
    <PlateLeaf
      as="mark"
      className={cn(className, 'bg-highlight/30 text-inherit')}
      ref={ref}
      {...props}
    >
      {children}
    </PlateLeaf>
  )
);
