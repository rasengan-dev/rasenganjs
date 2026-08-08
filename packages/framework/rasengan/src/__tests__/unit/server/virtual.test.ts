import { describe, it, expect } from 'vitest';
import { createVirtualModule } from '../../../server/virtual/index.js';

describe('createVirtualModule', () => {
  it('builds the public id as virtual:rasengan/<name>', () => {
    expect(createVirtualModule('router').id).toBe('virtual:rasengan/router');
  });

  it('builds the resolved id with a leading null-byte marker', () => {
    expect(createVirtualModule('router').resolvedId).toBe(
      '\0virtual:rasengan/router'
    );
  });

  it('builds the dev-server url using the __x00__ null-byte encoding', () => {
    expect(createVirtualModule('router').url).toBe(
      '/@id/__x00__virtual:rasengan/router'
    );
  });

  it('varies correctly by name', () => {
    expect(createVirtualModule('api-router').id).toBe(
      'virtual:rasengan/api-router'
    );
  });
});
