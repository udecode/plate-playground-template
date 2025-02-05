'use client';

import { cn, withRef } from '@udecode/cn';
import type { TLinkElement } from '@udecode/plate-link';
import { useLink } from '@udecode/plate-link/react';
import React from 'react';

import { PlateElement } from './plate-element';

export const LinkElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const element = props.element as TLinkElement;
    const { props: linkProps } = useLink({ element });

    return (
      <PlateElement
        as="a"
        className={cn(
          className,
          'font-medium text-primary underline decoration-primary underline-offset-4'
        )}
        ref={ref}
        {...(linkProps as any)}
        {...props}
      >
        {children}
      </PlateElement>
    );
  }
);
