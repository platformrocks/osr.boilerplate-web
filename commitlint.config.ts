/**
 * File: commitlint.config.ts
 * Purpose: Commitlint configuration for conventional commits validation
 * Author: platform.rocks
 * License: MIT
 */

/**
 * Commitlint configuration for conventional commits
 * Ensures commit messages follow conventional commit format
 */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};

export default config;
