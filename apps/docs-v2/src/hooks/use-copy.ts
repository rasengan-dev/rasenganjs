import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Clipboard helper shared by every "copy command" control on the marketing
 * pages. Returns `copied`, which stays true for `resetAfter` ms after a
 * successful copy so the UI can swap its icon, and a `copy(text)` function.
 * Must be called from a user gesture (click handler) for the Clipboard API.
 */
export function useCopy(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear a pending reset if the component unmounts mid-timeout.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetAfter);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    },
    [resetAfter]
  );

  return { copied, copy };
}
