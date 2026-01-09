import { DefaultLayout } from '../components/template.js';
import {
  RouterProps,
  PageComponent,
  MDXPageComponent,
  MDXRendererProps,
} from '../types.js';
import { RouterComponent } from '../interfaces.js';
import { RouteNode } from './index.js';

/**
 * This function adds metadata to a router
 * @param option
 * @returns
 */
export const defineRouter = (option: RouterProps) => {
  const {
    imports,
    layout,
    pages,
    loaderComponent,
    notFoundComponent,
    useParentLayout,
  } = option;

  return async (Router: new () => RouterComponent) => {
    // Create router
    const router = new Router();

    // List of pages component
    const pageComponentList: Array<PageComponent | RouteNode> = [];

    for (let p of pages ?? []) {
      // Check if p is an array
      if (Array.isArray(p)) {
        for (let page of p) {
          if ('source' in page) {
            pageComponentList.push(page as RouteNode);

            continue;
          }

          if (isMDXPage(page as MDXPageComponent)) {
            const Page = await convertMDXPageToPageComponent(
              page as MDXPageComponent
            );

            pageComponentList.push(Page);
          } else {
            pageComponentList.push(page as PageComponent);
          }
        }

        continue;
      }

      if ('source' in p) {
        pageComponentList.push(p as RouteNode);

        continue;
      }

      // When p is a MDXPageComponent
      if (isMDXPage(p as MDXPageComponent)) {
        const Page = await convertMDXPageToPageComponent(p as MDXPageComponent);

        pageComponentList.push(Page);
      } else {
        pageComponentList.push(p as PageComponent);
      }
    }

    let routers = await Promise.all(imports ?? []);

    // Set properties
    router.routers = routers;
    router.layout = layout || DefaultLayout;
    router.pages = pageComponentList;
    router.loaderComponent = loaderComponent || (() => null);
    router.notFoundComponent = notFoundComponent;
    router.useParentLayout = useParentLayout ?? true;

    return router;
  };
};

export const convertMDXPageToPageComponent = async (
  MDXPage: MDXPageComponent
) => {
  // Load MDXRenderer from @rasenganjs/mdx
  const { MDXRenderer, mdxConfig } = await loadMDXRenderer();

  const Page: PageComponent = () => {
    return (
      <MDXRenderer className={''} config={mdxConfig}>
        {MDXPage}
      </MDXRenderer>
    );
  };

  Page.path = MDXPage.metadata.path;
  Page.metadata = MDXPage.metadata.metadata;

  return Page;
};

export const isMDXPage = (page: MDXPageComponent | PageComponent<any>) => {
  // Check if page is a MDX Page Component or not
  if (page.type === 'MDXPageComponent') {
    return true;
  }

  return false;
};

/**
 * Load thr MDXRenderer is the dedicated package is installed
 * @returns
 */
const loadMDXRenderer = async (): Promise<{
  MDXRenderer: React.FunctionComponent<MDXRendererProps>;
  mdxConfig: any;
} | null> => {
  try {
    // Dynamically import only if the package exists
    const mod = await import('@rasenganjs/mdx');
    //@ts-ignore
    const mdxConfig = await import('virtual:rasengan/mdx-components');
    return {
      MDXRenderer: mod.MDXRenderer,
      mdxConfig: mdxConfig.default,
    };
  } catch (error: any) {
    // Handle the case when the package is not installed
    if (
      error.code === 'MODULE_NOT_FOUND' ||
      /Cannot find module '@rasenganjs\/mdx'/.test(error.message)
    ) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          '[Rasengan.js] MDX package not found — skipping MDX rendering.'
        );
      }
      return null;
    }

    // Other unexpected errors (e.g. runtime bug in the module)
    console.error(
      '[Rasengan.js] Unexpected error while loading MDX module:',
      error
    );
    throw error;
  }
};
