import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import React, { useEffect, Suspense, use, useMemo } from "react";
import { d as developmentExports } from "./vendor-CsqfrH1N.js";
import ReactDOMServer from "react-dom/server";
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
export {
  BodyComponent as B,
  DefaultLayout as D,
  HeadComponent as H,
  RootComponent as R,
  ScriptComponent as S
};
