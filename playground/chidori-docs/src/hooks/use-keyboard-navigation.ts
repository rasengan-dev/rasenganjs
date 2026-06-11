import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseKeyboardNavigationReturn {
  selectedIndex: number;
  moveDown: () => void;
  moveUp: () => void;
  activateSelection: () => boolean;
  hoverIndex: (index: number) => void;
  selectionOrigin: 'keyboard' | 'pointer' | 'init';
}

export function useKeyboardNavigation(
  hits: Array<Record<string, unknown>>,
  query: string,
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
    const url = typeof hit?.url === 'string' ? hit.url : undefined;
    if (url) {
      if (openResultsInNewTab) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.assign(url);
      }
      return true;
    }
    return false;
  }, [selectedIndex, hits, openResultsInNewTab]);

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
