import { useEffect, useRef } from 'react';
import { useLocation } from 'rasengan';

// Store scroll positions globally (per pathname)
const scrollPositions: Record<string, number> = {};

type Props = {
  alwaysToTop?: boolean;
  target?: React.RefObject<HTMLElement | null>;
};

export function ScrollRestoration({ alwaysToTop = false, target }: Props) {
  const location = useLocation();
  const pathnameRef = useRef(location.pathname);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prevPathname = pathnameRef.current;
    const el = target?.current; // easier to reference

    if (alwaysToTop) {
      if (el) {
        el.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
      pathnameRef.current = location.pathname;
      return;
    }

    // Save scroll position of the previous page
    if (prevPathname) {
      scrollPositions[prevPathname] = el ? el.scrollTop : window.scrollY;
    }

    // Restore scroll position of the new page (default to 0 if not stored)
    const storedY = scrollPositions[location.pathname] ?? 0;
    if (el) {
      el.scrollTo(0, storedY);
    } else {
      window.scrollTo(0, storedY);
    }

    // Update ref
    pathnameRef.current = location.pathname;
  }, [location.pathname, target?.current]); // depend on target.current

  return null;
}

// import { useEffect } from 'react';
// import { useLocation } from 'rasengan';
// export function ScrollRestoration() {
//   const location = useLocation();
//   useEffect(() => {
//     if (typeof window === 'undefined') return;
//     const handleBeforeUnload = () => {
//       window.scrollTo(0, 0);
//     };
//     console.log(window);
//     handleBeforeUnload();
//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
//   }, [location.pathname]);
//   return null;
// }
