import { LayoutComponent, Outlet } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  // console.log({ g });

  return (
    <section className="h-screen w-full">
      <Outlet />
    </section>
  );
};

export default AppLayout;
