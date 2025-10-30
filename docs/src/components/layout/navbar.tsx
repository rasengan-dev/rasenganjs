import { Link } from 'rasengan';
import ThemeButton from '../atoms/buttons/theme-button';
import { NavigationData } from '@/data/docs';
import { Coffee, Ellipsis } from 'lucide-react';
import { useNavigationStore } from '@/store/navigation';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import AppLogo from '../atoms/logo';
import Button from '../atoms/buttons/button';
import { useBannerStore } from '@/store/banner';

type Props = {
  className?: ComponentProps<'header'>['className'];
};

export default function Navbar({ className }: Props) {
  const { toggle } = useNavigationStore();
  const { show: showBanner } = useBannerStore();

  return (
    <div
      className={twMerge(
        'fixed top-0 left-0 w-full z-30',
        showBanner ? 'top-[60px]' : 'top-0'
      )}
    >
      <header
        className={twMerge(
          'w-full h-[60px] bg-background/50 border-b-[1px] border-b-border/60 flex items-center justify-between px-2 lg:px-4 backdrop-blur-sm',
          className
        )}
      >
        <div className="flex items-center gap-2">
          <AppLogo size="lg" />

          <div className="relative">
            {/* Buy me a coffee button */}
            <Link
              to="https://coff.ee/dilane3"
              target="_blank"
              className="relative z-10"
            >
              <Button
                hover
                tap
                className="bg-primary flex items-center text-primary-foreground font-lexend-light h-[35px] rounded-full px-4 w-full md:w-auto"
              >
                <Coffee size={18} className="mr-2" />
                <span className="text-sm">Support us</span>
              </Button>
            </Link>
            <div className="w-[60%] h-[60%] bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 rounded-full animate-ping"></div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav>
            <ul className="flex items-center gap-6">
              {NavigationData.navbar.map((nav) => (
                <Link key={nav.id} to={nav.link ?? '#'}>
                  <li>{nav.name}</li>
                </Link>
              ))}
            </ul>
          </nav>

          <div className="pl-6 border-l border-l-border">
            <ThemeButton />
          </div>

          <Link
            to="https://github.com/rasengan-dev/rasenganjs/tree/main/docs"
            target="_blank"
          >
            <div className="size-8 rounded-full flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)"
                />
              </svg>
            </div>
          </Link>
        </div>

        <div className="flex md:hidden gap-4">
          <Link
            to="https://github.com/rasengan-dev/rasenganjs/tree/main/docs"
            target="_blank"
          >
            <div className="size-8 rounded-full flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)"
                />
              </svg>
            </div>
          </Link>

          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={toggle}
          >
            <Ellipsis size={20} className="text-foreground/70 rotate-90" />
          </div>
        </div>
      </header>
    </div>
  );
}
