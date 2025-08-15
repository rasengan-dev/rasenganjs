import {
  NavigationData,
  NavigationGroup,
  NavigationItem,
  NavigationType,
} from '@/data/docs';
import {
  BookOpen,
  Box,
  ChevronDown,
  FlaskConical,
  LayoutTemplate,
  Tag,
  TestTube,
  TestTube2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'rasengan';
import { ComponentProps, Fragment, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: ComponentProps<'aside'>['className'];
  onClose?: () => void;
};

export default function SidebarNavigation({ className, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<NavigationType | null>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('/docs')) {
      setActiveTab(NavigationGroup.DOCUMENTATION);
    } else if (pathname.includes('/packages')) {
      setActiveTab(NavigationGroup.PACKAGES);
    }
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  const sortNavigation = (nav: NavigationItem[]) => {
    // sort by name
    return nav.sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <aside
      className={twMerge(
        'w-[280px] border-r-[1px] border-r-border/60 text-foreground',
        className
      )}
    >
      <section className="lg:sticky lg:top-8 w-full h-(--mobile-main-height) lg:h-full max-h-[calc(100vh)] overflow-y-auto pb-16 lg:pt-16 p-6">
        <div className="flex flex-col gap-4 text-sm border-b-[1px] border-b-border pb-8">
          <div className="flex items-center mb-6 gap-2">
            <div className="size-10 rounded-md border-[1px] border-primary/40 bg-primary/10 flex items-center justify-center">
              <Tag size={20} className="text-primary" />
            </div>

            <div className="flex flex-col gap-1">
              <span>Using stable version</span>
              <span className="text-[12px] text-foreground/60">v1.1.0</span>
            </div>
          </div>

          <Link to="/docs/getting-started/introduction">
            <div
              className={twMerge(
                'flex items-center gap-4 hover:cursor-pointer hover:text-primary transition-all',
                isActive('/docs')
                  ? 'text-primary font-lexend-medium'
                  : 'text-foreground/90'
              )}
              onClick={() => {
                setActiveTab(NavigationGroup.DOCUMENTATION);
                onClose && onClose();
              }}
            >
              <BookOpen size={20} />
              <span>Documentation</span>
            </div>
          </Link>

          <Link to="/packages">
            <div
              className={twMerge(
                'flex items-center gap-4 hover:cursor-pointer hover:text-primary transition-all',
                isActive('/packages')
                  ? 'text-primary font-lexend-medium'
                  : 'text-foreground/90'
              )}
              onClick={() => {
                setActiveTab(NavigationGroup.PACKAGES);
                onClose && onClose();
              }}
            >
              <Box size={20} />
              <span>Packages</span>
            </div>
          </Link>

          <Link to="https://hub.rasengan.dev" target="_blank">
            <div className="flex items-center gap-4 text-foreground/90 hover:cursor-pointer hover:text-primary transition-all">
              <LayoutTemplate size={20} />
              <span>Templates</span>
            </div>
          </Link>
        </div>

        {activeTab &&
          NavigationData[activeTab].map((nav) => {
            return (
              <div key={nav.id} className="mt-8">
                <div className="flex items-center gap-2 text-foreground/60">
                  {nav.icon}
                  <span className="font-mono text-[12px]">{nav.name}</span>
                </div>

                <div className="flex flex-col w-full text-sm py-4">
                  {nav.children &&
                    (activeTab === NavigationGroup.DOCUMENTATION
                      ? nav.children
                      : sortNavigation(nav.children)
                    ).map((item) => {
                      if (item.visible === false) return null;

                      return (
                        <Fragment key={item.id}>
                          <NavItem
                            item={item}
                            isActive={isActive}
                            onClose={onClose}
                          />
                        </Fragment>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </section>
    </aside>
  );
}

type NavItemProps = {
  item: NavigationItem;
  className?: ComponentProps<'div'>['className'];
  isActive: (path: string) => boolean;
  onClose?: () => void;
};

export const NavItem = ({
  item,
  className,
  isActive,
  onClose,
}: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    const active = hasActiveChild();

    if (active) {
      setIsOpen(true);
    }
  }, []);

  const hasActiveChild = () => {
    if (!item.children) return false;

    return item.children.some((item) => isActive(item.link ?? '#nothing'));
  };

  const sortNavigation = (nav: NavigationItem[]) => {
    if (pathname.includes('/docs')) {
      return nav;
    } else if (pathname.includes('/packages')) {
      // sort by name
      return nav.sort((a, b) => a.name.localeCompare(b.name));
    }

    // sort by name
    return nav.sort((a, b) => a.name.localeCompare(b.name));
  };

  return item.link ? (
    <Link to={item.link} onClick={() => onClose && onClose()}>
      <div
        className={twMerge(
          'flex items-center justify-between pl-4 py-1 border-l-[1px] border-l-border  cursor-pointer hover:text-primary/80 hover:border-l-primary/60 transition-all duration-300',
          className,
          isActive(item.link)
            ? 'text-primary border-l-primary hover:text-primary hover:border-l-primary font-lexend-medium'
            : 'text-foreground/90',
          item.isComingSoon && 'text-foreground/40 hover:text-foreground/40'
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {item.isBeta ? (
          <div className="flex items-center gap-2">
            <span>{item.name}</span>
            <FlaskConical size={16} className="text-green-500" />
          </div>
        ) : (
          <span>{item.name}</span>
        )}

        {item.isNew && (
          <span className="text-[10px] text-primary-foreground bg-primary px-2 py-1 rounded-full">
            New
          </span>
        )}

        {item.isComingSoon && (
          <span className="text-[10px] text-primary-foreground bg-orange-500 px-2 py-1 rounded-full">
            Coming Soon
          </span>
        )}

        {item.children && item.children.length > 0 && (
          <ChevronDown
            size={16}
            className={twMerge(
              'transition-all duration-300',
              isOpen ? '' : '-rotate-90'
            )}
          />
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={item.id}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto' },
              collapsed: { height: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {item.children &&
              sortNavigation(item.children).map((item) => {
                if (item.visible === false) return null;

                return (
                  <NavItem
                    key={item.id}
                    item={item}
                    className={item.level === 2 ? '' : 'pl-8'}
                    isActive={isActive}
                    onClose={onClose}
                  />
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  ) : (
    <div>
      <div
        className={twMerge(
          'flex items-center justify-between pl-4 py-1 border-l-[1px] border-l-border text-foreground/90 cursor-pointer hover:text-primary/80 hover:border-l-primary/60 transition-all',
          className,
          hasActiveChild()
            ? 'text-primary border-l-primary hover:text-primary hover:border-l-primary font-lexend-medium'
            : 'text-foreground/90'
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{item.name}</span>

        {item.children && item.children.length > 0 && (
          <ChevronDown
            size={16}
            className={twMerge(
              'transition-all duration-300',
              isOpen ? '' : '-rotate-90'
            )}
          />
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={item.id}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto' },
              collapsed: { height: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {item.children &&
              sortNavigation(item.children).map((item) => {
                if (item.visible === false) return null;

                return (
                  <NavItem
                    key={item.id}
                    item={item}
                    className={item.level === 2 ? '' : 'pl-8'}
                    isActive={isActive}
                    onClose={onClose}
                  />
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
