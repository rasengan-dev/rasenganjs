import React, { useCallback } from 'react';
import { TOCItem } from '../types/index.js';
import { useActiveTocItem } from '../hooks/use-toc-observer.js';

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useActiveTocItem(items);

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
    <aside className="rasengan-toc">
      <div className="table-of-contents">
        <h2 className="title">ON THIS PAGE</h2>
        <div className="items-container">{renderTOCItems(items)}</div>
      </div>
    </aside>
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
