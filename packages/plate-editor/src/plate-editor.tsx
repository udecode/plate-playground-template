'use client';

import React, { useRef } from 'react';
import { cn } from '@udecode/cn';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { commentsUsers, myUserId } from '../lib/comments';
import { MENTIONABLES } from '../lib/mentionables';
import { plugins } from '../lib/plate-plugins';

import { CommentsPopover } from '../components/comments-popover';
import { CursorOverlay } from '../components/cursor-overlay';
import { Editor } from '../components/editor';
import { FixedToolbar } from '../components/fixed-toolbar';
import { FixedToolbarButtons } from '../components/fixed-toolbar-buttons';
import { FloatingToolbar } from '../components/floating-toolbar';
import { FloatingToolbarButtons } from '../components/floating-toolbar-buttons';
import { MentionCombobox } from '../components/mention-combobox';

export default function PlateEditor() {
  const containerRef = useRef(null);

  const initialValue = [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <Plate plugins={plugins} initialValue={initialValue}>
          <div
            ref={containerRef}
            className={cn(
              'relative',
              // Block selection
              '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              className="px-[96px] py-16"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            <MentionCombobox items={MENTIONABLES} />

            <CommentsPopover />

            <CursorOverlay containerRef={containerRef} />
          </div>
        </Plate>
      </CommentsProvider>
    </DndProvider>
  );
}
