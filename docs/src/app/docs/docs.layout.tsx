import Navbar from '@/components/layout/navbar';
import { Outlet, LayoutComponent, useLocation } from 'rasengan';
import SidebarNavigation from './components/layout/sidebar';
import Footer from '@/components/layout/footer';
import { useEffect, useState } from 'react';
import { AlignJustify } from 'lucide-react';
import ThemeButton from '@/components/atoms/buttons/theme-button';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from '@rasenganjs/theme';
import { twMerge } from 'tailwind-merge';

const DocsLayout: LayoutComponent = () => {
  const { hash } = useLocation();
  const { isDark } = useTheme();

  const [navigationOpen, setNavigationOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (hash) {
      // smooth scroll to the anchor
      const element = document.getElementById(hash.slice(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      className={twMerge(
        'docs w-full h-screen overflow-y-auto bg-background font-lexend-light text-foreground',
        isDark ? 'dark' : ''
      )}
    >
      <Navbar />

      <div className="fixed z-30 top-[60px] w-full h-[50px] flex lg:hidden items-center justify-between px-4 lg:px-6 bg-background text-foreground border-b-[1px] border-b-border">
        <div
          className="flex items-center justify-center mr-2"
          onClick={() => setNavigationOpen((prev) => !prev)}
        >
          <AlignJustify size={20} className="text-foreground/90" />
        </div>

        <div className="flex md:hidden">
          <ThemeButton size="small" />
        </div>
      </div>

      <section className="relative h-auto flex pt-16 lg:pt-4">
        <SidebarNavigation className="hidden lg:block h-auto" />

        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: navigationOpen ? 0 : '-100%' }}
          transition={{ duration: 0.2 }}
          className="z-40 fixed top-[110px] bg-background block lg:hidden"
        >
          <SidebarNavigation
            className="h-auto"
            onClose={() => setNavigationOpen(false)}
          />
        </motion.div>

        <AnimatePresence>
          {navigationOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: navigationOpen ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setNavigationOpen(false)}
              className="z-20 fixed top-0 left-0 w-full h-full bg-background/90 block lg:hidden"
            />
          )}
        </AnimatePresence>

        <main className="w-full lg:w-(--main-width) h-fulld mt-10 ">
          <div className="px-0 w-full">
            <Outlet />
          </div>
          <Footer />
        </main>
      </section>
    </section>
  );
};

DocsLayout.path = '/';
DocsLayout.metadata = {
  openGraph: {
    title: 'Rasengan.js - Documentation',
    description:
      'Learn everything you need to know about Rasengan.js, and build amazing web applications.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/docs.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome to Rasengan.js',
    description:
      'Learn everything you need to know about Rasengan.js, and build amazing web applications.',
    image: 'https://rasengan.dev/assets/images/metadata/docs.png',
  },
};

export default DocsLayout;
