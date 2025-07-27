import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
const image = ({ src, alt, style, fallbackSrc, loadingOnViewport = true, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const imageContainerRef = useRef(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setStartLoading(true);
      return;
    }
    if (!loadingOnViewport) {
      setStartLoading(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStartLoading(true);
      }
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    });
    const imageContainer = imageContainerRef.current;
    if (imageContainer) {
      observer.observe(imageContainer);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!startLoading)
      return;
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.onerror = () => {
      if (fallbackSrc) {
        img.src = fallbackSrc;
        img.onerror = null;
      }
      setLoaded(true);
    };
    img.src = src;
    setImageSrc(img);
    return () => {
      img.onload = null;
    };
  }, [src, startLoading, fallbackSrc]);
  return jsx(Fragment, { children: jsxs("div", { ref: imageContainerRef, style: {
    width: props.width || "auto",
    height: props.height || "auto",
    overflow: "hidden",
    position: "relative",
    ...style
  }, className: props.className, children: [
    // If image is not loaded, show loading fallback
    props.loading === "lazy" && !loaded && jsx("div", { style: {
      width: "300%",
      position: "absolute",
      top: 0,
      bottom: 0,
      backgroundColor: "#e5e5e5"
    }, className: `${props.loading === "lazy" ? props.mode === "blur" ? "blur-container" : "wave-container wave" : ""}` }),
    jsx("img", { src: imageSrc == null ? void 0 : imageSrc.src, alt, ...props, style: {
      objectFit: props.objectfit || "cover",
      width: props.width || "100%",
      height: props.height || "100%"
    }, hidden: props.loading === "lazy" ? !loaded : false })
  ] }) });
};
export {
  image as default
};
