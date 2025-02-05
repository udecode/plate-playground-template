'use client';

import * as Popover from '@radix-ui/react-popover';
import React, { type ReactNode } from 'react';

type EmojiToolbarDropdownProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  control: ReactNode;
};

export function EmojiToolbarDropdown({
  children,
  control,
  isOpen,
  setIsOpen,
}: EmojiToolbarDropdownProps) {
  return (
    <Popover.Root onOpenChange={setIsOpen} open={isOpen}>
      <Popover.Trigger asChild>{control}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="z-[100]">{children}</Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
