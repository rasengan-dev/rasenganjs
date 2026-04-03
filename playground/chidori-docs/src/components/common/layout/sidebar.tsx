import { NavLink } from 'rasengan';
import { cn } from '@/lib/utils';
import { useNavigationStore } from '@/store/navigation';

export type NavigationLink = {
  label: string;
  to: string;
  level: number;
  data?: Record<string, any>;
};

export type NavigationSection = {
  title: string;
  items: NavigationLink[];
};

export type Navigation = NavigationSection[];

const navigations: Navigation = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', to: '/docs/introduction', level: 1 },
      { label: 'Overview', to: '/docs/overview', level: 1 },
      { label: 'Quick Start', to: '/docs/quick-start', level: 1 },
    ],
  },
  {
    title: 'Resources',
    items: [{ label: 'Changelog', to: '/docs/resources/changelog', level: 1 }],
  },
];

export default function Sidebar() {
  const { toggle } = useNavigationStore();

  return (
    <aside className="w-[350px] h-full pl-16 pr-4 py-16 pb-[100px] bg-background text-sm overflow-auto hide-scrollbar border-r border-r-border">
      {navigations.map((section, index) => (
        <div
          key={section.title}
          className={`flex flex-col text-foreground ${index > 0 ? 'mt-10' : ''}`}
        >
          <span className="text-foreground/60 text-xs font-semibold px-2">
            {section.title}
          </span>
          <nav className="mt-2 flex flex-col gap-1 w-auto">
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                end={item.to === '/docs'}
                to={item.to || '#'}
                onClick={toggle}
                caseSensitive
                className={'flex justify-between pr-4'}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        'inline-block text-xs font-semibold px-2 py-[6px] hover:bg-muted/70 dark:hover:bg-input/70 rounded-md cursor-pointer transition-all',
                        isActive
                          ? 'bg-primary/5 dark:bg-primary/20 text-primary borderd border-primary hover:bg-primary/5 dark:hover:bg-primary/20'
                          : ''
                      )}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      ))}

      {/* Vertical ligne */}
      <div className="absolute top-0 bottom-0 right-0 w-px bg-linear-to-b from-transparent via-border to-transparent"></div>
    </aside>
  );
}
