import { Outlet } from 'rasengan';

const DocsLayout = () => {
  return (
    <section className="w-full bg-white font-inter overflow-auto h-screen dark">
      <Outlet />
    </section>
  );
};

export default DocsLayout;
