import { LayoutComponent, Outlet } from 'rasengan';

// Plain <a> tags, not <NavLink> — a root layout at the literal path "/"
// currently breaks useLocation()/NavLink during SSR (a pre-existing
// rasengan core bug, reproduces identically with no Cloudflare bundling
// involved, unrelated to RFC-0009). Tracked separately from this demo.
const AppLayout: LayoutComponent = () => {
  return (
    <section>
      <header style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </header>
      <Outlet />
    </section>
  );
};

export default AppLayout;
