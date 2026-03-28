import { Outlet, LayoutComponent } from 'rasengan';
import { Navbar } from '@/components/common/layout/navbar';
import { useTheme } from '@rasenganjs/theme';
import { cn } from '@/lib/utils';

const RootLayout: LayoutComponent = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={cn(
        'w-full h-full text-foreground font-raleway',
        isDark && 'dark'
      )}
    >
      <Navbar />

      <main className="w-full h-full bg-background">
        <Outlet />
      </main>
    </section>
  );
};

export default RootLayout;
