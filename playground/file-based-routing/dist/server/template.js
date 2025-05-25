import { jsxs, jsx } from "react/jsx-runtime";
function Template({ Head, Body, Script }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/svg+xml", href: "/rasengan.svg" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" })
    ] }),
    /* @__PURE__ */ jsx(Body, { children: /* @__PURE__ */ jsx(Script, {}) })
  ] });
}
export {
  Template as default
};
