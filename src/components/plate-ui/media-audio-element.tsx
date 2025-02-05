'use client';

import { cn, withRef } from '@udecode/cn';
import { useMediaState } from '@udecode/plate-media/react';
import { ResizableProvider } from '@udecode/plate-resizable';
import { withHOC } from '@udecode/plate/react';
import React from 'react';

import { Caption, CaptionTextarea } from './caption';
import { PlateElement } from './plate-element';

export const MediaAudioElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(
    ({ children, className, nodeProps, ...props }, ref) => {
      const { align = 'center', readOnly, unsafeUrl } = useMediaState();

      return (
        <PlateElement className={cn(className, 'mb-1')} ref={ref} {...props}>
          <figure
            className="group relative cursor-default"
            contentEditable={false}
          >
            <div className="h-16">
              <audio className="size-full" controls src={unsafeUrl} />
            </div>

            <Caption align={align} style={{ width: '100%' }}>
              <CaptionTextarea
                className="h-20"
                placeholder="Write a caption..."
                readOnly={readOnly}
              />
            </Caption>
          </figure>
          {children}
        </PlateElement>
      );
    }
  )
);
