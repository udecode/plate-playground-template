'use client';

import { cn } from '@udecode/cn';
import type { UseEmojiPickerType } from '@udecode/plate-emoji/react';

import { Button } from './button';
import { emojiSearchIcons } from './emoji-icons';

export type EmojiPickerSearchAndClearProps = Pick<
  UseEmojiPickerType,
  'clearSearch' | 'i18n' | 'searchValue'
>;

export function EmojiPickerSearchAndClear({
  clearSearch,
  i18n,
  searchValue,
}: EmojiPickerSearchAndClearProps) {
  return (
    <div className="flex items-center text-foreground">
      <div
        className={cn(
          'absolute left-2.5 top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center text-foreground'
        )}
      >
        {emojiSearchIcons.loupe}
      </div>
      {searchValue && (
        <Button
          aria-label="Clear"
          className={cn(
            'absolute right-0.5 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-popover-foreground hover:bg-transparent'
          )}
          onClick={clearSearch}
          size="icon"
          title={i18n.clear}
          type="button"
          variant="ghost"
        >
          {emojiSearchIcons.delete}
        </Button>
      )}
    </div>
  );
}
