import { Link, useLocation } from 'rasengan';
import ThemeButton from '../atoms/buttons/theme-button';
import {
  ArrowUpRight,
  ChevronDown,
  Coffee,
  Menu,
  PanelLeft,
  X,
} from 'lucide-react';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import AppLogo from '../atoms/logo';
import { Button } from '@/components/ui/button';
import { NavigationData } from '@/data/docs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTheme } from '@rasenganjs/theme';
import Search from '@/components/ui/search';
import { useMobileMenuStore } from '@/store/mobile-menu';
import { useNavigationStore } from '@/store/navigation';
import { AnimatePresence, motion } from 'motion/react';

const env = import.meta.env;

const productLinks = [
  { name: 'Rasengan UI', href: 'https://ui.rasengan.dev' },
  { name: 'Rasengan Hub', href: 'https://hub.rasengan.dev' },
  { name: 'Chidori', href: 'https://chidori.rasengan.dev' },
  { name: 'Nindo', href: 'https://nindo.rasengan.dev' },
  { name: 'Chunin', href: 'https://chunin.rasengan.dev' },
];

type Props = {
  className?: ComponentProps<'header'>['className'];
};

export default function Navbar({ className }: Props) {
  const { isDark } = useTheme();
  const { pathname } = useLocation();

  const algoliaAppId = env.RASENGAN_ALGOLIA_APP_ID;
  const algoliaApiKey = env.RASENGAN_ALGOLIA_API_KEY;
  const algoliaIndexName = env.RASENGAN_ALGOLIA_INDEX_NAME;
  // The Algolia search-only API key is meant to be public (see
  // .env.example), nothing here is a real secret.
  const isSearchConfigured = Boolean(
    algoliaAppId && algoliaApiKey && algoliaIndexName
  );

  // Two independent mobile controllers: the main site menu (this
  // component, every page) and the docs sidebar (only relevant on
  // /docs and /packages, driven by the store sidebar.tsx already reads).
  const {
    isOpen: isMenuOpen,
    toggle: toggleMenu,
    close: closeMenu,
  } = useMobileMenuStore();
  const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useNavigationStore();
  const hasSidebar =
    pathname.startsWith('/docs') || pathname.startsWith('/packages');

  return (
    <header
      id="navbar"
      className={twMerge(
        'z-30 bg-background/70 backdrop-blur-md w-full h-[60px] flex items-center justify-between px-4',
        className
      )}
    >
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-1">
          {hasSidebar && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              onClick={toggleSidebar}
            >
              <PanelLeft size={20} />
            </Button>
          )}

          <AppLogo size="sm" />
        </div>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1 text-foreground text-sm">
            {NavigationData.navbar.map((nav) => (
              <Link
                key={nav.id}
                to={nav.link ?? '#'}
                className="hover:bg-muted dark:hover:bg-muted transition-all px-2 flex items-center rounded-md h-8"
              >
                <li className="font-semibold">{nav.name}</li>
              </Link>
            ))}
            <Popover>
              <PopoverTrigger>
                <li className="hover:bg-muted dark:hover:bg-muted transition-all px-2 flex items-center rounded-md h-8 font-semibold flex items-center gap-2 cursor-pointer">
                  <span>Products</span>
                  <ChevronDown size={14} />
                </li>
              </PopoverTrigger>
              <PopoverContent className={isDark ? 'dark bg-input/30' : ''}>
                <nav className="text-sm">
                  <ul className="flex flex-col gap-2">
                    {productLinks.map((product) => (
                      <Link
                        key={product.name}
                        to={product.href}
                        className="hover:text-primary"
                        target="_blank"
                      >
                        <li className="flex items-center gap-2">
                          <span>{product.name}</span>
                          <ArrowUpRight size={16} />
                        </li>
                      </Link>
                    ))}
                  </ul>
                </nav>
              </PopoverContent>
            </Popover>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {isSearchConfigured && (
          <div className="px-2 dark:[&_button]:bg-background">
            <Search
              applicationId={algoliaAppId}
              apiKey={algoliaApiKey}
              indexName={algoliaIndexName}
              attributes={{
                // Real schema of this Algolia Crawler-populated index
                // (verified against a live query): there is no flat
                // title/description/imageUrl, only a nested hierarchy of
                // heading levels, e.g.:
                //   hierarchy: { lvl0: "Documentation", lvl1: "Environment
                //   Variables", lvl2: "Load Environment Variables" }
                // lvl1 is the page title, lvl2 the specific section when
                // the hit is a section-level record (null otherwise, in
                // which case HitsList already skips the secondary line).
                primaryText: 'hierarchy.lvl1',
                secondaryText: 'hierarchy.lvl2',
                url: 'url',
              }}
            />
          </div>
        )}

        {/* vertical separator */}
        {isSearchConfigured && (
          <div className="h-4 w-[1px] bg-border dark:bg-input"></div>
        )}

        <Link to="https://github.com/rasengan-dev/rasenganjs" target="_blank">
          <div className="flex items-center gap-2 text-foreground px-4">
            <svg viewBox="0 0 1024 1024" fill="currentColor" className="size-4">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="currentColor"
              />
            </svg>

            {/* <span className="text-sm font-medium text-muted-foreground">10</span> */}
          </div>
        </Link>

        {/* vertical separator */}
        <div className="h-4 w-[1px] bg-border dark:bg-input"></div>

        <ThemeButton />

        {/* vertical separator */}
        <div className="h-4 w-[1px] bg-border dark:bg-input hidden sm:flex"></div>

        <Link
          to="https://buymeacoffee.com/dilane3"
          target="_blank"
          className="h-8"
        >
          <Button className="h-8">
            <Coffee />
            <span>Support us</span>
          </Button>
        </Link>

        {/* vertical separator */}
        <div className="h-4 w-[1px] bg-border dark:bg-input lg:hidden"></div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            className="z-20 fixed top-0 left-0 w-full h-full bg-background/90 lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2 }}
            className="z-40 fixed top-0 right-0 h-full w-[280px] bg-background border-l border-border/40 dark:border-border lg:hidden"
          >
            <nav className="flex flex-col gap-1 p-6 pt-20 text-sm">
              {NavigationData.navbar.map((nav) => (
                <Link key={nav.id} to={nav.link ?? '#'} onClick={closeMenu}>
                  <div className="hover:bg-muted dark:hover:bg-muted transition-all px-3 py-2 rounded-md font-semibold">
                    {nav.name}
                  </div>
                </Link>
              ))}

              <div className="mt-4 px-3 text-[12px] font-mono text-foreground/60">
                Products
              </div>
              {productLinks.map((product) => (
                <Link
                  key={product.name}
                  to={product.href}
                  target="_blank"
                  onClick={closeMenu}
                >
                  <div className="hover:bg-muted dark:hover:bg-muted transition-all px-3 py-2 rounded-md flex items-center gap-2">
                    <span>{product.name}</span>
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
