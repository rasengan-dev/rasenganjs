import { useState, useEffect, useRef } from 'react';
import type { TOCItem } from '../types';

/**
 * Custom hook that tracks which TOC item is currently active based on scroll position
 * @param items - Array of TOC items to observe
 * @param options - IntersectionObserver options
 * @returns The ID of the currently active TOC item
 */
export function useActiveTocItem(
  items: TOCItem[],
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4, // Trigger when 40% of the section is visible
  }
): [string | null, (id: string | null) => void] {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          if (rect.top >= 0) {
            setActiveId(entry.target.id);
          }
        }
      });

      // Sort entries by bottom position when scrolling down
      const sortedEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);

      if (sortedEntries.length > 0) {
        setActiveId(sortedEntries[0].target.id);
      }
    }, options);

    // Observe all sections with IDs matching TOC anchors
    const observeElements = () => {
      items.forEach((item) => {
        // Observe items of level 2
        const element = document.getElementById(item.anchor.id);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
        }

        // Observe items of level 3
        item.children?.forEach((child) => {
          const childElement = document.getElementById(child.anchor.id);
          if (childElement && observerRef.current) {
            observerRef.current.observe(childElement);
          }
        });
      });
    };

    observeElements();

    // Cleanup observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items, options]);

  return [activeId, setActiveId];
}
