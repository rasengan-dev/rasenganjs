import { Outlet, LayoutComponent, ScrollRestoration } from 'rasengan';
import Footer from '@/components/common/layout/footer';
import { useRef } from 'react';
import Sidebar from '@/components/common/layout/sidebar';
import { cn } from '@/lib/utils';
import { useNavigationStore } from '@/store/navigation';

const DocsLayout: LayoutComponent = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { isOpen, toggle } = useNavigationStore();

  return (
    <section
      className={
        'w-full h-screen overflow-hidden bg-background text-foreground'
      }
    >
      <ScrollRestoration target={targetRef} />

      <main className="w-full flex lg:w-(--main-width) h-(--main-height) mt-[50px] overflow-hidden">
        <div className="relative w-[350px] h-full overflow-x-hidden overflow-y-auto hidden lg:block">
          {/* Top blur mask */}
          <div className="absolute left-0 top-0 bg-linear-to-b from-background to-transparent from-30% w-full h-[80px] z-20"></div>

          <Sidebar />

          {/* Bottom blur mask */}
          <div className="absolute left-0 bottom-0 bg-linear-to-t from-background to-transparent from-30% w-full h-[80px] z-20"></div>
        </div>

        <div
          className={cn(
            'fixed top-[60px] z-30 left-0 w-64 h-full lg:hidden transition-all duration-300 ease-in-out',
            isOpen ? '' : 'translate-x-[calc(-100%-20px)]'
          )}
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full overflow-x-hidden overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </div>

        <div className="px-0 w-full h-auto overflow-y-auto" ref={targetRef}>
          <div className="">
            <Outlet />
          </div>
          <Footer />
        </div>

        {/* Background dark */}
        {isOpen && (
          <div
            className="lg:hidden bg-background/60 fixed top-0 left-0 w-full h-full"
            onClick={toggle}
          ></div>
        )}
      </main>
    </section>
  );
};

DocsLayout.path = '/';
DocsLayout.metadata = {
  openGraph: {
    title: 'Rasengan.js - Documentation',
    description:
      'Learn everything you need to know about Rasengan.js, and build amazing web applications.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/docs.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome to Rasengan.js',
    description:
      'Learn everything you need to know about Rasengan.js, and build amazing web applications.',
    image: 'https://rasengan.dev/assets/images/metadata/docs.png',
  },
};

export default DocsLayout;
