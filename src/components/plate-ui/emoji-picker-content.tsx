'use client';

import { cn } from '@udecode/cn';
import { type Emoji, EmojiSettings, type GridRow } from '@udecode/plate-emoji';
import type { UseEmojiPickerType } from '@udecode/plate-emoji/react';
import { memo, useCallback } from 'react';

export type EmojiButtonProps = {
  index: number;
  emoji: Emoji;
  onMouseOver: (emoji?: Emoji) => void;
  onSelect: (emoji: Emoji) => void;
};

export type EmojiPickerContentProps = Pick<
  UseEmojiPickerType,
  | 'emojiLibrary'
  | 'i18n'
  | 'isSearching'
  | 'onMouseOver'
  | 'onSelectEmoji'
  | 'refs'
  | 'searchResult'
  | 'settings'
  | 'visibleCategories'
>;

export type RowOfButtonsProps = {
  row: GridRow;
} & Pick<UseEmojiPickerType, 'emojiLibrary' | 'onMouseOver' | 'onSelectEmoji'>;

const Button = memo(
  ({ emoji, index, onMouseOver, onSelect }: EmojiButtonProps) => {
    return (
      <button
        aria-label={emoji.skins[0].native}
        className="group relative flex size-9 cursor-pointer items-center justify-center border-none bg-transparent text-2xl leading-none"
        data-index={index}
        onClick={() => onSelect(emoji)}
        onMouseEnter={() => onMouseOver(emoji)}
        onMouseLeave={() => onMouseOver()}
        tabIndex={-1}
        type="button"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
        />
        <span
          className="relative"
          data-emoji-set="native"
          style={{
            fontFamily:
              '"Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols',
          }}
        >
          {emoji.skins[0].native}
        </span>
      </button>
    );
  }
);
Button.displayName = 'Button';

const RowOfButtons = memo(
  ({ emojiLibrary, onMouseOver, onSelectEmoji, row }: RowOfButtonsProps) => (
    <div className="flex" data-index={row.id} key={row.id}>
      {row.elements.map((emojiId, index) => (
        <Button
          emoji={emojiLibrary.getEmoji(emojiId)}
          index={index}
          key={emojiId}
          onMouseOver={onMouseOver}
          onSelect={onSelectEmoji}
        />
      ))}
    </div>
  )
);
RowOfButtons.displayName = 'RowOfButtons';

export function EmojiPickerContent({
  emojiLibrary,
  i18n,
  isSearching = false,
  onMouseOver,
  onSelectEmoji,
  refs,
  searchResult,
  settings = EmojiSettings,
  visibleCategories,
}: EmojiPickerContentProps) {
  const getRowWidth = settings.perLine.value * settings.buttonSize.value;

  const isCategoryVisible = useCallback(
    (categoryId: any) => {
      return visibleCategories.has(categoryId)
        ? visibleCategories.get(categoryId)
        : false;
    },
    [visibleCategories]
  );

  const EmojiList = useCallback(() => {
    return emojiLibrary
      .getGrid()
      .sections()
      .map(({ id: categoryId }) => {
        const section = emojiLibrary.getGrid().section(categoryId);
        const { buttonSize } = settings;

        return (
          <div
            data-id={categoryId}
            key={categoryId}
            ref={section.root}
            style={{ width: getRowWidth }}
          >
            <div className="sticky -top-px z-[1] bg-popover/90 p-1 py-2 text-sm font-semibold backdrop-blur-sm">
              {i18n.categories[categoryId]}
            </div>
            <div
              className="relative flex flex-wrap"
              style={{ height: section.getRows().length * buttonSize.value }}
            >
              {isCategoryVisible(categoryId) &&
                section
                  .getRows()
                  .map((row: GridRow) => (
                    <RowOfButtons
                      emojiLibrary={emojiLibrary}
                      key={row.id}
                      onMouseOver={onMouseOver}
                      onSelectEmoji={onSelectEmoji}
                      row={row}
                    />
                  ))}
            </div>
          </div>
        );
      });
  }, [
    emojiLibrary,
    getRowWidth,
    i18n.categories,
    isCategoryVisible,
    onSelectEmoji,
    onMouseOver,
    settings,
  ]);

  const SearchList = useCallback(() => {
    return (
      <div data-id="search" style={{ width: getRowWidth }}>
        <div className="sticky -top-px z-[1] bg-popover/90 p-1 py-2 text-sm font-semibold text-card-foreground backdrop-blur-sm">
          {i18n.searchResult}
        </div>
        <div className="relative flex flex-wrap">
          {searchResult.map((emoji: Emoji, index: number) => (
            <Button
              emoji={emojiLibrary.getEmoji(emoji.id)}
              index={index}
              key={emoji.id}
              onMouseOver={onMouseOver}
              onSelect={onSelectEmoji}
            />
          ))}
        </div>
      </div>
    );
  }, [
    emojiLibrary,
    getRowWidth,
    i18n.searchResult,
    searchResult,
    onSelectEmoji,
    onMouseOver,
  ]);

  return (
    <div
      className={cn(
        'h-full min-h-[50%] overflow-y-auto overflow-x-hidden px-2',
        '[&::-webkit-scrollbar]:w-4',
        '[&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-button]:size-0',
        '[&::-webkit-scrollbar-thumb]:min-h-11 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/25',
        '[&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-popover [&::-webkit-scrollbar-thumb]:bg-clip-padding'
      )}
      data-id="scroll"
      ref={refs.current.contentRoot}
    >
      <div className="h-full" ref={refs.current.content}>
        {isSearching ? SearchList() : EmojiList()}
      </div>
    </div>
  );
}
