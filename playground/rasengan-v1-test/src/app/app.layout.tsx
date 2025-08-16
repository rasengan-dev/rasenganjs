import Image from '@rasenganjs/image';
import { BookOpen, Box, LayoutTemplate } from 'lucide-react';
import { Outlet, LayoutComponent, useFetcher, useMatch } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  const fetcher = useFetcher();

  const { data } = fetcher;
  const match = useMatch('/');

  return (
    <section className="w-full bg-white font-inter overflow-auto h-screen dark">
      <header className="border-b-[1px] border-b-[#222] h-[60px] w-full bg-black fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-white">
          <Image src={'/rasengan.svg'} alt="Logo of rasengan" width={50} />
          <span className="text-xl">Rasengan.js</span>
        </div>
      </header>

      <main className="w-full flex bg-black mt-8">
        <div className="w-[280px] border-r-[1px] border-r-[#222] text-white">
          <aside className="sticky top-8 w-full h-full max-h-[calc(100vh-(var(--spacing)*14.25))] overflow-y-auto pt-[60px] p-4">
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-4 text-primary">
                <BookOpen size={20} />
                <span>Documentation</span>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <Box size={20} />
                <span>Packages</span>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <LayoutTemplate size={20} />
                <span>Templates</span>
              </div>
            </div>

            <div className="mt-8">
              <span className="font-mono text-[12px] text-white/80">
                GETTING STARTED
              </span>

              <div className="flex flex-col w-full text-sm py-4">
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Installation</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Project Structure</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <span className="font-mono text-[12px] text-white/80">
                CORE CONCEPTS
              </span>

              <div className="flex flex-col w-full text-sm py-4">
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Routing</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Rendering</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Styling</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Optimizing</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Configuring</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Deploying</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <span className="font-mono text-[12px] text-white/80">
                API REFERENCE
              </span>

              <div className="flex flex-col w-full text-sm py-4">
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Components</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Functions</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>File Conventions</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>rasengan.config.js</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>create-rasengan</span>
                </div>
                <div className="px-4 py-1 border-l-[1px] border-l-[#333] text-white/80 cursor-pointer hover:text-primary hover:border-l-primary/60 transition-all">
                  <span>Rasengan CLI</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <section className="w-(--main-width) mt-4">
          <Outlet />
        </section>
      </main>
      <div className="w-full h-[400px] border-[1px] border-t-[#222] bg-black"></div>
    </section>
  );
};

AppLayout.path = '/';

AppLayout.loader = async () => {
  return {
    props: {},
    meta: {
      title: 'Home',
    },
  };
};

export default AppLayout;
