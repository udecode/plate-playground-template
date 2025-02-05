'use client';

import { useChat } from '@/components/editor/use-chat';
import { isHotkey, type NodeEntry } from '@udecode/plate';
import {
  AIChatPlugin,
  useEditorChat,
  useLastAssistantMessage,
} from '@udecode/plate-ai/react';
import {
  BlockSelectionPlugin,
  useIsSelecting,
} from '@udecode/plate-selection/react';
import { useEditorPlugin, useHotkeys } from '@udecode/plate/react';
import { Loader2Icon } from 'lucide-react';
import * as React from 'react';

import { AIChatEditor } from './ai-chat-editor';
import { AIMenuItems } from './ai-menu-items';
import { Command, CommandList, InputCommand } from './command';
import { Popover, PopoverAnchor, PopoverContent } from './popover';

export function AIMenu() {
  const { api, editor, useOption } = useEditorPlugin(AIChatPlugin);
  const open = useOption('open');
  const mode = useOption('mode');
  const isSelecting = useIsSelecting();

  const [value, setValue] = React.useState('');

  const chat = useChat();

  const { input, isLoading, messages, setInput } = chat;
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(
    null
  );

  const content = useLastAssistantMessage()?.content;

  const setOpen = (open: boolean) => {
    if (open) {
      api.aiChat.show();
    } else {
      api.aiChat.hide();
    }
  };

  const show = (anchorElement: HTMLElement) => {
    setAnchorElement(anchorElement);
    setOpen(true);
  };

  useEditorChat({
    chat,
    onOpenBlockSelection: (blocks: NodeEntry[]) => {
      show(editor.api.toDOMNode(blocks.at(-1)![0])!);
    },
    onOpenChange: (open) => {
      if (!open) {
        setAnchorElement(null);
        setInput('');
      }
    },
    onOpenCursor: () => {
      const [ancestor] = editor.api.block({ highest: true })!;

      if (!editor.api.isAt({ end: true }) && !editor.api.isEmpty(ancestor)) {
        editor
          .getApi(BlockSelectionPlugin)
          .blockSelection.addSelectedRow(ancestor.id as string);
      }

      show(editor.api.toDOMNode(ancestor)!);
    },
    onOpenSelection: () => {
      show(editor.api.toDOMNode(editor.api.blocks().at(-1)![0])!);
    },
  });

  useHotkeys(
    'meta+j',
    () => {
      api.aiChat.show();
    },
    { enableOnContentEditable: true, enableOnFormTags: true }
  );

  return (
    <Popover modal={false} onOpenChange={setOpen} open={open}>
      {anchorElement && (
        <PopoverAnchor virtualRef={{ current: anchorElement }} />
      )}

      <PopoverContent
        align="center"
        className="border-none bg-transparent p-0 shadow-none"
        onEscapeKeyDown={(e) => {
          e.preventDefault();

          if (isLoading) {
            api.aiChat.stop();
          } else {
            api.aiChat.hide();
          }
        }}
        // avoidCollisions={false}
        side="bottom"
        style={{
          width: anchorElement?.offsetWidth,
        }}
      >
        <Command
          className="w-full rounded-lg border shadow-md"
          onValueChange={setValue}
          value={value}
        >
          {mode === 'chat' && isSelecting && content && (
            <AIChatEditor content={content} />
          )}

          {isLoading ? (
            <div className="flex grow select-none items-center gap-2 p-2 text-sm text-muted-foreground">
              <Loader2Icon className="size-4 animate-spin" />
              {messages.length > 1 ? 'Editing...' : 'Thinking...'}
            </div>
          ) : (
            <InputCommand
              autoFocus
              className="rounded-none border-b border-solid border-border [&_svg]:hidden"
              data-plate-focus
              onKeyDown={(e) => {
                if (isHotkey('backspace')(e) && input.length === 0) {
                  e.preventDefault();
                  api.aiChat.hide();
                }
                if (isHotkey('enter')(e) && !e.shiftKey && !value) {
                  e.preventDefault();
                  void api.aiChat.submit();
                }
              }}
              onValueChange={setInput}
              placeholder="Ask AI anything..."
              value={input}
              variant="ghost"
            />
          )}

          {!isLoading && (
            <CommandList>
              <AIMenuItems setValue={setValue} />
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
