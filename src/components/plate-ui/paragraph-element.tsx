'use client';

import { cn } from '@udecode/cn';
import { withRef } from '@udecode/plate/react';
import React from 'react';

import { PlateElement } from './plate-element';

export const ParagraphElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement
        className={cn(className, 'm-0 px-0 py-1')}
        ref={ref}
        {...props}
      >
        {children}
      </PlateElement>
    );
  }
);
