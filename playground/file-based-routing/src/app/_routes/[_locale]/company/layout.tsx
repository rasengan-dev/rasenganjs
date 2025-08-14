import { LayoutComponent, Outlet } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  return (
    <section className="h-screen w-full">
      <Outlet />
    </section>
  );
};

export default AppLayout;
