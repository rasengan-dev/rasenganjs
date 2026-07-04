import { describe, it, expect } from 'vitest';
import { parseEnv, getEnvFileNames, detectRuntime } from '../../env.js';

describe('parseEnv', () => {
  it('parses simple KEY=VALUE pairs', () => {
    const result = parseEnv('PORT=3000\nHOST=localhost');
    expect(result).toEqual({ PORT: '3000', HOST: 'localhost' });
  });

  it('ignores comment lines starting with #', () => {
    const result = parseEnv('# This is a comment\nPORT=3000\n# another');
    expect(result).toEqual({ PORT: '3000' });
  });

  it('ignores blank lines', () => {
    const result = parseEnv('\n\nPORT=3000\n\nHOST=localhost\n');
    expect(result).toEqual({ PORT: '3000', HOST: 'localhost' });
  });

  it('strips surrounding double quotes from values', () => {
    const result = parseEnv('NAME="John Doe"\nEMPTY=""');
    expect(result).toEqual({ NAME: 'John Doe', EMPTY: '' });
  });

  it('strips surrounding single quotes from values', () => {
    const result = parseEnv("NAME='John Doe'");
    expect(result).toEqual({ NAME: 'John Doe' });
  });

  it('strips the export keyword prefix', () => {
    const result = parseEnv('export PORT=3000\nexport HOST=localhost');
    expect(result).toEqual({ PORT: '3000', HOST: 'localhost' });
  });

  it('handles mixed export and non-export lines', () => {
    const result = parseEnv('export PORT=3000\nHOST=localhost');
    expect(result).toEqual({ PORT: '3000', HOST: 'localhost' });
  });

  it('trims whitespace around key and value', () => {
    const result = parseEnv('  PORT  =  3000  \nHOST=localhost');
    expect(result).toEqual({ PORT: '3000', HOST: 'localhost' });
  });

  it('skips lines without an equals sign', () => {
    const result = parseEnv('PORT=3000\nINVALIDLINE\nHOST=localhost');
    expect(result).toEqual({ PORT: '3000', HOST: 'localhost' });
  });

  it('skips lines with empty keys', () => {
    const result = parseEnv('=value\nPORT=3000');
    expect(result).toEqual({ PORT: '3000' });
  });

  it('later keys override earlier ones', () => {
    const result = parseEnv('PORT=3000\nPORT=4000');
    expect(result).toEqual({ PORT: '4000' });
  });

  it('handles values with embedded equals signs', () => {
    const result = parseEnv('DATABASE_URL=postgres://user:pass@host:5432/db');
    expect(result).toEqual({
      DATABASE_URL: 'postgres://user:pass@host:5432/db',
    });
  });

  it('returns an empty object for empty input', () => {
    expect(parseEnv('')).toEqual({});
  });

  it('returns an empty object for only comments and blanks', () => {
    expect(parseEnv('# comment\n\n  \n# another')).toEqual({});
  });

  it('handles Windows-style line endings (\\r\\n)', () => {
    const result = parseEnv('PORT=3000\r\nHOST=localhost\r\n');
    expect(result).toEqual({ PORT: '3000', HOST: 'localhost' });
  });
});

describe('getEnvFileNames', () => {
  it('returns base files for development mode', () => {
    const names = getEnvFileNames('development');
    expect(names).toEqual([
      '.env',
      '.env.local',
      '.env.development',
      '.env.development.local',
    ]);
  });

  it('returns base files for production mode', () => {
    const names = getEnvFileNames('production');
    expect(names).toEqual([
      '.env',
      '.env.local',
      '.env.production',
      '.env.production.local',
    ]);
  });
});

describe('detectRuntime', () => {
  it('returns "node" when running in Node.js', () => {
    expect(detectRuntime()).toBe('node');
  });

  it('is a function', () => {
    expect(typeof detectRuntime).toBe('function');
  });
});
