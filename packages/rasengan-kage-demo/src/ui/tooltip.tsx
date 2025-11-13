import React, { useEffect, useRef, useState } from 'react';
import type { KageDemoStep } from '../core/types.js';

// interface TooltipProps {
//   step: KageDemoStep;
//   onNext: () => void;
//   onPrev: () => void;
//   onEnd: () => void;
// }

// export const Tooltip: React.FC<TooltipProps> = ({
//   step,
//   onNext,
//   onPrev,
//   onEnd,
// }) => {
//   let target: HTMLElement | null = null;

//   if (typeof window !== 'undefined') {
//     target = document.querySelector(step.target);
//   }

//   const tooltipRef = useRef<HTMLDivElement>(null);
//   const [style, setStyle] = useState<React.CSSProperties>({});

//   useEffect(() => {
//     if (!target || !tooltipRef.current) return;

//     const rect = target.getBoundingClientRect();
//     const tooltip = tooltipRef.current;
//     const tooltipRect = tooltip.getBoundingClientRect();

//     const margin = 10;
//     const positions = {
//       top: {
//         top: rect.top - tooltipRect.height - margin,
//         left: rect.left + rect.width / 2 - tooltipRect.width / 2,
//       },
//       bottom: {
//         top: rect.bottom + margin,
//         left: rect.left + rect.width / 2 - tooltipRect.width / 2,
//       },
//       left: {
//         top: rect.top + rect.height / 2 - tooltipRect.height / 2,
//         left: rect.left - tooltipRect.width - margin,
//       },
//       right: {
//         top: rect.top + rect.height / 2 - tooltipRect.height / 2,
//         left: rect.right + margin,
//       },
//     };

//     // Available space around the target
//     const space = {
//       top: rect.top,
//       bottom: window.innerHeight - rect.bottom,
//       left: rect.left,
//       right: window.innerWidth - rect.right,
//     };

//     // Pick the best position based on available space
//     let bestPosition: keyof typeof positions = 'bottom';
//     if (space.bottom > tooltipRect.height + margin) bestPosition = 'bottom';
//     else if (space.top > tooltipRect.height + margin) bestPosition = 'top';
//     else if (space.right > tooltipRect.width + margin) bestPosition = 'right';
//     else if (space.left > tooltipRect.width + margin) bestPosition = 'left';

//     const pos = positions[bestPosition];

//     // Clamp to viewport
//     const top = Math.max(
//       margin,
//       Math.min(pos.top, window.innerHeight - tooltipRect.height - margin)
//     );
//     const left = Math.max(
//       margin,
//       Math.min(pos.left, window.innerWidth - tooltipRect.width - margin)
//     );

//     setStyle({ top, left, position: 'fixed' });
//   }, [step.target, tooltipRef]);

//   if (!target) return null;

//   return (
//     <div ref={tooltipRef} className="kage-demo-tooltip" style={style}>
//       {step.render({ next: onNext, prev: onPrev, end: onEnd })}
//     </div>
//   );
// };

interface TooltipProps {
  step: KageDemoStep;
  onNext: () => void;
  onPrev: () => void;
  onEnd: () => void;
}

export const Tooltip: React.FC<TooltipProps> = ({
  step,
  onNext,
  onPrev,
  onEnd,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [target, setTarget] = useState<HTMLElement | null>(null);

  // Update target when step changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = document.querySelector(step.target) as HTMLElement | null;
    setTarget(el);
  }, [step.target]);

  // Recalculate position dynamically
  useEffect(() => {
    if (!target || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;

    const updatePosition = () => {
      if (!target || !tooltipRef.current) return;

      const rect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const margin = 10;

      const positions = {
        top: {
          top: rect.top - tooltipRect.height - margin,
          left: rect.left + rect.width / 2 - tooltipRect.width / 2,
        },
        bottom: {
          top: rect.bottom + margin,
          left: rect.left + rect.width / 2 - tooltipRect.width / 2,
        },
        left: {
          top: rect.top + rect.height / 2 - tooltipRect.height / 2,
          left: rect.left - tooltipRect.width - margin,
        },
        right: {
          top: rect.top + rect.height / 2 - tooltipRect.height / 2,
          left: rect.right + margin,
        },
      };

      const space = {
        top: rect.top,
        bottom: window.innerHeight - rect.bottom,
        left: rect.left,
        right: window.innerWidth - rect.right,
      };

      let bestPosition: keyof typeof positions = 'bottom';
      if (space.bottom > tooltipRect.height + margin) bestPosition = 'bottom';
      else if (space.top > tooltipRect.height + margin) bestPosition = 'top';
      else if (space.right > tooltipRect.width + margin) bestPosition = 'right';
      else if (space.left > tooltipRect.width + margin) bestPosition = 'left';

      const pos = positions[bestPosition];
      const top = Math.max(
        margin,
        Math.min(pos.top, window.innerHeight - tooltipRect.height - margin)
      );
      const left = Math.max(
        margin,
        Math.min(pos.left, window.innerWidth - tooltipRect.width - margin)
      );

      setStyle({ top, left, position: 'fixed' });
    };

    // Observe tooltip size changes (content updates)
    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });
    resizeObserver.observe(tooltip);

    // Update on window resize or scroll
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    // Initial update (after render)
    requestAnimationFrame(updatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [target, step.target]); // step.target ensures recalculation per step

  if (!target) return null;

  return (
    <div ref={tooltipRef} className="kage-demo-tooltip" style={style}>
      {step.render({ next: onNext, prev: onPrev, end: onEnd })}
    </div>
  );
};
