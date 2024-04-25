'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Icons } from '@x/plate-editor/components/icons';
import { Button } from '@x/plate-editor/components/button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Icons.sun className="transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
