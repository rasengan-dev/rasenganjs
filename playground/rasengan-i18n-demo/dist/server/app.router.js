import { jsx } from "react/jsx-runtime";
import { d as defineRouter, b as RouterComponent, c as Home } from "./assets/page-home-BaJuIrl7.js";
import "react";
import "react-dom/server";
import { d as developmentExports } from "./assets/vendor-DsEjlbjf.js";
const AppLayout = () => {
  return /* @__PURE__ */ jsx(developmentExports.Outlet, {});
};
AppLayout.path = "/:locale";
class AppRouter extends RouterComponent {
}
const AppRouter$1 = defineRouter({
  imports: [],
  layout: AppLayout,
  pages: [Home]
})(AppRouter);
export {
  AppRouter$1 as default
};
