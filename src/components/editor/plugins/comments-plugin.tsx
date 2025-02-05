'use client';

import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import type { TComment } from '@udecode/plate-comments';
import { CommentsPlugin } from '@udecode/plate-comments/react';

const commentsData: Record<string, TComment> = {
  1: {
    createdAt: 1_663_453_625_129,
    id: '1',
    userId: '1',
    value: [{ children: [{ text: 'This is a comment.' }], type: 'p' }],
  },
  2: {
    createdAt: 1_663_453_729_191,
    id: '2',
    userId: '1',
    value: [
      { children: [{ text: 'Can you review this one @12joan?' }], type: 'p' },
    ],
  },
  3: {
    createdAt: 1_663_453_740_180,
    id: '3',
    isResolved: true,
    userId: '1',
    value: [{ children: [{ text: 'This is a resolved comment.' }], type: 'p' }],
  },
  4: {
    createdAt: 1_663_453_740_181,
    id: '4',
    parentId: '2',
    userId: '2',
    value: [{ children: [{ text: 'LGTM.' }], type: 'p' }],
  },
  5: {
    createdAt: 1_663_453_740_182,
    id: '4',
    parentId: '2',
    userId: '1',
    value: [{ children: [{ text: 'Thanks!' }], type: 'p' }],
  },
};

export const commentsPlugin = CommentsPlugin.configure({
  options: {
    comments: commentsData,
    myUserId: '1',
    users: {
      1: {
        avatarUrl: 'https://avatars.githubusercontent.com/u/19695832?s=96&v=4',
        id: '1',
        name: 'zbeyens',
      },
      2: {
        avatarUrl: 'https://avatars.githubusercontent.com/u/4272090?v=4',
        id: '2',
        name: '12joan',
      },
    },
  },
  render: { afterEditable: () => <CommentsPopover /> },
});
