import type { BaseHit, Hit } from 'instantsearch.js';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseKeyboardNavigationReturn {
  selectedIndex: number;
  moveDown: () => void;
  moveUp: () => void;
  activateSelection: () => boolean;
  hoverIndex: (index: number) => void;
  selectionOrigin: 'keyboard' | 'pointer' | 'init';
}

/** Mirrors search.tsx's own getByPath — duplicated locally (a few lines)
 * rather than imported, to avoid a circular dependency between this hook
 * and the component that uses it. */
function getByPath(obj: unknown, path?: string): unknown {
  if (!obj || !path) return undefined;
  let current: unknown = obj;
  for (const part of path.split('.')) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export function useKeyboardNavigation(
  hits: Hit<BaseHit>[],
  query: string,
  urlPath = 'url',
  openResultsInNewTab = true
): UseKeyboardNavigationReturn {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectionOrigin, setSelectionOrigin] = useState<
    'keyboard' | 'pointer' | 'init'
  >('init');

  const totalItems = useMemo(() => hits.length, [hits.length]);

  const moveDown = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % totalItems);
    setSelectionOrigin('keyboard');
  }, [totalItems]);

  const moveUp = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setSelectionOrigin('keyboard');
  }, [totalItems]);

  const hoverIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalItems) return;
      setSelectedIndex(index);
      setSelectionOrigin('pointer');
    },
    [totalItems]
  );

  const activateSelection = useCallback((): boolean => {
    const hit = hits[selectedIndex];
    const url = getByPath(hit, urlPath);
    if (typeof url === 'string' && url) {
      if (openResultsInNewTab) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.assign(url);
      }
      return true;
    }
    return false;
  }, [selectedIndex, hits, urlPath, openResultsInNewTab]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: expected
  useEffect(() => {
    setSelectedIndex(0);
    setSelectionOrigin('init');
  }, [query]);

  return {
    selectedIndex,
    moveDown,
    moveUp,
    activateSelection,
    hoverIndex,
    selectionOrigin,
  };
}
