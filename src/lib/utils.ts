/**
 * File: src/lib/utils.ts
 * Purpose: Utility functions for CSS class merging and conditional styling
 * Author: platform.rocks
 * License: MIT
 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
