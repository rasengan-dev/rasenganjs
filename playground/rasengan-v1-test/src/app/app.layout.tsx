import { Outlet, LayoutComponent } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  return (
    <section className="w-full bg-white font-comfortaa overflow-auto h-screen dark">
      <main className="w-full flex bg-black">
        <div className="w-[300px]"></div>
        <section className="w-full">
          <Outlet />
        </section>
      </main>
      <div className="w-full h-[600px] border-[1px] border-t-[#222] bg-black"></div>
    </section>
  );
};

AppLayout.path = '/';

export default AppLayout;
