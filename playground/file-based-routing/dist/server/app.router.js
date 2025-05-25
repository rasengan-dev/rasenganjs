var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs } from "react/jsx-runtime";
import { D as DefaultLayout } from "./assets/template-CEO8RV0b.js";
import "react";
import "react-dom/server";
import { _ as __vite_glob_0_5, a as __vite_glob_0_3, b as __vite_glob_0_2, c as __vite_glob_0_0 } from "./assets/page-index-FclJ1kNm.js";
import { _ as __vite_glob_0_1 } from "./assets/page-signin-BBokP9vt.js";
import { d as developmentExports } from "./assets/vendor-CsqfrH1N.js";
const defineRouter = (option) => {
  const { imports, layout, pages, loaderComponent, notFoundComponent, useParentLayout } = option;
  return async (Router2) => {
    const router = new Router2();
    const pageComponentList = [];
    for (let p of pages ?? []) {
      if (Array.isArray(p)) {
        for (let page of p) {
          if (isMDXPage(page)) {
            const Page = await convertMDXPageToPageComponent(page);
            pageComponentList.push(Page);
          } else {
            pageComponentList.push(page);
          }
        }
        continue;
      }
      if (isMDXPage(p)) {
        const Page = await convertMDXPageToPageComponent(p);
        pageComponentList.push(Page);
      } else {
        pageComponentList.push(p);
      }
    }
    let routers = await Promise.all(imports ?? []);
    router.routers = routers;
    router.layout = layout || DefaultLayout;
    router.pages = pageComponentList;
    router.loaderComponent = loaderComponent || (() => null);
    router.notFoundComponent = notFoundComponent;
    router.useParentLayout = useParentLayout ?? true;
    return router;
  };
};
const convertMDXPageToPageComponent = async (MDXPage) => {
  const MDXRenderer = await loadMDXRenderer();
  const Page = () => {
    return jsx(MDXRenderer, { className: "", children: MDXPage });
  };
  Page.path = MDXPage.metadata.path;
  Page.metadata = MDXPage.metadata.metadata;
  return Page;
};
const isMDXPage = (page) => {
  if (page.name === "MDXContent") {
    return true;
  }
  return false;
};
const loadMDXRenderer = async () => {
  try {
    const { MDXRenderer } = await import("./assets/index-CaGjM28j.js");
    return MDXRenderer;
  } catch (e) {
    throw new Error("Failed to load MDXRenderer component from @rasenganjs/mdx, make sure you have installed the package");
  }
};
class RouterComponent {
  constructor() {
    /**
     * Defines the layout applied to the Router
     */
    __publicField(this, "_layout");
    /**
     * Defines the list of sub routers
     */
    __publicField(this, "_routers");
    /**
     * Defines the list of pages
     */
    __publicField(this, "_pages");
    /**
     * Defines the loader component to display when pages aren't available
     */
    __publicField(this, "_loaderComponent");
    /**
     * Defines the not found component to display when pages aren't available
     */
    __publicField(this, "_notFoundComponent");
    /**
     * Defines if the layout of the parent router must be used
     */
    __publicField(this, "_useParentLayout");
  }
  // Getters
  /**
   * Get the layout value
   */
  get layout() {
    return this._layout;
  }
  /**
   * Get the list of routers
   */
  get routers() {
    return this._routers;
  }
  /**
   * Get the list of pages
   */
  get pages() {
    return this._pages;
  }
  /**
   * Get the loader component
   */
  get loaderComponent() {
    return this._loaderComponent;
  }
  /**
   * Get the not found component
   */
  get notFoundComponent() {
    return this._notFoundComponent;
  }
  /**
   * Get the use parent layout value
   */
  get useParentLayout() {
    return this._useParentLayout;
  }
  // Setters
  /**
   * Set the layout value
   */
  set layout(layout) {
    this._layout = layout;
  }
  /**
   * Set the list of routers
   */
  set routers(routers) {
    this._routers = routers;
  }
  /**
   * Set the list of pages
   */
  set pages(pages) {
    this._pages = pages;
  }
  /**
   * Set the loader component
   */
  set loaderComponent(loaderComponent) {
    this._loaderComponent = loaderComponent;
  }
  /**
   * Set the not found component
   */
  set notFoundComponent(NotFoundComponent) {
    this._notFoundComponent = NotFoundComponent ? jsx(NotFoundComponent, {}) : void 0;
  }
  /**
   * Set the use parent layout value
   */
  set useParentLayout(useParentLayout) {
    this._useParentLayout = useParentLayout;
  }
}
const basePath = "/src/app/_routes/";
function normalizeSegment(segment) {
  if (segment === "index")
    return ".";
  if (segment.startsWith("[") && segment.endsWith("]")) {
    const param = segment.slice(1, -1);
    if (param.at(0) === "_")
      return ":" + param.slice(1) + "?";
    return ":" + param;
  }
  if (segment.length > 1 && segment.at(0) === "_")
    return segment.slice(1) + "?";
  return segment;
}
function getPathSegments(filePath, foldersOnly = false) {
  const relative = filePath.replace(basePath, "");
  if (!foldersOnly) {
    let withoutExtension = "";
    if (relative.includes("layout.")) {
      withoutExtension = relative.replace(/(layout)\.(jsx|tsx)$/, "") + "_";
    } else {
      withoutExtension = relative.replace(/\.(page|layout)\.(jsx|tsx|mdx|md)$/, "");
    }
    return withoutExtension.split("/").map(normalizeSegment).filter(Boolean);
  }
  return relative.split("/").map(normalizeSegment).filter((segment) => !segment.includes(".")).filter(Boolean);
}
function generateSkeletonTree(tree, modules) {
  let currentLevel = tree;
  const root = {
    path: "/",
    fullPath: "/",
    segment: "_",
    isLayout: false,
    children: []
  };
  currentLevel.push(root);
  currentLevel = root.children ?? [];
  for (const [, { segments }] of modules) {
    let tmpLevel = currentLevel;
    let fullPath = "";
    for (const segment of segments) {
      if (!(segment.startsWith("(") && segment.endsWith(")"))) {
        fullPath += "/" + segment;
      } else {
        if (fullPath === "") {
          fullPath = "/";
        }
      }
      const existing = tmpLevel.find((n) => n.segment === segment);
      if (existing) {
        tmpLevel = existing.children;
        continue;
      }
      const node = {
        path: fullPath,
        fullPath,
        segment,
        isLayout: false,
        children: []
      };
      tmpLevel.push(node);
      tmpLevel = node.children ?? [];
    }
  }
}
function insertNodeToTree(tree, segments, routeInfo) {
  let currentNode = tree[0];
  let currentLevel = tree[0].children;
  let currentLayout = currentNode;
  if (segments.length === 1 && segments[0] === "_") {
    currentNode.isLayout = true;
    currentNode.component = routeInfo.component;
    currentNode.metadata = routeInfo.metadata;
    currentNode.loader = routeInfo.loader;
    return;
  }
  let fullPath = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment === ".")
      break;
    const node = currentLevel.find((n) => n.segment === segment);
    if (node) {
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
    let path = "";
    if (segments.length === 1 && segments[0] === ".") {
      path = "/";
    } else {
      const segment = segments.at(-1);
      if (segment === ".") {
        path = fullPath;
      } else {
        path = fullPath + "/" + segment;
      }
    }
    if (currentLayout.path !== "/") {
      const position = path.indexOf(currentLayout.path);
      if (position !== -1) {
        path = path.slice(position + currentLayout.path.length);
        if (path === "") {
          path = "/";
        }
      }
    }
    const node = {
      path,
      fullPath: fullPath + "/" + segments.at(-1),
      segment: segments.at(-1),
      isLayout: false,
      component: routeInfo.component,
      metadata: routeInfo.metadata,
      loader: routeInfo.loader
    };
    currentLevel.push(node);
  }
}
async function generateRouter(tree) {
  const root = tree[0];
  const router = new RouterComponent();
  if (root.isLayout) {
    const layout = root.component || DefaultLayout;
    layout.path = root.path;
    router.layout = layout;
    router.useParentLayout = true;
  }
  const { routes: pages, routers } = await generateRoutes(root.children);
  router.pages = pages;
  router.routers = routers;
  return router;
}
async function generateRoutes(tree) {
  try {
    const routes = [];
    const routers = [];
    for (const node of tree) {
      if (!node.isLayout && node.component) {
        const page = node.component;
        if (!page) {
          console.warn(`Page component is not exported by default for route: ${node.path}`);
          continue;
        }
        if (isMDXPage(page)) {
          const mdxPage = page;
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
      if (node.isLayout) {
        const layout = node.component;
        if (!layout) {
          console.warn(`Layout component is not defined for route: ${node.path}`);
          continue;
        }
        layout.path = node.path;
        layout.metadata = node.metadata;
        layout.loader = node.loader;
        if (node.children) {
          const { routes: subRoutes, routers: subRouters } = await generateRoutes(node.children);
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
        const { routes: subRoutes, routers: subRouters } = await generateRoutes(node.children);
        routes.push(...subRoutes);
        routers.push(...subRouters);
      }
    }
    return {
      routes,
      routers
    };
  } catch (error) {
    console.error(error);
  }
}
async function flatRoutes(fn) {
  try {
    let modules = fn();
    const tree = [];
    const foldersMap = /* @__PURE__ */ new Map();
    const modulesMap = /* @__PURE__ */ new Map();
    for (const [filePath, mod] of Object.entries(modules)) {
      const foldersSegments = getPathSegments(filePath, true);
      const modulesSegments = getPathSegments(filePath);
      foldersMap.set(filePath, { segments: foldersSegments, mod });
      modulesMap.set(filePath, { segments: modulesSegments, mod });
    }
    generateSkeletonTree(tree, foldersMap);
    const layoutModulesMap = new Map([...modulesMap.entries()].filter(([filePath]) => filePath.includes("layout.")));
    const pageModulesMap = new Map([...modulesMap.entries()].filter(([filePath]) => filePath.includes(".page.")));
    if (layoutModulesMap.size === 0) {
      insertNodeToTree(tree, ["_"], {
        component: DefaultLayout,
        metadata: {},
        isLayout: true
      });
    }
    for (const [filePath, { segments, mod }] of layoutModulesMap) {
      if (!mod.default) {
        console.warn(`Layout component is not exported by default from: ${filePath}}`);
        continue;
      }
      let metadata = mod.default.metadata;
      let loader = mod.default.loader;
      insertNodeToTree(tree, segments, {
        component: mod.default,
        metadata: metadata ?? {},
        loader,
        isLayout: true
      });
    }
    for (const [filePath, { segments, mod }] of pageModulesMap) {
      if (!mod.default) {
        console.warn(`Page component is not exported by default from: ${filePath}}`);
        continue;
      }
      let metadata = mod.default.metadata;
      let loader = mod.default.loader;
      if (isMDXPage(mod.default)) {
        metadata = mod.default.metadata.metadata;
      }
      insertNodeToTree(tree, segments, {
        component: mod.default,
        metadata: metadata ?? {
          title: mod.default.name,
          description: ""
        },
        loader,
        isLayout: false
      });
    }
    const router = await generateRouter(tree);
    return router;
  } catch (error) {
    console.error(error);
  }
}
const AppLayout = () => {
  return /* @__PURE__ */ jsxs("section", { className: "h-screen w-full", children: [
    /* @__PURE__ */ jsx("header", { className: "w-full h-20 bg-red-300", children: "header 6" }),
    /* @__PURE__ */ jsx(developmentExports.Outlet, {})
  ] });
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AppLayout
}, Symbol.toStringTag, { value: "Module" }));
const Router = flatRoutes(() => {
  return /* @__PURE__ */ Object.assign({
    "/src/app/_routes/about/index.page.tsx": __vite_glob_0_0,
    "/src/app/_routes/auth/signin.page.tsx": __vite_glob_0_1,
    "/src/app/_routes/company/index.page.tsx": __vite_glob_0_2,
    "/src/app/_routes/index.page.tsx": __vite_glob_0_3,
    "/src/app/_routes/layout.tsx": __vite_glob_0_4,
    "/src/app/_routes/pricing/index.page.tsx": __vite_glob_0_5
  });
});
class AppRouter extends RouterComponent {
}
const AppRouter$1 = defineRouter({
  imports: [Router],
  pages: []
})(AppRouter);
export {
  AppRouter$1 as default
};
