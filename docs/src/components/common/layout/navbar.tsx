import { Link } from 'rasengan';
import ThemeButton from '../atoms/buttons/theme-button';
import { ArrowUpRight, ChevronDown, Coffee } from 'lucide-react';
import { useNavigationStore } from '@/store/navigation';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import AppLogo from '../atoms/logo';
import { useBannerStore } from '@/store/banner';
import { Button } from '@/components/ui/button';
import { NavigationData } from '@/data/docs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTheme } from '@rasenganjs/theme';

type Props = {
  className?: ComponentProps<'header'>['className'];
};

export default function Navbar({ className }: Props) {
  const { isDark } = useTheme();
  const { toggle } = useNavigationStore();
  const { show: showBanner } = useBannerStore();

  return (
    <div
      className={twMerge(
        'fixedd top-0d left-0d w-full z-30 border-b-[1px] border-b-border/60',
        showBanner ? 'top-[60px]' : 'top-0'
      )}
    >
      <header
        id="navbar"
        className={twMerge(
          'fixedd top-0d left-0d right-0d z-30 bg-background/70 backdrop-blur-md w-full h-[60px] flex items-center justify-between px-4',
          className
        )}
      >
        <div className="flex items-center gap-8">
          <AppLogo size="sm" />

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
                      <Link
                        to="https://ui.rasengan.dev"
                        className="hover:text-primary"
                        target="_blank"
                      >
                        <li className="flex items-center gap-2">
                          <span>Rasengan UI</span>
                          <ArrowUpRight size={16} />
                        </li>
                      </Link>
                      <Link
                        to="https://hub.rasengan.dev"
                        className="hover:text-primary"
                        target="_blank"
                      >
                        <li className="flex items-center gap-2">
                          <span>Rasengan Hub</span>
                          <ArrowUpRight size={16} />
                        </li>
                      </Link>
                      <Link
                        to="https://chidori.rasengan.dev"
                        className="hover:text-primary"
                        target="_blank"
                      >
                        <li className="flex items-center gap-2">
                          <span>Chidori</span>
                          <ArrowUpRight size={16} />
                        </li>
                      </Link>
                      <Link
                        to="https://nindo.rasengan.dev"
                        className="hover:text-primary"
                        target="_blank"
                      >
                        <li className="flex items-center gap-2">
                          <span>Nindo</span>
                          <ArrowUpRight size={16} />
                        </li>
                      </Link>
                      <Link
                        to="https://chunin.rasengan.dev"
                        className="hover:text-primary"
                        target="_blank"
                      >
                        <li className="flex items-center gap-2">
                          <span>Chunin</span>
                          <ArrowUpRight size={16} />
                        </li>
                      </Link>
                    </ul>
                  </nav>
                </PopoverContent>
              </Popover>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* <div className="px-4">
          <Search
            applicationId="06YAZFOHSQ"
            apiKey="94b6afdc316917b6e6cdf2763fa561df"
            indexName="algolia_podcast_sample_dataset"
            attributes={{
              primaryText: "title",
              secondaryText: "description",
              tertiaryText: "itunesAuthor",
              url: "url",
              image: "imageUrl",
            }}
            buttonProps={{
              style: {
                height: 32
              },
              className: "hover:shadow-sm hover:translate-0"
            }}
          />
        </div> */}

          {/* vertical separator */}
          {/* <div className='h-4 w-[1px] bg-border dark:bg-input'></div> */}

          <Link
            to="https://github.com/rasengan-dev/rasenganjs/tree/main/docs"
            target="_blank"
          >
            <div className="flex items-center gap-2 text-foreground px-4">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="size-4"
              >
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
        </div>
      </header>
    </div>
  );
}
