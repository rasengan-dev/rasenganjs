import { useEffect } from 'react';
import { Outlet, LayoutComponent, Link, useLocation } from 'rasengan';
import { useTheme } from '@rasenganjs/theme';
import { twMerge } from 'tailwind-merge';
import { useNavigationStore } from '@/store/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationData } from '@/data/docs';
import { X } from 'lucide-react';
import ThemeButton from '@/components/atoms/buttons/theme-button';

const AppLayout: LayoutComponent = () => {
  const { isDark } = useTheme();
  const { isOpen, toggle } = useNavigationStore();

  const location = useLocation();
  const pathname = location.pathname;

  // Scroll to the top on route change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <section
      className={twMerge(
        'w-full h-screen overflow-y-auto bg-background font-lexend-light text-foreground',
        isDark ? 'dark' : ''
      )}
    >
      <Outlet />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full h-full bg-background z-50 flex"
          >
            <div className="w-full bg-background">
              <nav className="p-6 mt-2">
                <ul className="flex flex-col gap-4">
                  {NavigationData.navbar.map((nav) => (
                    <Link key={nav.id} to={nav.link ?? '#'} onClick={toggle}>
                      <li>{nav.name}</li>
                    </Link>
                  ))}
                </ul>
              </nav>
            </div>

            <div
              className="fixed top-8 right-8 size-8 rounded-full flex items-center justify-center border-[1px] border-foreground/30"
              onClick={toggle}
            >
              <X size={20} className="text-foreground" />
            </div>

            <div className="fixed bottom-8 right-8 size-8 flex items-center justify-center">
              <ThemeButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

AppLayout.path = '/';

export default AppLayout;
