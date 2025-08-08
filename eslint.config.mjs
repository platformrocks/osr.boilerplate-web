import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      '*.config.js',
      '*.config.ts',
      'pnpm-lock.yaml',
    ],
  },
  ...compat.config({
    extends: ['eslint:recommended', 'next', 'prettier', 'next/core-web-vitals', 'next/typescript'],
  }),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Add custom rules here if needed
    },
  },
];

export default eslintConfig;
