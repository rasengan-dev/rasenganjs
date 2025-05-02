import { FunctionComponent } from 'react';
import { DefaultLayout } from '../components/template.js';
import { RouterComponent } from '../interfaces.js';
import {
  LayoutComponent,
  MDXPageComponent,
  Metadata,
  PageComponent,
} from '../types.js';

const basePath = '/src/app/_routes/';

type RouteNode = {
  path: string;
  segment: string;
  fullPath: string;
  isLayout?: boolean;
  component?: FunctionComponent<any>;
  metadata?: Metadata;
  children?: RouteNode[];
};

type Module = {
  default: FunctionComponent<any>;
  metadata?: Metadata;
};

function normalizeSegment(segment: string) {
  if (segment === 'index') return '';
  // if (segment.startsWith('[...')) return '*';
  if (segment.startsWith('[') && segment.endsWith(']')) {
    const param = segment.slice(1, -1); // eg. [locale] => locale

    if (param.at(0) === '_') return ':' + param.slice(1) + '?'; // eg. _locale => :locale?

    return ':' + param;
  }

  // Handling optional static segment
  if (segment.at(0) === '_') return segment.slice(1) + '?'; // eg. _edit => edit?

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

    return;
  }

  let fullPath = '';

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];

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
  } else {
    let path = '';

    // The case where we create an index page directly at the root of _routes folder
    if (segments.length === 0) {
      path = '/';
    } else {
      path = fullPath + '/' + segments.at(-1);
    }

    if (currentLayout.path !== '/') {
      const position = path.indexOf(currentLayout.path);

      if (position !== -1) {
        path = path.slice(position + currentLayout.path.length);
      }
    }

    const node: RouteNode = {
      path,
      fullPath: fullPath + '/' + segments.at(-1),
      segment: segments.at(-1),
      isLayout: false,
      component: routeInfo.component,
      metadata: routeInfo.metadata,
    };

    currentLevel.push(node);
  }
}

function generateRouter(tree: RouteNode[]) {
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
  const { routes: pages, routers } = generateRoutes(root.children);

  // Add pages to the router
  router.pages = pages;
  router.routers = routers;

  return router;
}

function generateRoutes(tree: RouteNode[]) {
  const routes: Array<PageComponent> = [];
  const routers: RouterComponent[] = [];

  for (const node of tree) {
    // Handle page
    if (!node.isLayout && node.component) {
      const page = node.component as PageComponent;

      if (!page) {
        throw new Error(
          `Page component is not defined for route: ${node.path}`
        );
      }

      page.path = node.path;
      page.metadata = node.metadata;
      // TODO: Add loader here if defined

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
      // TODO: Add loader here if defined

      if (node.children) {
        // Loop through children
        const { routes: subRoutes, routers: subRouters } = generateRoutes(
          node.children
        );

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
      const { routes: subRoutes, routers: subRouters } = generateRoutes(
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
}

export async function flatRoutes() {
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

  for (const [, { segments, mod }] of layoutModulesMap) {
    insertNodeToTree(tree, segments, {
      component: mod.default,
      metadata: mod.metadata ?? {},
      isLayout: true,
    });
  }

  for (const [, { segments, mod }] of pageModulesMap) {
    insertNodeToTree(tree, segments, {
      component: mod.default,
      metadata: mod.metadata ?? {
        title: 'Untitled',
        description: '',
      },
      isLayout: false,
    });
  }

  // Convert the tree into a router component instance
  const router = generateRouter(tree);

  return router;
}
