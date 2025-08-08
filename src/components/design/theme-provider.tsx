'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

/**
 * file: src/components/design/ThemeProvider.tsx
 * purpose: Provides a context for the current theme and allows switching between themes.
 * author: platform.rocks
 * license: MIT
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
