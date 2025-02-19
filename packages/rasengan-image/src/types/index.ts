import React, { CSSProperties } from 'react';

/**
 * Defines the props for an Image component.
 *
 * @property {string | { uri: string }} src - The source of the image, either a string URL or an object with a `uri` property.
 * @property {string} alt - The alternative text for the image.
 * @property {CSSProperties["width"]} [width] - The width of the image.
 * @property {CSSProperties["height"]} [height] - The height of the image.
 * @property {React.HTMLProps<HTMLDivElement>["className"]} [className] - The CSS class name to apply to the image container.
 * @property {React.HTMLProps<HTMLDivElement>["style"]} [style] - The inline styles to apply to the image container.
 * @property {"lazy" | "eager"} [loading] - The loading strategy for the image, either "lazy" or "eager".
 * @property {"blur" | "wave"} [mode] - The loading mode for the image, either "blur" or "wave".
 * @property {CSSProperties["objectFit"]} [objectfit] - The object-fit property for the image.
 * @property {boolean} [loadingOnViewport] - Whether to load the image when it comes into the viewport.
 */
export type ImageProps = {
  src: string | { uri: string };
  alt: string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  className?: React.HTMLProps<HTMLDivElement>['className'];
  style?: React.HTMLProps<HTMLDivElement>['style'];
  loading?: 'lazy' | 'eager';
  mode?: 'blur' | 'wave';
  objectfit?: CSSProperties['objectFit'];
  loadingOnViewport?: boolean;
  fallbackSrc?: string;
};

/**
 * Defines the props for a loading fallback component.
 * @property {CSSProperties["width"]} [width] - The width of the loading fallback.
 * @property {CSSProperties["height"]} [height] - The height of the loading fallback.
 */
export type LoadingFallbackProps = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};
