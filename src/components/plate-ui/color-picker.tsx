'use client';

import { cn } from '@udecode/cn';
import { EraserIcon } from 'lucide-react';
import React from 'react';

import { ColorDropdownMenuItems, TColor } from './color-dropdown-menu-items';
import { ColorCustom } from './colors-custom';
import { DropdownMenuGroup, DropdownMenuItem } from './dropdown-menu';

export const ColorPickerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    clearColor: () => void;
    colors: TColor[];
    customColors: TColor[];
    updateColor: (color: string) => void;
    updateCustomColor: (color: string) => void;
    color?: string;
  }
>(
  (
    {
      className,
      clearColor,
      color,
      colors,
      customColors,
      updateColor,
      updateCustomColor,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('flex flex-col', className)} ref={ref} {...props}>
        <DropdownMenuGroup label="Custom Colors">
          <ColorCustom
            className="px-2"
            color={color}
            colors={colors}
            customColors={customColors}
            updateColor={updateColor}
            updateCustomColor={updateCustomColor}
          />
        </DropdownMenuGroup>
        <DropdownMenuGroup label="Default Colors">
          <ColorDropdownMenuItems
            className="px-2"
            color={color}
            colors={colors}
            updateColor={updateColor}
          />
        </DropdownMenuGroup>
        {color && (
          <DropdownMenuGroup>
            <DropdownMenuItem className="p-2" onClick={clearColor}>
              <EraserIcon />
              <span>Clear</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </div>
    );
  }
);

export const ColorPicker = React.memo(
  ColorPickerContent,
  (prev, next) =>
    prev.color === next.color &&
    prev.colors === next.colors &&
    prev.customColors === next.customColors
);
