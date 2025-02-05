'use client';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { isUrl } from '@udecode/plate';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';
import { useEditorRef } from '@udecode/plate/react';
import {
  AudioLinesIcon,
  FileUpIcon,
  FilmIcon,
  ImageIcon,
  LinkIcon,
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useFilePicker } from 'use-file-picker';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { FloatingInput } from './input';
import {
  ToolbarSplitButton,
  ToolbarSplitButtonPrimary,
  ToolbarSplitButtonSecondary,
} from './toolbar';

const MEDIA_CONFIG: Record<
  string,
  {
    accept: string[];
    title: string;
    icon: React.ReactNode;
    tooltip: string;
  }
> = {
  [AudioPlugin.key]: {
    accept: ['audio/*'],
    icon: <AudioLinesIcon className="size-4" />,
    title: 'Insert Audio',
    tooltip: 'Audio',
  },
  [FilePlugin.key]: {
    accept: ['*'],
    icon: <FileUpIcon className="size-4" />,
    title: 'Insert File',
    tooltip: 'File',
  },
  [ImagePlugin.key]: {
    accept: ['image/*'],
    icon: <ImageIcon className="size-4" />,
    title: 'Insert Image',
    tooltip: 'Image',
  },
  [VideoPlugin.key]: {
    accept: ['video/*'],
    icon: <FilmIcon className="size-4" />,
    title: 'Insert Video',
    tooltip: 'Video',
  },
};

export function MediaToolbarButton({
  children,
  nodeType,
  ...props
}: DropdownMenuProps & { nodeType: string }) {
  const currentConfig = MEDIA_CONFIG[nodeType];

  const editor = useEditorRef();
  const openState = useOpenState();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { openFilePicker } = useFilePicker({
    accept: currentConfig.accept,
    multiple: true,
    onFilesSelected: ({ plainFiles: updatedFiles }) => {
      (editor as any).tf.insert.media(updatedFiles);
    },
  });

  return (
    <>
      <ToolbarSplitButton
        onClick={() => {
          openFilePicker();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            openState.onOpenChange(true);
          }
        }}
        pressed={openState.open}
      >
        <ToolbarSplitButtonPrimary tooltip={currentConfig.tooltip}>
          {currentConfig.icon}
        </ToolbarSplitButtonPrimary>

        <DropdownMenu {...openState} modal={false} {...props}>
          <DropdownMenuTrigger asChild>
            <ToolbarSplitButtonSecondary />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            alignOffset={-32}
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => openFilePicker()}>
                {currentConfig.icon}
                Upload from computer
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDialogOpen(true)}>
                <LinkIcon />
                Insert via URL
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarSplitButton>

      <AlertDialog
        onOpenChange={(value) => {
          setDialogOpen(value);
        }}
        open={dialogOpen}
      >
        <AlertDialogContent className="gap-6">
          <MediaUrlDialogContent
            currentConfig={currentConfig}
            nodeType={nodeType}
            setOpen={setDialogOpen}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function MediaUrlDialogContent({
  currentConfig,
  nodeType,
  setOpen,
}: {
  setOpen: (value: boolean) => void;
  currentConfig: (typeof MEDIA_CONFIG)[string];
  nodeType: string;
}) {
  const editor = useEditorRef();
  const [url, setUrl] = useState('');

  const embedMedia = useCallback(() => {
    if (!isUrl(url)) return toast.error('Invalid URL');

    setOpen(false);
    editor.tf.insertNodes({
      children: [{ text: '' }],
      name: nodeType === FilePlugin.key ? url.split('/').pop() : undefined,
      type: nodeType,
      url,
    });
  }, [url, editor, nodeType, setOpen]);

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{currentConfig.title}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription className="group relative w-full">
        <FloatingInput
          autoFocus
          className="w-full"
          id="url"
          label="URL"
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') embedMedia();
          }}
          placeholder=""
          type="url"
          value={url}
        />
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            embedMedia();
          }}
        >
          Accept
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
