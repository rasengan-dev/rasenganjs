import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TOCItem } from '../types/index.js';

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create an Intersection Observer to track which section is in view
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4, // Trigger when 40% of the section is visible
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;

          if (rect.top >= 0) {
            // Scrolling Down: Set the first intersecting element as active
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
    }, observerOptions);

    // Observe all sections with IDs matching TOC anchors
    items.forEach((item) => {
      // Observe items of level 2
      const element = document.getElementById(item.anchor.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }

      // Observe items of level 3
      item.children.forEach((item) => {
        const element = document.getElementById(item.anchor.id);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
        }
      });
    });

    // Cleanup observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items]);

  const renderTOCItems = useCallback(
    (items: TOCItem[]) => {
      return items.map((item, index) => (
        <React.Fragment key={index}>
          <Item item={item} activeId={activeId} onActive={setActiveId} />
          {item.children && item.children.length > 0 && (
            <div className="toc-item--children">
              {renderTOCItems(item.children as TOCItem[])}
            </div>
          )}
        </React.Fragment>
      ));
    },
    [items, activeId]
  );

  return (
    <div className="table-of-contents">
      <h2 className="title">ON THIS PAGE</h2>
      <div className="items-container">{renderTOCItems(items)}</div>

      <div
        className="w-full h-[500px] mt-10 bg-red-200"
        style={{ height: 500 }}
      ></div>
    </div>
  );
};

type ItemProps = {
  item: TOCItem;
  activeId: string;
  onActive: (id: string) => void;
};

const Item = ({ item, activeId, onActive }: ItemProps) => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();

    onActive(id);

    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });

    history.pushState(null, '', `#${id}`); // Update the URL
  };

  return (
    <div
      key={item.anchor.id}
      className={`
          toc-item
          ${item.level === 2 ? 'level2' : 'level3'} 
          ${activeId === item.anchor.id ? 'active' : ''}
        `}
    >
      <a
        href={`#${item.anchor.id}`}
        onClick={(e) => handleClick(e, item.anchor.id)}
      >
        <div className="toc-item--title">{item.anchor.text}</div>
      </a>
    </div>
  );
};

export default TableOfContents;
