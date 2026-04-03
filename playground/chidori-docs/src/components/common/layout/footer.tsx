import { useTheme } from '@rasenganjs/theme';
import { twMerge } from 'tailwind-merge';
import { Link } from 'rasengan';
import ThemeButton from '../atoms/buttons/theme-button';
import { useState } from 'react';
import { Coffee } from 'lucide-react';
import AppLogo from '../atoms/logo';
import { Button } from '@/components/ui/button';

export default function Footer() {
  // Theme
  const { isDark } = useTheme();

  const [email, setEmail] = useState('');

  return (
    <footer
      className={twMerge(
        'w-full px-[20px] md:px-[50px] py-8 pb-16 lg:pb-0 border-t-[1px] border-t-border/60',
        isDark ? 'bg-white/2' : 'bg-black/2'
      )}
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-x-2 gap-y-8">
          <div className="w-7/10 flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3">
              <AppLogo />
            </div>

            <div className="w-full lg:w-1/3">
              <h3 className="text-sm font-medium">Resources</h3>

              <nav className="mt-4 text-sm">
                <ul className="flex flex-col gap-2">
                  <Link to="/docs/introduction" className="hover:text-primary">
                    <li>Docs</li>
                  </Link>
                  <Link to="#" className="hover:text-primary">
                    <li>Packages</li>
                  </Link>
                  <Link to="#" className="hover:text-primary">
                    <li>Blog</li>
                  </Link>
                  <Link to="#" className="hover:text-primary">
                    <li>Showcase</li>
                  </Link>
                  <Link
                    to="https://coff.ee/dilane3"
                    target="_blank"
                    className="relative z-10"
                  >
                    <li className="flex items-center gap-2 text-primary hover:text-primary/80">
                      <span>Support us</span>
                      <Coffee size={16} />
                    </li>
                  </Link>
                </ul>
              </nav>
            </div>

            <div className="w-full lg:w-1/3">
              <h3 className="text-sm font-medium">Community</h3>

              <nav className="mt-4 text-sm">
                <ul className="flex flex-col gap-2">
                  <Link
                    to="https://github.com/rasengan-dev/rasenganjs/discussions"
                    className="hover:text-primary"
                    target="_blank"
                  >
                    <li>Github</li>
                  </Link>
                  <Link to="#">
                    <li>Discord</li>
                  </Link>
                  <Link
                    to="https://twitter.com/rasenganjs"
                    className="hover:text-primary"
                    target="_blank"
                  >
                    <li>X (Twitter)</li>
                  </Link>
                </ul>
              </nav>
            </div>
          </div>

          <div className="w-full lg:w-3/10 lg:min-w-[200px] max-w-[400px]">
            <h3 className="text-sm font-medium">Subscribe to the Newsletter</h3>

            <p className="mt-4 text-sm">
              Stay informed to the news about rasengan.js including new
              releases, events, etc...
            </p>

            <div className="w-full mt-4 flex gap-2">
              <input
                className={twMerge(
                  'w-full text-sm rounded-md py-2 px-4 outline-none outline-0 border-[1px] border-border '
                )}
                placeholder="yourname@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="bg-primary hover:bg-primary/80 text-primary-foreground text-sm rounded-md"
                disabled={!email}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="h-[60px] flex items-center justify-between mt-12 border-t-[1px] border-t-border">
          {/* <p className="text-sm">
            © {new Date(Date.now()).getFullYear()} Rasengan Labs, All rights
            reserved.
          </p> */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              Built by
              <Link
                to="https://x.com/dilanekombou"
                target="_blank"
                className="font-semibold underline underline-offset-4"
              >
                dilane3
              </Link>
              with
              <Link
                to="https://rasengan.dev"
                target="_blank"
                className="font-semibold underline underline-offset-4"
              >
                Rasengan
              </Link>
              .
            </div>
            <div className="flex items-center gap-1">
              The source code is available on
              <Link
                to="https://github.com/rasengan-dev/chidori"
                target="_blank"
                className="font-semibold underline underline-offset-4"
              >
                GitHub
              </Link>
              .
            </div>
          </div>

          <ThemeButton />
        </div>
      </div>
    </footer>
  );
}
