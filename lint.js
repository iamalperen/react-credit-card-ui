#!/usr/bin/env node

import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// ESM içinde __dirname eşdeğeri
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ESLint komutunu çalıştır
const result = spawnSync('npx', [
  'eslint',
  resolve(__dirname, 'src'),
  '--ext', '.ts,.tsx,.js,.jsx',
  '--max-warnings=0'
], { stdio: 'inherit' });

process.exit(result.status); 