import Navbar from '@/components/common/layout/navbar';
import DocsNavTabs from '@/components/common/layout/nav-tabs';
import { Outlet, LayoutComponent } from 'rasengan';
import SidebarNavigation from '@/components/common/layout/sidebar';
import Footer from '@/components/common/layout/footer';
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import { ScrollRestoration } from '@/components/common/molecules/scroll-restoration';
import { cn } from '@/lib/utils';

const DocsLayout: LayoutComponent = () => {
  const targetRef = useRef<HTMLElement>(null);

  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <section
      className={cn(
        'w-screen h-screen overflow-x-hidden overflow-y-auto text-foreground'
      )}
      ref={targetRef}
    >
      <ScrollRestoration target={targetRef} />

      <div className="fixed top-0 left-0 w-full border-b border-b-border/40 dark:border-b-border flex flex-col bg-background z-30">
        <div className="max-w-[1430px] mx-auto w-full px-4 2xl:px-0">
          <Navbar className="border-b-transparent px-0" />
          <DocsNavTabs />
        </div>
      </div>

      <div
        className={cn(
          'w-full max-w-[1430px] mx-auto relative h-auto flex flex-col pt-24'
        )}
      >
        <div className="w-full relative flex">
          <SidebarNavigation className="hidden lg:flex h-auto" />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: navigationOpen ? 0 : '-100%' }}
            transition={{ duration: 0.2 }}
            className={twMerge(
              'z-40 fixed top-[110px] bg-background block lg:hidden'
            )}
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

          <main className="w-full min-w-0">
            <div className="w-full h-auto">
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </section>
  );
};

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
