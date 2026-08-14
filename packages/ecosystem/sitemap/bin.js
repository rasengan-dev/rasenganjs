#!/usr/bin/env node

import process from 'process';

import('./dist/cli.js').catch((err) => {
  console.error('Failed to start rasengan-sitemap:', err);
  process.exit(1);
});
