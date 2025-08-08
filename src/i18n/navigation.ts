/**
 * File: src/i18n/navigation.ts
 * Purpose: Internationalized navigation utilities and components
 * Author: platform.rocks
 * License: MIT
 */
import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
