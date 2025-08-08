/**
 * File: release.config.ts
 * Purpose: Release-it configuration for automated versioning and releases
 * Author: platform.rocks
 * License: MIT
 */
const config = {
  git: {
    commitMessage: 'chore: release v${version}',
    tagName: 'v${version}',
    requireCleanWorkingDir: true,
    requireUpstream: true,
    changelog: 'npx auto-changelog --stdout --commit-limit false --unreleased --template compact',
  },
  npm: false,
  github: {
    release: true,
    releaseName: 'Release v${version}',
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'conventionalcommits',
      infile: 'CHANGELOG.md',
    },
  },
};

export default config;
