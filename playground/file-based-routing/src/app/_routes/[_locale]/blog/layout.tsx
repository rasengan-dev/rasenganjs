import { LayoutComponent, Outlet } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  // console.log({ g });

  return (
    <section className="h-screen w-full">
      <div>Blog Layout</div>
      <Outlet />
    </section>
  );
};

export default AppLayout;
