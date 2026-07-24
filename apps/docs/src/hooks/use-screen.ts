// White a hook to detect screen size
import { useState, useEffect } from 'react';

export default function useScreen() {
  const [screenSize, setScreenSize] = useState('lg');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('xs');
      } else if (window.innerWidth < 768) {
        setScreenSize('sm');
      } else if (window.innerWidth < 1024) {
        setScreenSize('md');
      } else if (window.innerWidth < 1280) {
        setScreenSize('lg');
      } else {
        setScreenSize('xl');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
}
