import { useEffect, useRef, useState } from 'react';
import { ImageProps } from '../types/index.js';

export default ({
  src,
  alt,
  style,
  fallbackSrc,
  loadingOnViewport = true,
  ...props
}: ImageProps & React.HTMLProps<HTMLImageElement>) => {
  // Local state
  const [loaded, setLoaded] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<HTMLImageElement>();

  // Reference
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  // Effects

  /**
   * Loads an image when it is in the viewport using the IntersectionObserver API.
   * This effect is used to optimize image loading and reduce initial page load times.
   *
   * The effect first checks if the IntersectionObserver API is supported in the current browser.
   * If not, it sets the `startLoading` state to `true` to load the image immediately.
   *
   * If the API is supported, the effect creates a new IntersectionObserver instance and observes
   * the image element. When the image enters the viewport (i.e., the `isIntersecting` property
   * of the observed entry is `true`), the `startLoading` state is set to `true` to trigger the
   * image loading process. The observer is then disconnected to stop observing the element.
   */
  useEffect(() => {
    // Load image when it is in the viewport only

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setStartLoading(true);
      return;
    }

    if (!loadingOnViewport) {
      setStartLoading(true);

      return;
    }

    // Create new IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If image is in the viewport, load it
        if (entry.isIntersecting) {
          setStartLoading(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    // Observe the image element
    const imageContainer = imageContainerRef.current;

    if (imageContainer) {
      observer.observe(imageContainer);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Preloads an image and updates the component's state when the image is loaded.
   *
   * This effect is triggered when the `src` or `startLoading` props change. It creates a new `Image` object, sets its `src` to the provided `src` prop, and listens for the `onload` event to update the component's state when the image is loaded.
   *
   * The effect also cleans up the `onload` event listener when the component is unmounted.
   *
   * @param src - The URL of the image to preload.
   * @param startLoading - A boolean that triggers the preloading process when true.
   */
  useEffect(() => {
    if (!startLoading) return;
    const isDev = (import.meta as any).env.DEV;
    if (isDev && (!props.width || !props.height))
      console.warn(
        '[rasengan]: Add width and height props to Image component for a better UI experience.'
      );

    // Preload image
    const img = new Image();

    // When image is loaded, update state
    img.onload = () => {
      setLoaded(true);
    };
    /**
     * Event handler for when an error occurs while loading the image.
     * If a `fallbackSrc` is provided, it sets the `src` of the image to the fallback
     * and sets the `onerror` event handler to null so that it is not called again.
     * Finally, it sets the `loaded` state to `true` to indicate that the image has
     * finished loading (successfully or not).
     */
    img.onerror = () => {
      if (fallbackSrc) {
        img.src = fallbackSrc;
        img.onerror = null;
      } else {
        const isDev = (import.meta as any).env.DEV;
        if (isDev)
          console.warn(
            '[rasengan]: Image failed to load. Add a fallbackSrc prop to Image component to handle this.'
          );
      }
      setLoaded(true);
    };

    img.src = src as string;

    // Save image to state
    setImageSrc(img);

    // Clean up
    return () => {
      img.onload = null;
    };
  }, [src, startLoading, fallbackSrc]);

  return (
    <>
      <div
        ref={imageContainerRef}
        style={{
          width: props.width || 'auto',
          height: props.height || 'auto',
          overflow: 'hidden',
          position: 'relative',
          ...style,
        }}
        className={props.className}
      >
        {
          // If image is not loaded, show loading fallback
          props.loading === 'lazy' && !loaded && (
            <div
              style={{
                width: '300%',
                position: 'absolute',
                top: 0,
                bottom: 0,
                backgroundColor: '#e5e5e5',
              }}
              className={`${
                props.loading === 'lazy'
                  ? props.mode === 'blur'
                    ? 'blur-container'
                    : 'wave-container wave'
                  : ''
              }`}
            ></div>
          )
        }

        <img
          src={imageSrc?.src}
          alt={alt}
          {...props}
          style={{
            objectFit: props.objectfit || 'cover',
            width: props.width || '100%',
            height: props.height || '100%',
          }}
          hidden={props.loading === 'lazy' ? !loaded : false}
        />
      </div>
    </>
  );
};
