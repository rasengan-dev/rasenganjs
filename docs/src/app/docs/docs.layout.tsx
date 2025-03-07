import Navbar from '@/components/layout/navbar';
import { Outlet, LayoutComponent } from 'rasengan';
import SidebarNavigation from './components/layout/sidebar';
import Footer from '@/components/layout/footer';

const DocsLayout: LayoutComponent = () => {
  return (
    <section className="w-full h-full overflow-y-auto">
      <Navbar />

      <section className="h-auto flex pt-4">
        <SidebarNavigation />

        <main className="w-(--main-width) h-fulld mt-10 ">
          <div className="px-0 w-full">
            <Outlet />
          </div>
          <Footer />
        </main>
      </section>
    </section>
  );
};

DocsLayout.path = '/docs';

export default DocsLayout;
