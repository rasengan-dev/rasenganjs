import { LayoutComponent, Outlet } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  return (
    <section className="h-screen w-full">
      <header className="w-full h-20 bg-red-300">header 6</header>
      <Outlet />
    </section>
  );
};

export default AppLayout;
