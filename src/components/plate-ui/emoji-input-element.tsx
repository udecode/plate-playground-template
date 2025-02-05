'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { withRef } from '@udecode/cn';
import { EmojiInlineIndexSearch, insertEmoji } from '@udecode/plate-emoji';
import { EmojiPlugin } from '@udecode/plate-emoji/react';
import { useEditorPlugin } from '@udecode/plate/react';
import React, { useMemo, useState } from 'react';

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox';
import { PlateElement } from './plate-element';

export const EmojiInputElement = withRef<typeof PlateElement>(
  ({ className, ...props }, ref) => {
    const { children, editor, element } = props;
    const { useOption } = useEditorPlugin(EmojiPlugin);
    const data = useOption('data')!;
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, 100);
    const isPending = value !== debouncedValue;

    const filteredEmojis = useMemo(() => {
      if (debouncedValue.trim().length === 0) return [];

      return EmojiInlineIndexSearch.getInstance(data)
        .search(debouncedValue.replace(/:$/, ''))
        .get();
    }, [data, debouncedValue]);

    return (
      <PlateElement
        as="span"
        className={className}
        data-slate-value={element.value}
        ref={ref}
        {...props}
      >
        <InlineCombobox
          element={element}
          filter={false}
          hideWhenNoValue
          setValue={setValue}
          trigger=":"
          value={value}
        >
          <InlineComboboxInput />

          <InlineComboboxContent>
            {!isPending && (
              <InlineComboboxEmpty>No results</InlineComboboxEmpty>
            )}

            <InlineComboboxGroup>
              {filteredEmojis.map((emoji) => (
                <InlineComboboxItem
                  key={emoji.id}
                  onClick={() => insertEmoji(editor, emoji)}
                  value={emoji.name}
                >
                  {emoji.skins[0].native} {emoji.name}
                </InlineComboboxItem>
              ))}
            </InlineComboboxGroup>
          </InlineComboboxContent>
        </InlineCombobox>

        {children}
      </PlateElement>
    );
  }
);
