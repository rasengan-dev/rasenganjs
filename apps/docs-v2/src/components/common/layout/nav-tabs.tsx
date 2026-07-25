import { NavigationGroup, NavigationType } from '@/data/docs';
import { AppWindow, Box, Server, Zap } from 'lucide-react';
import { Link, useLocation } from 'rasengan';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Tab = {
  id: NavigationType;
  name: string;
  link: string;
  icon: React.ReactNode;
  match: string;
};

const tabs: Tab[] = [
  {
    id: NavigationGroup.DOCUMENTATION,
    name: 'Rasengan',
    link: '/docs/getting-started/introduction',
    icon: <AppWindow size={16} />,
    match: '/docs',
  },
  {
    id: NavigationGroup.FUTON,
    name: 'Futon',
    link: '/docs/futon/getting-started/introduction',
    icon: <Zap size={16} />,
    match: '/docs/futon',
  },
  {
    id: NavigationGroup.SERVER,
    name: 'Server',
    link: '/server/getting-started/introduction',
    icon: <Server size={16} />,
    match: '/server',
  },
  {
    id: NavigationGroup.PACKAGES,
    name: 'Packages',
    link: '/packages',
    icon: <Box size={16} />,
    match: '/packages',
  },
];

// Ordered most-specific-first so nested sections (e.g. /docs/futon) win over
// the generic /docs catch-all (Rasengan).
const matchPriority = [...tabs].sort((a, b) => b.match.length - a.match.length);

function getActiveTabId(pathname: string): NavigationType | null {
  const tab = matchPriority.find((tab) => pathname.includes(tab.match));

  return tab?.id ?? null;
}

type Props = {
  className?: ComponentProps<'nav'>['className'];
};

export default function DocsNavTabs({ className }: Props) {
  const { pathname } = useLocation();
  const activeTabId = getActiveTabId(pathname);

  return (
    <nav
      aria-label="Sections"
      className={twMerge(
        'flex h-10 items-center bg-background text-foreground',
        className
      )}
    >
      <ul className="flex h-full items-center gap-x-6">
        {tabs.map((tab) => {
          const active = tab.id === activeTabId;

          return (
            <li key={tab.id} className="h-full">
              <Link
                to={tab.link}
                className={twMerge(
                  'group relative flex h-full items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground',
                  active && 'text-primary hover:text-primary'
                )}
              >
                {tab.icon}
                <span>{tab.name}</span>
                <span
                  className={twMerge(
                    'absolute bottom-0 left-0 h-px w-full bg-transparent transition-colors group-hover:bg-border',
                    active && 'bg-primary group-hover:bg-primary'
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
