var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useEffect, Suspense, use, useMemo, createContext, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { d as developmentExports } from "./vendor-DsEjlbjf.js";
const defineRouter = (option) => {
  const { imports, layout, pages, loaderComponent, notFoundComponent, useParentLayout } = option;
  return async (Router) => {
    const router = new Router();
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
    const { MDXRenderer } = await import("./index-COZlhnGw.js");
    return MDXRenderer;
  } catch (e) {
    throw new Error("Failed to load MDXRenderer component from @rasenganjs/mdx, make sure you have installed the package");
  }
};
function ErrorBoundary() {
  let error = developmentExports.useRouteError();
  if (developmentExports.isRouteErrorResponse(error)) {
    return jsxs(Fragment, { children: [jsx("p", { children: "Hello Error" }), jsxs("h1", { children: [error.status, " ", error.statusText] }), jsx("p", { children: error.data })] });
  } else if (error instanceof Error) {
    return jsxs("div", { style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      height: "100vh",
      width: "calc(100vw - 40px)",
      padding: 20
    }, children: [jsx("h1", { style: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      marginBottom: 5
    }, children: "Application Error" }), jsx("p", { style: {
      fontSize: "1rem",
      marginBottom: 10
    }, children: error.message }), jsxs("div", { style: {
      marginTop: 20,
      overflow: "auto",
      width: "calc(100% - 80px)",
      maxHeight: "calc(100vh - 100px)",
      padding: "10px 20px",
      borderRadius: 10,
      backgroundColor: "#f5f5f5"
    }, children: [jsx("p", { style: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      color: "#000"
    }, children: "The stack trace is:" }), jsx("pre", { style: {
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      fontSize: "1rem",
      color: "#ff000055"
    }, children: error.stack })] })] });
  } else {
    return jsx("h1", { children: "Unknown Error" });
  }
}
const RasenganPageComponent = ({ page: Page, data }) => {
  const props = data.props ?? {};
  const params = developmentExports.useParams();
  const pageProps = {
    ...props,
    params
  };
  return jsx(Page, { ...pageProps });
};
const NotFoundPageComponent = () => {
  return jsxs("section", { style: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw"
  }, children: [jsx("h1", { style: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: 10
  }, children: "404 Page Not Found" }), jsx("p", { style: {
    fontSize: "1.2rem",
    marginBottom: 20
  }, children: "The page you are looking for does not exist or has been moved." }), jsx(developmentExports.Link, { to: "/", style: {
    fontSize: "1.2rem",
    fontWeight: 800,
    marginBottom: 20,
    textDecoration: "none"
  }, children: "Go back to home page" })] });
};
const CustomLink = (props) => {
  const { to, children, ...rest } = props;
  if (typeof to === "string") {
    const splitted = to.split("#");
    if (splitted.length > 1)
      return jsx("a", { href: to, ...rest, children });
  }
  return jsx(developmentExports.Link, { to, ...rest, children });
};
const generateMetadata = (metadatas) => {
  const metadataElements = [];
  metadatas.forEach((metadata) => {
    const { openGraph, twitter, links, metaTags } = metadata;
    if (openGraph) {
      const { title, description, url, image, width, height, type } = openGraph;
      if (title) {
        metadataElements.push(jsx("meta", { property: "og:title", content: title, "data-rg": "true" }, "og:title"));
      }
      if (description) {
        metadataElements.push(jsx("meta", { property: "og:description", content: description, "data-rg": "true" }, "og:description"));
      }
      if (url) {
        metadataElements.push(jsx("meta", { property: "og:url", content: url, "data-rg": "true" }, "og:url"));
      }
      if (image) {
        metadataElements.push(jsx("meta", { property: "og:image", content: image, "data-rg": "true" }, "og:image"));
      }
      if (width) {
        metadataElements.push(jsx("meta", { property: "og:image:width", content: width, "data-rg": "true" }, "og:image:width"));
      }
      if (height) {
        metadataElements.push(jsx("meta", { property: "og:image:height", content: height, "data-rg": "true" }, "og:image:height"));
      }
      metadataElements.push(jsx("meta", { property: "og:type", content: type || "website", "data-rg": "true" }, "og:type"));
    }
    if (twitter) {
      const { card, site, creator, image, title, description } = twitter;
      metadataElements.push(jsx("meta", { name: "twitter:card", content: card || "summary_large_image", "data-rg": "true" }, "twitter:card"));
      if (site) {
        metadataElements.push(jsx("meta", { name: "twitter:site", content: site, "data-rg": "true" }, "twitter:site"));
      }
      if (creator) {
        metadataElements.push(jsx("meta", { name: "twitter:creator", content: creator, "data-rg": "true" }, "twitter:creator"));
      }
      if (image) {
        metadataElements.push(jsx("meta", { name: "twitter:image", content: image, "data-rg": "true" }, "twitter:image"));
      }
      if (title) {
        metadataElements.push(jsx("meta", { name: "twitter:title", content: title, "data-rg": "true" }, "twitter:title"));
      }
      if (description) {
        metadataElements.push(jsx("meta", { name: "twitter:description", content: description, "data-rg": "true" }, "twitter:description"));
      }
    }
    if (links) {
      metadataElements.push(...generateLinks(links));
    }
    if (metaTags) {
      metadataElements.push(...generateMetaTags(metaTags));
    }
  });
  return metadataElements;
};
const generateLinks = (links) => {
  return links.map((link) => {
    const { rel, sizes, type, href } = link;
    return jsx("link", { rel, sizes: sizes || "32x32", type: type || "image/png", href, "data-rg": "true" }, rel);
  });
};
const generateMetaTags = (metaTags) => {
  return metaTags.map((metaTag) => {
    const { content, name, property } = metaTag;
    return jsx("meta", { property: property ?? name, content, "data-rg": "true" }, property ?? name);
  });
};
function MetadataProvider({ children, metadataMapping }) {
  const { pathname } = developmentExports.useLocation();
  useEffect(() => {
    const metadata = metadataMapping[pathname];
    if (!metadata)
      return;
    handleInjectMetadata(metadata);
  }, [pathname]);
  const handleInjectMetadata = (metadata) => {
    if (!metadata)
      return;
    if (typeof window !== "undefined") {
      const metaTags = generateMetadata([metadata]);
      const metaTagsToRemove = document.querySelectorAll('meta[data-rg="true"]');
      metaTagsToRemove.forEach((metaTag) => {
        metaTag.remove();
      });
      metaTags.forEach((metaTag) => {
        const metaTagString = ReactDOMServer.renderToStaticMarkup(metaTag);
        document.head.insertAdjacentHTML("beforeend", metaTagString);
      });
      document.title = metadata.title;
      const metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", metadata.description);
      metaDescription.setAttribute("data-rg", "true");
      document.head.appendChild(metaDescription);
    }
  };
  return jsx(Fragment, { children });
}
const defaultMetadata = {
  title: "Not Found",
  description: "Page not found"
};
const getRouter = (routerInstance) => {
  const routes = generateRoutes(routerInstance);
  let router = developmentExports.createBrowserRouter(routes, {
    hydrationData: window.__staticRouterHydrationData
  });
  return () => jsx(developmentExports.RouterProvider, { router });
};
const mergeMetaData = (responseMeta, meta, isLayout = false) => {
  let mergedMetaData = {
    metaTags: [],
    links: [],
    openGraph: {
      url: "",
      image: ""
    },
    twitter: {
      card: "summary_large_image",
      image: "",
      title: ""
    }
  };
  if (!isLayout) {
    mergedMetaData["title"] = responseMeta.title ?? meta.title;
    mergedMetaData["description"] = responseMeta.description ?? meta.description;
  }
  mergedMetaData["openGraph"] = {
    ...meta.openGraph,
    ...responseMeta.openGraph
  };
  mergedMetaData["twitter"] = {
    ...meta.twitter,
    ...responseMeta.twitter
  };
  const metaSet = /* @__PURE__ */ new Set();
  const linkSet = /* @__PURE__ */ new Set();
  if (meta["metaTags"] && Array.isArray(meta.metaTags)) {
    for (const element of meta.metaTags) {
      metaSet.add(element.name ?? element.property);
    }
    if (responseMeta["metaTags"] && Array.isArray(responseMeta.metaTags)) {
      for (const element of responseMeta.metaTags) {
        if (metaSet.has(element.name ?? element.property)) {
          metaSet.delete(element.name ?? element.property);
        }
        mergedMetaData.metaTags.push(element);
      }
    }
    for (const element of metaSet) {
      const metaElement = meta.metaTags.find((el) => el.name === element);
      if (metaElement) {
        mergedMetaData.metaTags.push(metaElement);
      }
    }
  } else {
    mergedMetaData.metaTags = responseMeta.metaTags ?? [];
  }
  if (meta["links"] && Array.isArray(meta.links)) {
    for (const element of meta.links) {
      linkSet.add(element.rel);
    }
    if (responseMeta["links"] && Array.isArray(responseMeta.links)) {
      for (const element of responseMeta.links) {
        if (linkSet.has(element.rel)) {
          linkSet.delete(element.rel);
        }
        mergedMetaData.links.push(element);
      }
    }
    for (const element of linkSet) {
      const linkElement = meta.links.find((el) => el.rel === element);
      if (linkElement) {
        mergedMetaData.links.push(linkElement);
      }
    }
  } else {
    mergedMetaData.links = responseMeta.links ?? [];
  }
  return mergedMetaData;
};
const createLoaderFunction = ({ loader, metadata, isLayout = false }) => {
  return async ({ params, request }) => {
    try {
      if (!loader) {
        return {
          props: {},
          meta: metadata
        };
      }
      const response = await loader({ params, request });
      if (response.redirect) {
        const formData = new FormData();
        formData.append("redirect", response.redirect);
        return new Response(formData, {
          status: 302,
          headers: {
            Location: response.redirect
          }
        });
      }
      return {
        props: response.props,
        meta: mergeMetaData(response.meta ?? {}, metadata, isLayout)
      };
    } catch (error) {
      console.error(error);
      return {
        props: {},
        meta: {
          openGraph: {
            url: "",
            image: ""
          },
          twitter: {
            card: "summary_large_image",
            image: "",
            title: ""
          },
          metaTags: [],
          links: []
        }
      };
    }
  };
};
const generateRoutes = (router, isRoot = true, parentLayout = void 0) => {
  const routes = [];
  const Layout = router.layout;
  const route = {
    path: !isRoot ? router.useParentLayout ? parentLayout.path + (Layout.path === "/" ? "" : Layout.path) : Layout.path : Layout.path,
    errorElement: jsx(ErrorBoundary, {}),
    Component() {
      const defaultData = {
        props: {}
      };
      let { props } = developmentExports.useLoaderData() || defaultData;
      const params = developmentExports.useParams();
      const layoutProps = {
        ...props,
        params
      };
      if (isRoot || !router.useParentLayout) {
        const metadataMapping = generateMetadataMapping(router);
        return jsx(MetadataProvider, { metadataMapping, children: jsx(Layout, { ...layoutProps }) });
      }
      return jsx(Layout, { ...layoutProps });
    },
    async loader({ params, request }) {
      const metadata = {
        openGraph: {
          url: "",
          image: ""
        },
        twitter: {
          card: "summary_large_image",
          image: "",
          title: ""
        },
        ...Layout.metadata
      };
      return createLoaderFunction({
        loader: Layout.loader,
        metadata,
        isLayout: true
      })({
        params,
        request
      });
    },
    children: [],
    nested: router.useParentLayout,
    hydrateFallbackElement: jsx(Fragment, {})
    // TODO: Add hydration fallback
  };
  if (isRoot || router.notFoundComponent) {
    route.children.push({
      path: "*",
      element: router.notFoundComponent ?? jsx(NotFoundPageComponent, {}),
      loader: async () => {
        return {
          props: {},
          meta: defaultMetadata
        };
      }
    });
  }
  const pages = router.pages.map((Page) => {
    const pagePathFormated = Page.path.startsWith("/") && Page.path !== "/" ? Page.path.slice(1) : Page.path;
    const path = Page.path === "/" ? Layout.path : Layout.path.length > 1 ? pagePathFormated : Page.path;
    return {
      path,
      async loader({ params, request }) {
        const metadata = {
          openGraph: {
            url: "",
            image: ""
          },
          twitter: {
            card: "summary_large_image",
            image: "",
            title: ""
          },
          ...Page.metadata
        };
        return createLoaderFunction({ loader: Page.loader, metadata })({
          params,
          request
        });
      },
      Component() {
        const defaultData = {
          props: {
            params: {}
          }
        };
        const loaderData = developmentExports.useLoaderData() || defaultData;
        return jsx(Suspense, { fallback: jsx(Fragment, { children: "Loading" }), children: jsx(RasenganPageComponent, { page: Page, data: loaderData }) });
      },
      errorElement: jsx(ErrorBoundary, {}),
      hydrateFallbackElement: jsx(Fragment, {})
      // TODO: Add hydration fallback
    };
  });
  pages.forEach((page) => {
    route.children.push(page);
  });
  for (const importedRouter of router.routers) {
    const importedRoutes = generateRoutes(importedRouter, false, Layout);
    for (const importedRoute of importedRoutes) {
      if (importedRoute.nested) {
        route.children.push(importedRoute);
      } else {
        routes.push(importedRoute);
      }
    }
  }
  routes.unshift(route);
  return routes;
};
const generateMetadataMapping = (router, isRoot = true, parentLayout = void 0) => {
  const metadataMapping = {};
  const Layout = router.layout;
  if (!Layout.path) {
    throw new Error(`[rasengan] Page path is required for ${Layout.name} layout component`);
  }
  const layoutPath = !isRoot ? router.useParentLayout ? parentLayout.path + (Layout.path === "/" ? "" : Layout.path.startsWith("/") && parentLayout.path === "/" ? Layout.path.slice(1) : Layout.path) : Layout.path : Layout.path;
  router.pages.forEach((Page) => {
    if (!Page.path) {
      throw new Error(`[rasengan] Page path is required for ${Page.name} page component`);
    }
    const pagePathFormated = Page.path.startsWith("/") && Page.path !== "/" && layoutPath.endsWith("/") ? Page.path.slice(1) : Page.path;
    const path = Page.path === "/" ? layoutPath : layoutPath + pagePathFormated;
    metadataMapping[path] = {
      openGraph: {
        url: "",
        image: ""
      },
      twitter: {
        card: "summary_large_image",
        image: "",
        title: ""
      },
      ...Page.metadata
    };
  });
  for (const importedRouter of router.routers) {
    const importedMetadataMapping = generateMetadataMapping(importedRouter, false, Layout);
    Object.assign(metadataMapping, importedMetadataMapping);
    for (const [path, metadata] of Object.entries(importedMetadataMapping)) {
      metadataMapping[path] = metadata;
    }
  }
  return metadataMapping;
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
const RootComponent = ({ router: AppRouterPromise, children = void 0 }) => {
  if (children)
    return children;
  const AppRouter = use(AppRouterPromise);
  let Router = getRouter(AppRouter);
  return jsx(Router, {});
};
const HeadComponent = ({ metadata, assets = [], children = void 0 }) => {
  const metaTags = React.useMemo(() => {
    const metadatas = [];
    if (metadata) {
      if (metadata.page)
        metadatas.push(metadata.page);
      if (metadata.layout)
        metadatas.push(metadata.layout);
    }
    return generateMetadata(metadatas);
  }, [metadata]);
  const { title, description } = useMemo(() => {
    if (!metadata)
      return { title: "Rasengan", description: "" };
    const title2 = metadata.page.title;
    const description2 = metadata.page.description;
    return { title: title2, description: description2 };
  }, [metadata]);
  return jsxs("head", { children: [jsx("meta", { name: "generator", content: "Rasengan.js" }), metaTags, assets, jsx("title", { children: title }), jsx("meta", { name: "description", content: description, "data-rg": "true" }), children] });
};
const BodyComponent = ({ children = void 0, asChild = false, AppContent = void 0 }) => {
  return jsxs("body", { children: [jsx("noscript", { dangerouslySetInnerHTML: {
    __html: `<b>Enable JavaScript to run this app.</b>`
  } }), jsx("div", { id: "root", children: asChild && AppContent }), children] });
};
const ScriptComponent = ({ children = void 0 }) => {
  return jsx(React.Fragment, { children });
};
const DefaultLayout = () => {
  return jsx(React.Fragment, { children: jsx(developmentExports.Outlet, {}) });
};
DefaultLayout.path = "/";
const logo = "/assets/logo-CBpp0gc6.svg";
const LazyLoadedImage = React.lazy(() => import("./image-BUR2KezX.js"));
const LoadingFallback = ({ width, height }) => jsx("div", { style: {
  width,
  height,
  backgroundColor: "#e5e5e5"
} });
const LazyImage = ({ src, alt, loading = "lazy", mode = "wave", ...props }) => {
  return jsx(React.Suspense, { fallback: jsx(LoadingFallback, { width: props.width || 200, height: props.height || 200 }), children: jsx(LazyLoadedImage, { src: typeof src === "string" ? src : src.uri, alt, loading, mode, ...props }) });
};
const I18nContext = createContext({
  locale: "en",
  locales: [],
  resources: {},
  setLocale: () => {
  }
});
function useLocale() {
  const { locale, locales: locales2, setLocale: updateLocale } = use(I18nContext);
  const location = developmentExports.useLocation();
  const navigate = developmentExports.useNavigate();
  const setLocale = (newLocale) => {
    if (!locales2.includes(newLocale)) {
      throw new Error(`Locale ${newLocale} is not supported`);
    }
    const pathWithoutLocale = location.pathname.replace(`/${locale}`, "");
    navigate(`/${newLocale}${pathWithoutLocale}`, {
      replace: true
    });
    updateLocale(newLocale);
  };
  return {
    locale,
    setLocale
  };
}
const checkResources = (resources2) => {
  if (Object.keys(resources2).length === 0) {
    throw new Error("[rasengan:i18n]: No resources found");
  }
  Object.entries(resources2).forEach(([locale, resource]) => {
    if (!resource["translation"]) {
      throw new Error(`[rasengan:i18n]: No translation key found for locale ${locale}`);
    }
  });
};
const useTranslations = (namespace) => {
  const { resources: resources2, locale } = use(I18nContext);
  const t = (key) => {
    checkResources(resources2);
    return resources2[locale]["translation"][key] || key;
  };
  return t;
};
const translation$2 = { "welcome": "Welcome to", "action": "To get started, edit the file", "code": "src/app/home.page.tsx", "poweredBy": "Powered by", "documentation": "Documentation", "learn": "Learn", "examples": "Examples", "community": "Community", "documentationDescription": "Find in-depth information about Rasengan features and API.", "readTheDocs": "Read the Docs", "learnDescription": "Learn about Rasengan in an interactive course with quizzes!", "takeTheCourse": "Take the Course", "examplesDescription": "Discover and deploy boilerplate example Rasengan projects.", "viewExamples": "View Examples", "communityDescription": "Join our community to ask questions, share knowledge, and collaborate on projects.", "joinTheCommunity": "Join the Community" };
const en = {
  translation: translation$2
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: en,
  translation: translation$2
}, Symbol.toStringTag, { value: "Module" }));
const translation$1 = { "welcome": "Bienido a Rasengan" };
const es = {
  translation: translation$1
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: es,
  translation: translation$1
}, Symbol.toStringTag, { value: "Module" }));
const translation = { "welcome": "Bienvenue sur", "action": "Pour commencer, editer le fichier", "code": "src/app/home.page.tsx", "poweredBy": "Propulsé par", "documentation": "Documentation", "learn": "Apprentissage", "examples": "Exemples", "community": "Communauté", "documentationDescription": "Trouvez des informations approfondies sur les fonctionnalités et l'API de Rasengan.", "readTheDocs": "Lire la documentation", "learnDescription": "Apprenez à utiliser Rasengan avec un cours interactif et des quiz!", "takeTheCourse": "Prenez le cours", "examplesDescription": "Découvrez et déploiement des exemples de projets Rasengan.", "viewExamples": "Voir les exemples", "communityDescription": "Rejoignez notre communauté pour poser des questions, partager votre connaissance et collaborer sur des projets.", "joinTheCommunity": "Rejoignez la communauté" };
const fr = {
  translation
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fr,
  translation
}, Symbol.toStringTag, { value: "Module" }));
const modules = /* @__PURE__ */ Object.assign({
  "/translations/en.json": __vite_glob_0_0,
  "/translations/es.json": __vite_glob_0_1,
  "/translations/fr.json": __vite_glob_0_2
});
const config = { "defaultLocale": "fr", "detection": { "order": ["path"] }, "resources": { "source": "/translations" } };
const resources = {};
const locales = [];
for (const [filePath, mod] of Object.entries(modules)) {
  const lang = (_a = filePath.split("/").pop()) == null ? void 0 : _a.split(".")[0];
  if (!lang) {
    continue;
  }
  resources[lang] = mod.default;
  locales.push(lang);
}
const i18n = {
  resources,
  config,
  locales
};
function RasenganI18nProvider({ children }) {
  const [locale, setLocale] = useState(i18n.config.defaultLocale);
  console.log({ i18n });
  return jsx(I18nContext, { value: {
    locale,
    locales: i18n.locales,
    resources: i18n.resources,
    setLocale
  }, children });
}
const Home = () => {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();
  return /* @__PURE__ */ jsxs("section", { className: "w-full h-full bg-white flex flex-col items-center py-8 px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex justify-between items-center w-full", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "px-4 py-2 hover:bg-primary hover:text-white transition-colors border border-[#EFEFEF] rounded-md",
          onClick: () => setLocale(locale === "en" ? "fr" : "en"),
          children: locale === "en" ? "English" : "Français"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { children: t("poweredBy") }),
        /* @__PURE__ */ jsx(CustomLink, { to: "https://beta.rasengan.dev", target: "_blank", children: /* @__PURE__ */ jsx(LazyImage, { src: logo, alt: "Rasengan logo", width: 120, height: 40 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mt-4", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-black text-[3rem] md:text-[4rem] text-center font-urbanist", children: [
        /* @__PURE__ */ jsx("span", { children: t("welcome") }),
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Rasengan" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg mt-4", children: [
        t("action"),
        " ",
        /* @__PURE__ */ jsx("code", { className: "text-sm ml-2 font-medium", children: t("code") })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-4 rounded-md border-[1px] border-[#EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-urbanist", children: t("documentation") }),
        /* @__PURE__ */ jsx("p", { className: "my-2", children: t("documentationDescription") }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://beta.rasengan.dev/docs",
            target: "_blank",
            className: "mt-auto text-primary font-bold",
            children: t("readTheDocs")
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-4 rounded-md border-[1px] border-[#EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-urbanist", children: t("learn") }),
        /* @__PURE__ */ jsx("p", { className: "my-2", children: t("learnDescription") }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://beta.rasengan.dev/learn",
            target: "_blank",
            className: "mt-auto text-primary font-bold",
            children: t("takeTheCourse")
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-4 rounded-md border-[1px] border-[#EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-urbanist", children: t("examples") }),
        /* @__PURE__ */ jsx("p", { className: "my-2", children: t("examplesDescription") }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://github.com/rasengan-dev/rasenganjs-examples",
            target: "_blank",
            className: "mt-auto text-primary font-bold",
            children: t("viewExamples")
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-4 rounded-md border-[1px] border-[#EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-urbanist", children: t("community") }),
        /* @__PURE__ */ jsx("p", { className: "my-2", children: t("communityDescription") }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://github.com/rasengan-dev/rasenganjs/discussions",
            target: "_blank",
            className: "text-primary font-bold mt-auto",
            children: t("joinTheCommunity")
          }
        )
      ] })
    ] })
  ] });
};
Home.path = "/home";
Home.metadata = {
  title: "Home",
  description: "Home page"
};
export {
  BodyComponent as B,
  HeadComponent as H,
  RootComponent as R,
  ScriptComponent as S,
  RasenganI18nProvider as a,
  RouterComponent as b,
  Home as c,
  defineRouter as d
};
