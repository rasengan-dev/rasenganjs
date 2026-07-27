import {
  NavigationData,
  NavigationGroup,
  NavigationItem,
  NavigationType,
} from '@/data/docs';
import { SectionVersions } from '@/data/docs/versions';
import { cn } from '@/lib/utils';
import { useBannerStore } from '@/store/banner';
import {
  ChevronDown,
  FlaskConical,
  LayoutTemplate,
  Palette,
  Tag,
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
  const { show: showBanner } = useBannerStore();

  useEffect(() => {
    // Nested sections (e.g. /docs/futon, /docs/server) must be checked before
    // the generic /docs catch-all (Rasengan), since they contain it as a substring.
    if (pathname.includes('/docs/futon')) {
      setActiveTab(NavigationGroup.FUTON);
    } else if (pathname.includes('/docs/server')) {
      setActiveTab(NavigationGroup.SERVER);
    } else if (pathname.includes('/docs')) {
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
        'relative w-[280px] shrink-0 text-foreground',
        className
      )}
    >
      <div
        className={twMerge(
          'flex flex-col w-full h-(--mobile-main-height) lg:h-[calc(100vh-[100px)] lg:sticky lg:top-[100px] lg:border-r lg:border-border/40 dark:lg:border-border'
        )}
      >
        <nav className="flex-1 min-h-0 overflow-y-auto hide-scrollbar p-6 lg:pl-8 2xl:pl-0">
          {activeTab && SectionVersions[activeTab] && (
            <div className="flex items-center gap-1.5 text-[12px] text-foreground/60 font-mono mb-6">
              <Tag size={14} className="text-primary" />
              <span>v{SectionVersions[activeTab]}</span>
            </div>
          )}

          {activeTab &&
            NavigationData[activeTab].map((nav) => {
              return (
                <div key={nav.id} className="first:mt-0 mt-8">
                  <div className="flex items-center gap-2 text-foreground/60">
                    {nav.icon}
                    <span className="font-mono text-[12px]">{nav.name}</span>
                  </div>

                  <div className="flex flex-col w-full text-sm py-4">
                    {nav.children &&
                      (activeTab === NavigationGroup.PACKAGES
                        ? sortNavigation(nav.children)
                        : nav.children
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
        </nav>

        {/* <div className="shrink-0 border-t-[1px] border-t-border flex items-center justify-between gap-4 px-6 py-4 text-[12px] text-foreground/60">
          <div className="flex items-center gap-2">
            <Tag size={14} className="text-primary" />
            <span>v1.2.2</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="https://hub.rasengan.dev"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <LayoutTemplate size={14} />
              <span>Templates</span>
            </Link>

            <Link
              to="https://ui.rasengan.dev"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Palette size={14} />
              <span>UI Kit</span>
            </Link>
          </div>
        </div> */}
      </div>
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
    if (pathname.includes('/packages')) {
      // sort by name
      return nav.sort((a, b) => a.name.localeCompare(b.name));
    }

    return nav;
  };

  return item.link ? (
    <Link
      to={item.link}
      onClick={() => onClose && onClose()}
      target={item.external ? '_blank' : '_self'}
    >
      <div
        className={cn(
          'flex items-center justify-between pl-4 py-1 border-l-[1px] border-l-border  cursor-pointer hover:text-primary/80 hover:border-l-primary/60 transition-all duration-300',
          className,
          isActive(item.link)
            ? 'text-primary border-l-primary hover:text-primary hover:border-l-primary font-semibold'
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
        className={cn(
          'flex items-center justify-between pl-4 py-1 border-l-[1px] border-l-border text-foreground/90 cursor-pointer hover:text-primary/80 hover:border-l-primary/60 transition-all',
          className,
          hasActiveChild()
            ? 'text-primary border-l-primary hover:text-primary hover:border-l-primary font-medium'
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
