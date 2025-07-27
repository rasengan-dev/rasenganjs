import { jsx, jsxs } from "react/jsx-runtime";
import React, { useMemo, createElement, useState, useRef, useEffect, useCallback } from "react";
import { renderToString } from "react-dom/server";
import "./vendor-DsEjlbjf.js";
const generateAnchor = (title) => {
  const regex = new RegExp("^\\[#.+\\]");
  const childrenArray = title.split(" [#");
  let lastWord = "";
  let remainingWords = "";
  let id = "";
  if (childrenArray.length > 1 && childrenArray.at(-1).includes("]") && regex.test(`[#${childrenArray.at(-1)}`)) {
    lastWord = childrenArray.pop();
  }
  if (lastWord) {
    id = lastWord.replace("]", "").split(" ").join("-").toLowerCase();
    remainingWords = childrenArray[0];
  } else {
    id = title.split(" ").join("-").toLowerCase();
    remainingWords = title;
  }
  return {
    id,
    text: remainingWords
  };
};
const CodeBlock = ({ children, className = "", ...rest }) => {
  const language = rest["data-language"] || "";
  const numbers = rest["data-line-numbers"];
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2e3);
    return () => clearTimeout(timer);
  }, [copied]);
  const handleCopy = () => {
    const content = renderToString(children);
    const code = extractTextFromHTML(content);
    navigator.clipboard.writeText(code);
    setCopied(true);
  };
  const extractTextFromHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };
  if (!language) {
    return jsx(SimpleBlock, { children });
  }
  return jsxs("div", { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), children: [hover ? jsx("button", { className: "copy-button", onClick: handleCopy, children: copied ? jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "16", height: "16", color: "#f0f0f0", fill: "none", children: [jsx("path", { d: "M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z", stroke: "currentColor", strokeWidth: "1.5" }), jsx("path", { d: "M8 12.5L10.5 15L16 9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }) : jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "16", height: "16", color: "#f0f0f0", fill: "none", children: [jsx("path", { d: "M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), jsx("path", { d: "M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }) }) : jsx("span", { className: "lang", children: language }), jsx("code", { className: `${className} code-block`, "data-line-numbers": numbers !== void 0 ? "" : void 0, children })] });
};
const SimpleBlock = ({ children }) => {
  return jsx("code", { className: "simple-block", children });
};
const Table = ({ children }) => {
  return jsx("div", { className: "ra-table-wrapper", children: jsx("table", { children }) });
};
const Heading = ({ variant }) => {
  return ({ children }) => {
    const { text, id } = useMemo(() => {
      const { id: id2, text: text2 } = generateAnchor(children);
      return {
        id: variant === "h1" ? void 0 : id2,
        text: text2
      };
    }, [children]);
    const heading = createElement(variant, {
      id,
      className: "heading",
      children: text
    });
    const handleClick = (e, id2) => {
      e.preventDefault();
      const element = document.getElementById(id2);
      element == null ? void 0 : element.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id2}`);
    };
    return jsxs("div", { className: "ra-heading-wrapper", children: [heading, id && jsx("a", { href: `#${id}`, onClick: (e) => handleClick(e, id), children: jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24", color: "#ffffff", fill: "none", children: [jsx("path", { d: "M10 13.229C10.1416 13.4609 10.3097 13.6804 10.5042 13.8828C11.7117 15.1395 13.5522 15.336 14.9576 14.4722C15.218 14.3121 15.4634 14.1157 15.6872 13.8828L18.9266 10.5114C20.3578 9.02184 20.3578 6.60676 18.9266 5.11718C17.4953 3.6276 15.1748 3.62761 13.7435 5.11718L13.03 5.85978", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }), jsx("path", { d: "M10.9703 18.14L10.2565 18.8828C8.82526 20.3724 6.50471 20.3724 5.07345 18.8828C3.64218 17.3932 3.64218 14.9782 5.07345 13.4886L8.31287 10.1172C9.74413 8.62761 12.0647 8.6276 13.4959 10.1172C13.6904 10.3195 13.8584 10.539 14 10.7708", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })] }) })] });
  };
};
const TableOfContents = ({ items }) => {
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4
      // Trigger when 40% of the section is visible
    };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          if (rect.top >= 0) {
            setActiveId(entry.target.id);
          }
        }
      });
      const sortedEntries = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);
      if (sortedEntries.length > 0) {
        setActiveId(sortedEntries[0].target.id);
      }
    }, observerOptions);
    items.forEach((item) => {
      const element = document.getElementById(item.anchor.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
      item.children.forEach((item2) => {
        const element2 = document.getElementById(item2.anchor.id);
        if (element2 && observerRef.current) {
          observerRef.current.observe(element2);
        }
      });
    });
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items]);
  const renderTOCItems = useCallback((items2) => {
    return items2.map((item, index) => jsxs(React.Fragment, { children: [jsx(Item, { item, activeId, onActive: setActiveId }), item.children && item.children.length > 0 && jsx("div", { className: "toc-item--children", children: renderTOCItems(item.children) })] }, index));
  }, [items, activeId]);
  return jsxs("div", { className: "table-of-contents", children: [jsx("h2", { className: "title", children: "ON THIS PAGE" }), jsx("div", { className: "items-container", children: renderTOCItems(items) }), jsx("div", { className: "w-full h-[500px] mt-10 bg-red-200", style: { height: 500 } })] });
};
const Item = ({ item, activeId, onActive }) => {
  const handleClick = (e, id) => {
    e.preventDefault();
    onActive(id);
    const element = document.getElementById(id);
    element == null ? void 0 : element.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", `#${id}`);
  };
  return jsx("div", { className: `
          toc-item
          ${item.level === 2 ? "level2" : "level3"} 
          ${activeId === item.anchor.id ? "active" : ""}
        `, children: jsx("a", { href: `#${item.anchor.id}`, onClick: (e) => handleClick(e, item.anchor.id), children: jsx("div", { className: "toc-item--title", children: item.anchor.text }) }) }, item.anchor.id);
};
const MDXRenderer = ({ children: MDXContent, className }) => {
  return jsxs("section", { className: MDXContent.toc ? "rasengan-wrapper-with-toc" : "rasengan-wrapper", children: [jsx("section", { className: "rasengan-markdown-body " + className, children: jsx(MDXContent, { components: {
    code: CodeBlock,
    table: Table,
    h1: Heading({ variant: "h1" }),
    h2: Heading({ variant: "h2" }),
    h3: Heading({ variant: "h3" }),
    h4: Heading({ variant: "h4" }),
    h5: Heading({ variant: "h5" }),
    h6: Heading({ variant: "h6" })
  } }) }), MDXContent.toc && jsx("aside", { className: "rasengan-toc", children: jsx(TableOfContents, { items: MDXContent.toc }) })] });
};
export {
  MDXRenderer,
  TableOfContents
};
