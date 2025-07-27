import { LayoutComponent, Outlet } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  return (
    <section className="h-screen w-full">
      <header className="w-full h-20 bg-blue-300">header Blog</header>
      <Outlet />
    </section>
  );
};

export default AppLayout;
