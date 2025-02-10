import { DefaultLayout } from '../components/template.js';
import {
  RouterProps,
  PageComponent,
  MDXPageComponent,
  MDXRendererProps,
} from '../types.js';
import { RouterComponent } from '../interfaces.js';

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
    // Handle errors
    if (!option.pages)
      throw new Error(
        'You must provide a list of pages in the router option object'
      );

    // Create router
    const router = new Router();

    // List of pages component
    const pageComponentList: PageComponent[] = [];

    for (let p of pages ?? []) {
      // Check if p is an array
      if (Array.isArray(p)) {
        for (let page of p) {
          if (isMDXPage(page)) {
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

      // When p is a MDXPageComponent
      if (isMDXPage(p)) {
        const Page = await convertMDXPageToPageComponent(p as MDXPageComponent);

        pageComponentList.push(Page);
      } else {
        pageComponentList.push(p as PageComponent);
      }
    }

    // Set properties
    router.routers = imports || [];
    router.layout = layout || DefaultLayout;
    router.pages = pageComponentList;
    router.loaderComponent = loaderComponent || (() => null);
    router.notFoundComponent = notFoundComponent;
    router.useParentLayout = useParentLayout ?? true;

    return router;
  };
};

const convertMDXPageToPageComponent = async (MDXPage: MDXPageComponent) => {
  // Load MDXRenderer from @rasenganjs/mdx
  const MDXRenderer = await loadMDXRenderer();

  const Page: PageComponent = () => {
    return <MDXRenderer className={''}>{MDXPage}</MDXRenderer>;
  };

  Page.path = MDXPage.metadata.path;
  Page.metadata = MDXPage.metadata.metadata;

  return Page;
};

const isMDXPage = (page: MDXPageComponent | PageComponent<any>) => {
  // Check if page is a MDX Page Component or not
  if (!page['path']) {
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
    throw new Error(
      'Failed to load MDXRenderer component from @rasenganjs/mdx, make sure you have installed the package'
    );
  }
};
