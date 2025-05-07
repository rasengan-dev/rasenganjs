import { RouterComponent, defineRouter, flatRoutes } from 'rasengan';

const Router = flatRoutes(() => {
  return import.meta.glob(
    [
      '/src/app/_routes/**/layout.{jsx,tsx}',
      '/src/app/_routes/**/*.page.{md,mdx,jsx,tsx}',
    ],
    { eager: true }
  );
});

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [Router],
  pages: [],
})(AppRouter);
