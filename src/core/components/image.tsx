import { useEffect, useState } from "react";
import { ImageProps } from "../types";

export default ({ src, alt, ...props }: ImageProps) => {
  // Load styles here with esm
  require("../styles/image.css");

  // Local state
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<HTMLImageElement>();

  // Effects
  useEffect(() => {
    // Preload image
    const img = new Image();

    // When image is loaded, update state
    img.onload = () => {
      console.log("Image loaded");
      setLoaded(true);
    };

    img.src =
      src && (src as { uri: string }).uri
        ? (src as { uri: string }).uri
        : (src as string);

    // Save image to state
    setImageSrc(img);

    // Clean up
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div
      style={{
        width: props.width || imageSrc?.width || 200,
        height: props.height || imageSrc?.height || 200,
        overflow: "hidden",
        position: "relative",
      }}
      className={props.className}
    >
      {
        // If image is not loaded, show loading fallback
        props.loading === "lazy" && !loaded && (
          <div
            style={{
              width: "300%",
              height: props.height || imageSrc?.height || 200,
              backgroundColor: "#e5e5e5",
            }}
            className={`${
              props.loading === "lazy"
                ? props.loadingType === "blur"
                  ? "blur-container"
                  : "wave-container wave"
                : ""
            }`}
          ></div>
        )
      }

      <img
        src={imageSrc?.src}
        alt={alt}
        {...props}
        style={{
          objectFit: props.objectFit || "cover",
          width: "100%",
          height: "100%",
        }}
        hidden={props.loading === "lazy" ? !loaded : false}
      />
    </div>
  );
};

// Fallback component to show while the image is loading
export const LoadingFallback = () => <div>Loading...</div>;
