'use client';

import { cn, withRef } from '@udecode/cn';
import React from 'react';

import { PlateElement } from './plate-element';

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement
        as="blockquote"
        className={cn(className, 'my-1 border-l-2 pl-6 italic')}
        ref={ref}
        {...props}
      >
        {children}
      </PlateElement>
    );
  }
);
