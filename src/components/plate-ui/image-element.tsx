'use client';

import { cn, withRef } from '@udecode/cn';
import { useDraggable } from '@udecode/plate-dnd';
import { Image, ImagePlugin, useMediaState } from '@udecode/plate-media/react';
import { ResizableProvider, useResizableStore } from '@udecode/plate-resizable';
import { withHOC } from '@udecode/plate/react';
import React from 'react';

import { Caption, CaptionTextarea } from './caption';
import { MediaPopover } from './media-popover';
import { PlateElement } from './plate-element';
import {
  mediaResizeHandleVariants,
  Resizable,
  ResizeHandle,
} from './resizable';

export const ImageElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(
    ({ children, className, nodeProps, ...props }, ref) => {
      const { align = 'center', focused, readOnly, selected } = useMediaState();

      const width = useResizableStore().get.width();

      const { handleRef, isDragging } = useDraggable({
        element: props.element,
      });

      return (
        <MediaPopover plugin={ImagePlugin}>
          <PlateElement
            className={cn(className, 'py-2.5')}
            ref={ref}
            {...props}
          >
            <figure className="group relative m-0" contentEditable={false}>
              <Resizable
                align={align}
                options={{
                  align,
                  readOnly,
                }}
              >
                <ResizeHandle
                  className={mediaResizeHandleVariants({ direction: 'left' })}
                  options={{ direction: 'left' }}
                />
                <Image
                  alt=""
                  className={cn(
                    'block w-full max-w-full cursor-pointer object-cover px-0',
                    'rounded-sm',
                    focused && selected && 'ring-2 ring-ring ring-offset-2',
                    isDragging && 'opacity-50'
                  )}
                  ref={handleRef}
                  {...nodeProps}
                />
                <ResizeHandle
                  className={mediaResizeHandleVariants({
                    direction: 'right',
                  })}
                  options={{ direction: 'right' }}
                />
              </Resizable>

              <Caption align={align} style={{ width }}>
                <CaptionTextarea
                  onFocus={(e) => {
                    e.preventDefault();
                  }}
                  placeholder="Write a caption..."
                  readOnly={readOnly}
                />
              </Caption>
            </figure>

            {children}
          </PlateElement>
        </MediaPopover>
      );
    }
  )
);
