import { NavigationData, NavigationGroup, NavigationItem } from '@/data/docs';
import { BookOpen, Box, ChevronDown, LayoutTemplate, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'rasengan';
import { ComponentProps, Fragment, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function SidebarNavigation() {
  const [activeTab, setActiveTab] = useState(NavigationGroup.DOCUMENTATION);

  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <aside className="w-[280px] border-r-[1px] border-r-border/60 text-foreground">
      <section className="sticky top-8 w-full h-full max-h-[calc(100vh)] overflow-y-auto pt-16 p-6">
        <div className="flex flex-col gap-4 text-sm border-b-[1px] border-b-border pb-8">
          <div className="flex items-center mb-6 gap-2">
            <div className="size-10 rounded-md border-[1px] border-primary/40 bg-primary/10 flex items-center justify-center">
              <Tag size={20} className="text-primary" />
            </div>

            <div className="flex flex-col gap-1">
              <span>Using stable version</span>
              <span className="text-[12px] text-foreground/60">v1.2.4</span>
            </div>
          </div>

          <Link to="/docs/introduction">
            <div
              className={twMerge(
                'flex items-center gap-4 hover:cursor-pointer hover:text-primary transition-all',
                isActive('/docs')
                  ? 'text-primary font-lexend-medium'
                  : 'text-foreground/90'
              )}
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

        {NavigationData[activeTab].map((nav) => {
          return (
            <div key={nav.id} className="mt-8">
              <div className="flex items-center gap-2 text-foreground/60">
                {nav.icon}
                <span className="font-mono text-[12px]">{nav.name}</span>
              </div>

              <div className="flex flex-col w-full text-sm py-4">
                {nav.children &&
                  nav.children.map((item) => {
                    if (item.visible === false) return null;

                    return (
                      <Fragment key={item.id}>
                        <NavItem item={item} isActive={isActive} />
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
};

export const NavItem = ({ item, className, isActive }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveChild = () => {
    if (!item.children) return false;

    return item.children.some((item) => isActive(item.link ?? '#nothing'));
  };

  return item.link ? (
    <Link to={item.link}>
      <div
        className={twMerge(
          'flex items-center justify-between pl-4 py-1 border-l-[1px] border-l-border  cursor-pointer hover:text-primary/80 hover:border-l-primary/60 transition-all duration-300',
          className,
          isActive(item.link)
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
              item.children.map((item) => {
                if (item.visible === false) return null;

                return (
                  <NavItem
                    item={item}
                    className={item.level === 2 ? '' : 'pl-8'}
                    isActive={isActive}
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
              item.children.map((item) => {
                if (item.visible === false) return null;

                return (
                  <NavItem
                    item={item}
                    className={item.level === 2 ? '' : 'pl-8'}
                    isActive={isActive}
                  />
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
