'use client';

import { withRef } from '@udecode/cn';
import {
  useLinkToolbarButton,
  useLinkToolbarButtonState,
} from '@udecode/plate-link/react';
import { Link } from 'lucide-react';
import React from 'react';

import { ToolbarButton } from './toolbar';

export const LinkToolbarButton = withRef<typeof ToolbarButton>((rest, ref) => {
  const state = useLinkToolbarButtonState();
  const { props } = useLinkToolbarButton(state);

  return (
    <ToolbarButton
      data-plate-focus
      ref={ref}
      tooltip="Link"
      {...props}
      {...rest}
    >
      <Link />
    </ToolbarButton>
  );
});
