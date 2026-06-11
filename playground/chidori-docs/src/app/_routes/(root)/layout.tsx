import { Outlet, LayoutComponent } from 'rasengan';
import { useTheme } from '@rasenganjs/theme';
import { cn } from '@/lib/utils';
import { Link } from 'rasengan';

type Props = {
  children?: React.ReactNode;
};

function Footer({ children }: Props) {
  return (
    <footer className="w-full h-[60px] text-sm">
      {children}

      <div className="w-full h-full max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-1 text-center text-sm text-foreground">
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
    </footer>
  );
}

const RootLayout: LayoutComponent = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={cn(
        'w-full h-full text-foreground font-raleway',
        isDark && 'dark'
      )}
    >
      <Outlet />
      <Footer />
    </section>
  );
};

export default RootLayout;
