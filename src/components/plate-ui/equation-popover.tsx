'use client';

import { cn } from '@udecode/cn';
import type { TEquationElement } from '@udecode/plate-math';
import { useEquationInput } from '@udecode/plate-math/react';
import { BlockSelectionPlugin } from '@udecode/plate-selection/react';
import {
  createPrimitiveComponent,
  useEditorRef,
  useElement,
  useReadOnly,
  useSelected,
} from '@udecode/plate/react';
import { CornerDownLeftIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import TextareaAutosize, {
  type TextareaAutosizeProps,
} from 'react-textarea-autosize';

import { Button } from './button';
import { PopoverContent } from './popover';

const EquationInput = createPrimitiveComponent(TextareaAutosize)({
  propsHook: useEquationInput,
});

const EquationPopoverContent = ({
  className,
  isInline,
  open,
  setOpen,
  ...props
}: {
  isInline: boolean;
  setOpen: (open: boolean) => void;
  open: boolean;
} & TextareaAutosizeProps) => {
  const editor = useEditorRef();
  const readOnly = useReadOnly();
  const element = useElement<TEquationElement>();
  const selected = useSelected();

  useEffect(() => {
    if (isInline && selected) {
      setOpen(true);
    }
  }, [selected, isInline, setOpen]);

  if (readOnly) return null;

  const onClose = () => {
    setOpen(false);

    if (isInline) {
      editor.tf.select(element, { next: true });
    } else {
      editor
        .getApi(BlockSelectionPlugin)
        .blockSelection.addSelectedRow(element.id as string);
    }
  };

  return (
    <PopoverContent
      className="flex gap-2"
      contentEditable={false}
      onEscapeKeyDown={(e) => {
        e.preventDefault();
      }}
    >
      <EquationInput
        autoFocus
        className={cn('max-h-[50vh] grow resize-none p-2 text-sm', className)}
        state={{ isInline, onClose, open }}
        {...props}
      />

      <Button className="px-3" onClick={onClose} variant="secondary">
        Done <CornerDownLeftIcon className="size-3.5" />
      </Button>
    </PopoverContent>
  );
};

export { EquationPopoverContent };
