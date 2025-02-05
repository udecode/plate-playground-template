'use client';

import type { UseEmojiPickerType } from '@udecode/plate-emoji/react';
import type { ReactNode } from 'react';

export type EmojiPickerSearchBarProps = {
  children: ReactNode;
} & Pick<UseEmojiPickerType, 'i18n' | 'searchValue' | 'setSearch'>;

export function EmojiPickerSearchBar({
  children,
  i18n,
  searchValue,
  setSearch,
}: EmojiPickerSearchBarProps) {
  return (
    <div className="flex items-center px-2">
      <div className="relative flex grow items-center">
        <input
          aria-label="Search"
          autoComplete="off"
          className="block w-full appearance-none rounded-full border-0 bg-muted px-10 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:outline-none"
          onChange={(event) => setSearch(event.target.value)}
          placeholder={i18n.search}
          type="text"
          value={searchValue}
        />
        {children}
      </div>
    </div>
  );
}
