import { describe, it, expect, beforeEach, vi } from 'vitest';
import { errorStore } from '../../../routing/error-overlay/error-store.js';

beforeEach(() => {
  errorStore.clearAll();
});

describe('errorStore', () => {
  it('starts empty and not minimized', () => {
    expect(errorStore.getErrors()).toEqual([]);
    expect(errorStore.isMinimized()).toBe(false);
  });

  it('addError() appends an entry with an incrementing id', () => {
    errorStore.addError(new Error('a'));
    errorStore.addError(new Error('b'));

    const [first, second] = errorStore.getErrors();
    expect(first.error.message).toBe('a');
    expect(second.error.message).toBe('b');
    expect(second.id).toBeGreaterThan(first.id);
  });

  it('addError() defaults source to "global"', () => {
    errorStore.addError(new Error('x'));
    expect(errorStore.getErrors()[0].source).toBe('global');
  });

  it('addError() accepts an explicit source and componentStack', () => {
    errorStore.addError(new Error('x'), 'react', 'at <App>');
    const entry = errorStore.getErrors()[0];
    expect(entry.source).toBe('react');
    expect(entry.componentStack).toBe('at <App>');
  });

  it('clearAll() empties the errors and resets minimized', () => {
    errorStore.addError(new Error('x'));
    errorStore.toggleMinimize();

    errorStore.clearAll();

    expect(errorStore.getErrors()).toEqual([]);
    expect(errorStore.isMinimized()).toBe(false);
  });

  it('toggleMinimize() flips back and forth', () => {
    expect(errorStore.isMinimized()).toBe(false);
    errorStore.toggleMinimize();
    expect(errorStore.isMinimized()).toBe(true);
    errorStore.toggleMinimize();
    expect(errorStore.isMinimized()).toBe(false);
  });

  it('subscribe() notifies listeners on addError/clearAll/toggleMinimize', () => {
    const listener = vi.fn();
    errorStore.subscribe(listener);

    errorStore.addError(new Error('x'));
    errorStore.toggleMinimize();
    errorStore.clearAll();

    expect(listener).toHaveBeenCalledTimes(3);
  });

  it('the unsubscribe function stops further notifications', () => {
    const listener = vi.fn();
    const unsubscribe = errorStore.subscribe(listener);

    unsubscribe();
    errorStore.addError(new Error('x'));

    expect(listener).not.toHaveBeenCalled();
  });
});
