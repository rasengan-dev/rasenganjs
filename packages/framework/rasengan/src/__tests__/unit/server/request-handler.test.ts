import { describe, it, expect } from 'vitest';
import { createRequestHandler } from '../../../server/node/index.js';
import { resolveBuildOptions } from '../../../server/build/index.js';
import type { RenderStreamFunction } from '../../../entries/server/entry.server.js';

function makeCtx(url: string) {
  return { request: new Request(url) } as any;
}

describe('createRequestHandler with `modules` (RFC-0009)', () => {
  it('never touches the filesystem or dynamic import() when `modules` is provided', async () => {
    let renderCalledWith: Parameters<RenderStreamFunction> | null = null;

    const stubRender: RenderStreamFunction = async (
      StaticRouterComponent,
      options
    ) => {
      renderCalledWith = [StaticRouterComponent, options];
      return new Response('stub-rendered');
    };

    const App = () => null;
    const Template = () => null;

    const Page = () => null;
    (Page as any).path = '/about';

    const Layout = () => null;
    (Layout as any).path = '/app';

    const appRouter = {
      layout: Layout,
      pages: [Page],
      routers: [],
      useParentLayout: true,
    } as any;

    // Points at a directory that doesn't exist at all — proves the
    // handler never falls back to fs/dynamic import when `modules` is set.
    const handler = createRequestHandler({
      build: resolveBuildOptions({ buildDirectory: '/does-not-exist' }),
      modules: {
        entryServer: { render: stubRender },
        appRouter,
        config: { ssr: true, prerender: false, redirects: [] } as any,
        manifest: {},
        app: App,
        template: Template,
      },
    });

    const response = await handler(makeCtx('http://x/app/about'));

    expect(await response.text()).toBe('stub-rendered');
    expect(renderCalledWith).not.toBeNull();

    const [, options] = renderCalledWith!;
    expect(options.modules?.App).toBe(App);
    expect(options.modules?.Template).toBe(Template);
  });
});
