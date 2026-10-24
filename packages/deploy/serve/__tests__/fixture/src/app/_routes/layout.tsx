import { Outlet, LayoutComponent } from 'rasengan';

const RootLayout: LayoutComponent = () => {
  return (
    <div id="fixture-layout">
      <header>Fixture layout</header>
      <Outlet />
    </div>
  );
};

export default RootLayout;
