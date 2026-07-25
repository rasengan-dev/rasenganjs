import { Outlet, LayoutComponent } from 'rasengan';
import { ScrollRestoration } from '@/components/common/molecules/scroll-restoration';
import { cn } from '@/lib/utils';

const RootLayout: LayoutComponent = () => {
  return (
    <section className={cn('bg-background font-sans text-foreground')}>
      <ScrollRestoration />
      <div className="relative w-screen overflow-x-hidden">
        <Outlet />
      </div>
    </section>
  );
};

export default RootLayout;
