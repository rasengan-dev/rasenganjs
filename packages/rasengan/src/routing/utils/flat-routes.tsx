import { FunctionComponent } from 'react';
import { DefaultLayout } from '../components/template.js';
import { RouterComponent } from '../interfaces.js';
import {
  LayoutComponent,
  MDXPageComponent,
  Metadata,
  PageComponent,
  RouteLoaderFunction,
} from '../types.js';
import { convertMDXPageToPageComponent, isMDXPage } from './define-router.js';

const basePath = '/src/app/_routes/';

type RouteNode = {
  path: string;
  segment: string;
  fullPath: string;
  isLayout?: boolean;
  component?: FunctionComponent<any>;
  metadata?: Metadata;
  loader?: RouteLoaderFunction;
  children?: RouteNode[];
};

type Module = {
  default: FunctionComponent<any>;
};

function normalizeSegment(segment: string) {
  if (segment === 'index') return '.';
  // if (segment.startsWith('[...')) return '*';
  if (segment.startsWith('[') && segment.endsWith(']')) {
    const param = segment.slice(1, -1); // eg. [locale] => locale

    if (param.at(0) === '_') return ':' + param.slice(1) + '?'; // eg. _locale => :locale?

    return ':' + param;
  }

  // Handling optional static segment
  if (segment.length > 1 && segment.at(0) === '_')
    return segment.slice(1) + '?'; // eg. _edit => edit?

  return segment;
}

function getPathSegments(filePath: string, foldersOnly = false) {
  const relative = filePath.replace(basePath, '');

  if (!foldersOnly) {
    const withoutExtension = relative.replace(
      /\.(page|layout)\.(jsx|tsx|mdx|md)$/,
      ''
    );
    return withoutExtension.split('/').map(normalizeSegment).filter(Boolean);
  }

  return relative
    .split('/')
    .map(normalizeSegment)
    .filter((segment) => !segment.includes('.'))
    .filter(Boolean);
}

function generateSkeletonTree(
  tree: RouteNode[],
  modules: Map<string, { segments: string[]; mod: any }>
) {
  let currentLevel = tree;

  const root: RouteNode = {
    path: '/',
    fullPath: '/',
    segment: '_',
    isLayout: false,
    children: [],
  };

  currentLevel.push(root);
  currentLevel = root.children ?? [];

  for (const [, { segments }] of modules) {
    let tmpLevel = currentLevel;
    let fullPath = '';

    for (const segment of segments) {
      if (!(segment.startsWith('(') && segment.endsWith(')'))) {
        fullPath += '/' + segment;
      } else {
        if (fullPath === '') {
          fullPath = '/';
        }
      }

      const existing = tmpLevel.find((n) => n.segment === segment);

      if (existing) {
        tmpLevel = existing.children;
        continue;
      }

      const node: RouteNode = {
        path: fullPath,
        fullPath,
        segment,
        isLayout: false,
        children: [],
      };

      tmpLevel.push(node);
      tmpLevel = node.children ?? [];
    }
  }
}

function insertNodeToTree(
  tree: RouteNode[],
  segments: string[],
  routeInfo: Partial<RouteNode>
) {
  // console.log({ segments, routeInfo });
  let currentNode = tree[0];
  let currentLevel = tree[0].children;
  let currentLayout = currentNode;

  // Handle the root layout
  if (segments.length === 1 && segments[0] === '_') {
    currentNode.isLayout = true;
    currentNode.component = routeInfo.component;
    currentNode.metadata = routeInfo.metadata;
    currentNode.loader = routeInfo.loader;

    return;
  }

  let fullPath = '';

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    // We reached the end of the path
    if (segment === '.') break;

    const node = currentLevel.find((n) => n.segment === segment);

    if (node) {
      // Go to the next node
      currentNode = node;
      currentLevel = node.children;
      fullPath = node.fullPath;

      if (node.isLayout) {
        currentLayout = node;
      }
    }
  }

  if (routeInfo.isLayout) {
    currentNode.isLayout = true;
    currentNode.component = routeInfo.component;
    currentNode.metadata = routeInfo.metadata;
    currentNode.loader = routeInfo.loader;
  } else {
    let path = '';

    // The case where we create an index page directly at the root of _routes folder
    if (segments.length === 1 && segments[0] === '.') {
      path = '/';
    } else {
      const segment = segments.at(-1);

      if (segment === '.') {
        path = fullPath;
      } else {
        path = fullPath + '/' + segment;
      }
    }

    if (currentLayout.path !== '/') {
      const position = path.indexOf(currentLayout.path);

      if (position !== -1) {
        path = path.slice(position + currentLayout.path.length);

        if (path === '') {
          path = '/';
        }
      }
    }

    const node: RouteNode = {
      path,
      fullPath: fullPath + '/' + segments.at(-1),
      segment: segments.at(-1),
      isLayout: false,
      component: routeInfo.component,
      metadata: routeInfo.metadata,
      loader: routeInfo.loader,
    };

    currentLevel.push(node);
  }
}

async function generateRouter(tree: RouteNode[]) {
  const root = tree[0];

  // Generate the base router
  const router = new RouterComponent();

  // Get layout if defined
  if (root.isLayout) {
    // use default layout if not defined
    const layout = (root.component || DefaultLayout) as LayoutComponent;
    layout.path = root.path;
    // TODO: Add metadata here

    router.layout = layout;
    router.useParentLayout = true;
  }

  // Get pages
  const { routes: pages, routers } = await generateRoutes(root.children);

  // Add pages to the router
  router.pages = pages;
  router.routers = routers;

  return router;
}

async function generateRoutes(tree: RouteNode[]) {
  try {
    const routes: Array<PageComponent> = [];
    const routers: RouterComponent[] = [];

    for (const node of tree) {
      // Handle page
      if (!node.isLayout && node.component) {
        const page = node.component as PageComponent;

        if (!page) {
          throw new Error(
            `[rasengan]: Page component is not exported by default for route: ${node.path}`
          );
        }

        if (isMDXPage(page)) {
          // Convert PageComponent to MDXPageComponent (to make ts happy)
          const mdxPage = page as unknown as MDXPageComponent;

          mdxPage.metadata.path = node.path;
          mdxPage.metadata.metadata = node.metadata;

          const pageComponent = await convertMDXPageToPageComponent(mdxPage);

          routes.push(pageComponent);
          continue;
        }

        page.path = node.path;
        page.metadata = node.metadata;
        page.loader = node.loader;

        routes.push(page);

        continue;
      }

      // Handle layout
      if (node.isLayout) {
        const layout = node.component as LayoutComponent;

        if (!layout) {
          throw new Error(
            `Layout component is not defined for route: ${node.path}`
          );
        }

        layout.path = node.path;
        layout.metadata = node.metadata;
        layout.loader = node.loader;

        if (node.children) {
          // Loop through children
          const { routes: subRoutes, routers: subRouters } =
            await generateRoutes(node.children);

          // Create a new router
          const router = new RouterComponent();
          router.layout = layout;
          router.routers = subRouters;
          router.pages = subRoutes;
          router.useParentLayout = true;

          routers.push(router);
        }

        continue;
      }

      if (node.children) {
        // Handle intermediate node (folders)
        const { routes: subRoutes, routers: subRouters } = await generateRoutes(
          node.children
        );

        // Add sub routes and sub routers
        routes.push(...subRoutes);
        routers.push(...subRouters);
      }
    }

    return {
      routes,
      routers,
    };
  } catch (error) {
    console.error(error);

    // TODO: Handle error
  }
}

export async function flatRoutes() {
  try {
    const modules: Record<string, any> = import.meta.glob(
      [
        '/src/app/_routes/**/*.layout.{jsx,tsx}',
        '/src/app/_routes/**/*.page.{md,mdx,jsx,tsx}',
      ],
      { eager: true }
    );

    const tree: RouteNode[] = [];
    const foldersMap: Map<string, { segments: string[]; mod: Module }> =
      new Map();
    const modulesMap: Map<string, { segments: string[]; mod: Module }> =
      new Map();

    for (const [filePath, mod] of Object.entries(modules)) {
      const foldersSegments = getPathSegments(filePath, true);
      const modulesSegments = getPathSegments(filePath);

      foldersMap.set(filePath, { segments: foldersSegments, mod });
      modulesMap.set(filePath, { segments: modulesSegments, mod });
    }

    // Generate the skeleton tree containing just folders as nodes
    generateSkeletonTree(tree, foldersMap);

    console.log(tree);

    // Filter out layouts
    const layoutModulesMap = new Map(
      [...modulesMap.entries()].filter(([filePath]) =>
        filePath.includes('.layout.')
      )
    );

    const pageModulesMap = new Map(
      [...modulesMap.entries()].filter(([filePath]) =>
        filePath.includes('.page.')
      )
    );

    for (const [filePath, { segments, mod }] of layoutModulesMap) {
      if (!mod.default) {
        throw new Error(
          `[rasengan]: Layout component is not exported by default from: ${filePath}}`
        );
      }

      let metadata = (mod.default as LayoutComponent).metadata;
      let loader = (mod.default as LayoutComponent).loader;

      insertNodeToTree(tree, segments, {
        component: mod.default,
        metadata: metadata ?? {},
        loader,
        isLayout: true,
      });
    }

    for (const [filePath, { segments, mod }] of pageModulesMap) {
      if (!mod.default) {
        throw new Error(
          `[rasengan]: Page component is not exported by default from: ${filePath}}`
        );
      }

      let metadata = (mod.default as PageComponent).metadata;
      let loader = (mod.default as PageComponent).loader;

      // extracting the metadata
      if (isMDXPage(mod.default)) {
        metadata = (mod.default as MDXPageComponent).metadata.metadata;
      }

      insertNodeToTree(tree, segments, {
        component: mod.default,
        metadata: metadata ?? {
          title: mod.default.name,
          description: '',
        },
        loader,
        isLayout: false,
      });
    }

    console.log(tree);

    // Convert the tree into a router component instance
    const router = await generateRouter(tree);

    return router;
  } catch (error) {
    console.error(error);

    // TODO: Handle error
  }
}
