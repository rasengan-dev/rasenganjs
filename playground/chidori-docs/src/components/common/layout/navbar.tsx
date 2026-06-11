import { Button } from '@/components/ui/button';
import { AlignJustify, Coffee } from 'lucide-react';
import { Link } from 'rasengan';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import ThemeButton from '../atoms/buttons/theme-button';
import AppLogo from '@/components/common/atoms/logo';
import Search from '@/components/common/molecules/search';
import { useNavigationStore } from '@/store/navigation';

type Props = {
  className?: ComponentProps<'header'>['className'];
};

export const Navbar = ({ className }: Props) => {
  const { toggle } = useNavigationStore();

  return (
    <header
      id="navbar"
      className={twMerge(
        'fixed top-0 left-0 right-0 z-30 bg-background backdrop-blur-mdc w-full h-[60px] flex items-center justify-between px-4',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          className="size-8 lg:hidden text-foreground/70"
          variant={'ghost'}
          onClick={toggle}
        >
          <AlignJustify />
        </Button>

        <AppLogo size="sm" />

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1 text-foreground text-sm">
            <Link
              to="/docs/introduction"
              className="hover:bg-muted/70 dark:hover:bg-muted/30 transition-all px-2 flex items-center rounded-md h-8"
            >
              <li className="font-semibold">Docs</li>
            </Link>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <div className="px-4">
          <Search
            applicationId="06YAZFOHSQ"
            apiKey="94b6afdc316917b6e6cdf2763fa561df"
            indexName="algolia_podcast_sample_dataset"
            attributes={{
              primaryText: 'title',
              secondaryText: 'description',
              tertiaryText: 'itunesAuthor',
              url: 'url',
              image: 'imageUrl',
            }}
            buttonProps={{
              style: {
                height: 32,
              },
              className: 'hover:shadow-sm hover:translate-0',
            }}
          />
        </div>

        {/* vertical separator */}
        <div className="h-4 w-[1px] bg-border dark:bg-input"></div>

        <Link to="https://github.com/rasengan-dev/chidori" target="_blank">
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
          className="h-8 hidden sm:flex"
        >
          <Button className="h-8">
            <Coffee />
            <span>Support us</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};
