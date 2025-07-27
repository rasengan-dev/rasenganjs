import { jsx } from "react/jsx-runtime";
import AppRouter from "./app.router.js";
import { a as RasenganI18nProvider } from "./assets/page-home-BaJuIrl7.js";
import "react";
import "react-dom/server";
import "./assets/vendor-DsEjlbjf.js";
function App({ Component, children }) {
  return /* @__PURE__ */ jsx(RasenganI18nProvider, { children: /* @__PURE__ */ jsx(Component, { router: AppRouter, children }) });
}
export {
  App as default
};
