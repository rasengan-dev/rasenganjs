import React from 'react';
import { Outlet, LayoutComponent } from 'rasengan';
import { useTheme } from '@rasenganjs/theme';
import { twMerge } from 'tailwind-merge';

const AppLayout: LayoutComponent = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={twMerge(
        'w-full h-screen overflow-y-auto bg-background font-lexend-light text-foreground',
        isDark ? 'dark' : ''
      )}
    >
      <Outlet />
    </section>
  );
};

AppLayout.path = '/';

export default AppLayout;
