import { LayoutComponent, NavLink, Outlet, useParams, Link } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  const { locale = 'fr' } = useParams();

  return (
    <section className="h-screen w-full">
      <header className="w-full h-20 flex items-center justify-center gap-8 border-b border-b-border">
        <NavLink to={`/${locale}`} end>
          {({ isActive }) => (
            <span className={isActive ? 'text-blue-500' : ''}>Home</span>
          )}
        </NavLink>
        <NavLink to={`/${locale}/blog`}>
          {({ isActive }) => (
            <span className={isActive ? 'text-blue-500' : ''}>Blog</span>
          )}
        </NavLink>
        <NavLink to={`/${locale}/company`}>
          {({ isActive }) => (
            <span className={isActive ? 'text-blue-500' : ''}>Company</span>
          )}
        </NavLink>
        <NavLink to={`/${locale}/pricing`}>
          {({ isActive }) => (
            <span className={isActive ? 'text-blue-500' : ''}>Pricing</span>
          )}
        </NavLink>
      </header>
      <Outlet />
    </section>
  );
};

export default AppLayout;
