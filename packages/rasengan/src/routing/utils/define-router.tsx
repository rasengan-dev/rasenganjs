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
  const MDXRenderer = await loadMDXRenderer();

  const Page: PageComponent = () => {
    return <MDXRenderer className={''}>{MDXPage}</MDXRenderer>;
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

const loadMDXRenderer = async (): Promise<
  React.FunctionComponent<MDXRendererProps>
> => {
  try {
    // @ts-ignore
    const { MDXRenderer } = await import('@rasenganjs/mdx');

    return MDXRenderer;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
