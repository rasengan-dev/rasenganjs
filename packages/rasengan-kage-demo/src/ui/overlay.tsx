import React, { useEffect } from 'react';

interface OverlayProps {
  rect: DOMRect | null;
}

export const Overlay: React.FC<OverlayProps> = ({ rect }) => {
  useEffect(() => {
    if (!rect) return;

    // Disable scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Restore scroll when overlay unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [rect]);

  if (!rect) return null;

  return (
    <div
      className="kage-demo-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        pointerEvents: 'none',
        WebkitMask: `linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)`,
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        padding: `${rect.top}px ${window.innerWidth - (rect.left + rect.width)}px ${window.innerHeight - (rect.top + rect.height)}px ${rect.left}px`,
        transition: 'padding 0.5s ease-in-out',
      }}
    />
  );
};
