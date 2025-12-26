import { useEffect } from 'react';
import { Outlet, LayoutComponent, Link } from 'rasengan';
import { useTheme } from '@rasenganjs/theme';
import { twMerge } from 'tailwind-merge';
import { useNavigationStore } from '@/store/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationData } from '@/data/docs';
import { X } from 'lucide-react';
import ThemeButton from '@/components/common/atoms/buttons/theme-button';
import { ScrollRestoration } from '@/components/common/molecules/scroll-restoration';
import Banner from '@/components/common/molecules/banner';
import { useBannerStore } from '@/store/banner';

const RootLayout: LayoutComponent = () => {
  const { isDark } = useTheme();
  const { isOpen, toggle } = useNavigationStore();

  const { show, setShow } = useBannerStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bannerDisabled = localStorage.getItem('bannerDisabled');
      if (!bannerDisabled) {
        setShow(true);
      }
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('bannerDisabled', 'true');
    setShow(false);
  };

  return (
    <section
      className={twMerge(
        'w-screen min-h-screen overflow-y-auto overflow-x-hidden bg-background font-lexend-light text-foreground',
        isDark ? 'dark' : ''
      )}
    >
      <ScrollRestoration />

      <Banner onClose={handleClose} show={show}>
        <Link
          to="https://ui.rasengan.dev"
          target="_blank"
          className="hover:underline"
        >
          <div className="text-white/80">
            We are introducing{' '}
            <strong className="text-white">Rasengan UI Kit</strong> - Get{' '}
            <span className="text-white">40% discount</span> for the first{' '}
            <span className="text-white">100 shinobis 🚀</span>
          </div>
        </Link>
      </Banner>
      <div className="relative w-screen lh-screen">
        <Outlet />
      </div>

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

export default RootLayout;
