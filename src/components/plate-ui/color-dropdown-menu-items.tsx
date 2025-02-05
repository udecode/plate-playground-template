'use client';

import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { cn } from '@udecode/cn';
import { Check } from 'lucide-react';
import React from 'react';

import { buttonVariants } from './button';
import { DropdownMenuItem } from './dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

export type TColor = {
  name: string;
  value: string;
  isBrightColor: boolean;
};

type ColorDropdownMenuItemProps = {
  isSelected: boolean;
  value: string;
  isBrightColor: boolean;
  updateColor: (color: string) => void;
  name?: string;
} & DropdownMenuItemProps;

type ColorDropdownMenuItemsProps = {
  colors: TColor[];
  updateColor: (color: string) => void;
  color?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ColorDropdownMenuItem({
  className,
  isBrightColor,
  isSelected,
  name,
  updateColor,
  value,
  ...props
}: ColorDropdownMenuItemProps) {
  const content = (
    <DropdownMenuItem
      className={cn(
        buttonVariants({
          isMenu: true,
          size: 'icon',
          variant: 'outline',
        }),
        'my-1 flex size-6 items-center justify-center rounded-full border border-solid border-muted p-0 transition-all hover:scale-125',
        !isBrightColor && 'border-transparent text-white hover:!text-white',
        className
      )}
      onSelect={(e) => {
        e.preventDefault();
        updateColor(value);
      }}
      style={{ backgroundColor: value }}
      {...props}
    >
      {isSelected ? <Check className="!size-3" /> : null}
    </DropdownMenuItem>
  );

  return name ? (
    <Tooltip>
      <TooltipTrigger>{content}</TooltipTrigger>
      <TooltipContent className="mb-1 capitalize">{name}</TooltipContent>
    </Tooltip>
  ) : (
    content
  );
}

export function ColorDropdownMenuItems({
  className,
  color,
  colors,
  updateColor,
  ...props
}: ColorDropdownMenuItemsProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(10,1fr)] place-items-center',
        className
      )}
      {...props}
    >
      <TooltipProvider>
        {colors.map(({ isBrightColor, name, value }) => (
          <ColorDropdownMenuItem
            isBrightColor={isBrightColor}
            isSelected={color === value}
            key={name ?? value}
            name={name}
            updateColor={updateColor}
            value={value}
          />
        ))}
        {props.children}
      </TooltipProvider>
    </div>
  );
}
