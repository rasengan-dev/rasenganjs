import { jsx, jsxs } from "react/jsx-runtime";
import minpath from "node:path";
import fs from "fs/promises";
import React from "react";
import { S as ScriptComponent, B as BodyComponent, R as RootComponent, H as HeadComponent } from "./assets/page-home-BaJuIrl7.js";
import { posix, join } from "path/posix";
import { renderToPipeableStream } from "react-dom/server";
import "./assets/vendor-DsEjlbjf.js";
const resolvePath = (pathValue) => {
  const isWindows = process.platform === "win32";
  if (isWindows) {
    return `file:///${minpath.normalize(pathValue)}`;
  }
  return minpath.normalize(pathValue);
};
const extensions = [
  ".mjs",
  ".js",
  ".mts",
  ".ts",
  ".jsx",
  ".tsx",
  ".json"
];
const loadModuleSSR = async (path) => {
  try {
    let modulePath = path;
    const moduleExtension = path.split(".").pop();
    if (!moduleExtension || !extensions.includes(`.${moduleExtension}`)) {
      const { path: newPath } = await findModulePath(path);
      modulePath = newPath;
    }
    const module = await import(
      /* @vite-ignore */
      resolvePath(modulePath)
    );
    return module;
  } catch (error) {
    throw new Error(error);
  }
};
const findModulePath = async (path) => {
  try {
    let modulePath = path;
    let rightExtension = "";
    const moduleExtension = path.split(".").pop();
    if (!moduleExtension || !extensions.includes(`.${moduleExtension}`)) {
      for (let ext of extensions) {
        const newModulePath = `${modulePath}${ext}`;
        try {
          await fs.access(newModulePath);
          modulePath = newModulePath;
          rightExtension = ext;
          break;
        } catch (error) {
          continue;
        }
      }
      if (modulePath === path) {
        throw new Error(`Module "${path}" not found`);
      }
    }
    return {
      path: modulePath,
      extension: rightExtension
    };
  } catch (error) {
    throw new Error(error);
  }
};
var ServerMode;
(function(ServerMode2) {
  ServerMode2["Development"] = "development";
  ServerMode2["Production"] = "production";
  ServerMode2["Test"] = "test";
})(ServerMode || (ServerMode = {}));
function isServerMode(value) {
  return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
}
const TemplateLayout = ({ StaticRouterComponent, metadata, assets, App, Template, isSpaMode = false }) => {
  let viteScripts = jsx(React.Fragment, {});
  let otherScripts = jsx(React.Fragment, {});
  if (isServerMode(process.env.NODE_ENV) && process.env.NODE_ENV === ServerMode.Development) {
    const refreshScript = `
      import RefreshRuntime from "/@react-refresh"
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    `;
    viteScripts = jsxs(React.Fragment, { children: [jsx("script", { type: "module", src: "/@vite/client" }), jsx("script", { type: "module", dangerouslySetInnerHTML: { __html: refreshScript } })] });
  }
  if (isSpaMode) {
    otherScripts = jsxs(React.Fragment, { children: [jsx("script", { type: "module", dangerouslySetInnerHTML: {
      __html: `window.__RASENGAN_SPA_MODE__ = true;`
    } }), !assets && jsx("script", { type: "module", src: "/src/index", async: true })] });
  } else {
    otherScripts = jsx(React.Fragment, { children: jsx("script", { type: "module", dangerouslySetInnerHTML: {
      __html: `window.__RASENGAN_SPA_MODE__ = false;`
    } }) });
  }
  return jsx(Template, { Head: ({ children }) => jsxs(HeadComponent, { metadata, assets, children: [viteScripts, otherScripts, children] }), Body: ({ children }) => jsx(BodyComponent, { asChild: App ? true : false, AppContent: App && jsx(App, { Component: RootComponent, children: StaticRouterComponent }), children }), Script: ({ children }) => jsx(ScriptComponent, { children }) });
};
const renderToStream = async (Component, res) => {
  const ABORT_DELAY = 1e4;
  let bootstrap = [];
  if (isServerMode(process.env.NODE_ENV) && process.env.NODE_ENV === ServerMode.Development) {
    bootstrap.push("/src/index");
  }
  return new Promise(async (resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(Component, {
      bootstrapModules: bootstrap,
      onShellReady() {
        shellRendered = true;
        resolve(res);
        pipe(res);
      },
      onShellError(error) {
        reject(error);
      },
      onError(error) {
        if (shellRendered) {
          console.error(error);
        }
      }
    });
    setTimeout(abort, ABORT_DELAY);
  });
};
const render = async (StaticRouterComponent, res, options) => {
  const { metadata, assets, buildOptions } = options;
  const rootPath = process.cwd();
  let App;
  let Template;
  if (buildOptions) {
    App = (await loadModuleSSR(posix.join(buildOptions.buildDirectory, buildOptions.serverPathDirectory, "main.js"))).default;
    Template = (await loadModuleSSR(join(buildOptions.buildDirectory, buildOptions.serverPathDirectory, "template.js"))).default;
  } else {
    App = (await loadModuleSSR(`${rootPath}/src/main`)).default;
    Template = (await loadModuleSSR(`${rootPath}/src/template`)).default;
  }
  await renderToStream(jsx(TemplateLayout, { StaticRouterComponent, metadata, assets, App, Template }), res);
};
export {
  render
};
