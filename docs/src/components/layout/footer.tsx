import Image from '@rasenganjs/image';
import LogoWhite from '@/assets/images/logo/logo-text-white.svg';
import LogoBlack from '@/assets/images/logo/logo-text.svg';
import { ThemesType, useTheme } from '@rasenganjs/theme';
import { twMerge } from 'tailwind-merge';
import { Link } from 'rasengan';
import Button from '@/components/atoms/buttons/button';
import ThemeButton from '../atoms/buttons/theme-button';
import { useEffect, useState } from 'react';
import { newsletterProvider } from '@/api/newsletter';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, XCircle } from 'lucide-react';
// import { checkEmail } from 'utils/check';

export default function Footer() {
  // Theme
  const { isDark } = useTheme();
  const [subscribing, setSubscribing] = useState(false);
  const [successSubscribe, setSuccessSubscribe] = useState<boolean | null>(
    null
  );
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (successSubscribe === null) return;

    const timer = setTimeout(() => {
      setSuccessSubscribe(null);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [successSubscribe]);

  const handleSubscribe = async () => {
    if (!email) return;

    setSubscribing(true);

    const { data } = await newsletterProvider.subscribe(email);

    setSubscribing(false);

    if (data) {
      setSuccessSubscribe(true);
      setEmail('');
    } else {
      setSuccessSubscribe(false);
    }
  };

  return (
    <footer
      className={twMerge(
        'w-full px-[20px] md:px-[50px] py-8 pb-16 lg:pb-0 border-t-[1px] border-t-border/60'
      )}
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-x-2 gap-y-8">
          <div className="w-7/10 flex flex-col lg:flex-row gap-8">
            <div className="w-1/3">
              <Link to="/">
                <Image
                  src={isDark ? LogoWhite : LogoBlack}
                  alt="Rasengan Logo"
                  width={130}
                  height={'auto'}
                />
              </Link>
            </div>

            <div className="w-1/3">
              <h3 className="text-lg font-lexend-medium">Resources</h3>

              <nav className="mt-4 text-sm">
                <ul className="flex flex-col gap-2">
                  <Link
                    to="/docs/getting-started/introduction"
                    className="hover:text-primary"
                  >
                    <li>Docs</li>
                  </Link>
                  <Link to="/packages" className="hover:text-primary">
                    <li>Packages</li>
                  </Link>
                  <Link to="/blog" className="hover:text-primary">
                    <li>Blog</li>
                  </Link>
                  <Link to="/showcase" className="hover:text-primary">
                    <li>Showcase</li>
                  </Link>
                </ul>
              </nav>
            </div>

            <div className="w-1/3">
              <h3 className="text-lg font-lexend-medium">Community</h3>

              <nav className="mt-4 text-sm">
                <ul className="flex flex-col gap-2">
                  <Link
                    to="https://github.com/rasengan-dev/rasenganjs/discussions"
                    className="hover:text-primary"
                    target="_blank"
                  >
                    <li>Github</li>
                  </Link>
                  {/* <Link href="/discord.com/rasengan-server">
                    <li>Discord</li>
                  </Link> */}
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
            <h3 className="text-lg font-lexend-medium">
              Subscribe to the Newsletter
            </h3>

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
                onClick={handleSubscribe}
                disabled={!email}
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>

        <div className="h-[60px] flex items-center justify-between mt-12 border-t-[1px] border-t-border">
          <p className="text-sm">
            Copyright © {new Date(Date.now()).getFullYear()} Rasengan Labs{' '}
          </p>

          <ThemeButton />
        </div>
      </div>

      <AnimatePresence>
        {typeof successSubscribe === 'boolean' &&
          (successSubscribe ? (
            <motion.div
              initial={{ opacity: 0, y: 300 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 300 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-8 right-8 flex items-center gap-4 px-4 w-full max-w-[300px] min-h-[60px] rounded-2xl border-[1px] border-border bg-background shadow-3xl shadow-black/40"
            >
              <CheckCircle size={20} className="text-green-400" />

              <span className="text-sm">Your subscription is done!</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 300 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 300 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-8 right-8 flex items-center gap-4 px-4 w-full max-w-[300px] min-h-[60px] rounded-2xl border-[1px] border-border bg-background shadow-3xl shadow-black/40"
            >
              <XCircle size={20} className="text-red-400" />

              <span className="text-sm">Something went wrong!</span>
            </motion.div>
          ))}
      </AnimatePresence>
    </footer>
  );
}
