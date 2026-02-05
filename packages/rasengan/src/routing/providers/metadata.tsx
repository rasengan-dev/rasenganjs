import { useLocation, useMatches } from 'react-router';
import { useEffect } from 'react';
import { Metadata } from '../types.js';
import { generateMetadata } from '../utils/generate-metadata.js';
import ReactDOMServer from 'react-dom/server';

export default function MetadataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const routes = useMatches();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    (async () => {
      const loadersData = routes.map(
        (route) => route.loaderData ?? route.data // Normally the route.data is deprecated, we need to consider route.loaderData, but in some cases, route.loaderData is undefined and I don't know why, that's why we are using route.data instead
      ) as Array<{
        meta: Metadata;
      }>;

      handleInjectMetadata(loadersData.filter(Boolean)); // Sometimes, loadersData contains `undefined` values, the filter(Boolean) is there to remove all falsy values
    })();
  }, [location]);

  /**
   * This function is responsible to inject the correct metadata on client routing based on the current URL of the page
   * @param loadersData The metadata coming from loaders functions
   * @returns
   */
  const handleInjectMetadata = (loadersData: Array<{ meta: Metadata }>) => {
    // We generate the metadata
    const metadatas = generateMetadata(
      loadersData.map((item) => (item.meta ? item.meta : {}))
    );

    // We get the last metadata
    // This is the metadata of the page
    const leaf = loadersData.at(-1);
    const leafMetadata = leaf ? leaf.meta : {};

    // Find all meta tags with data-rg attribute and remove them
    const metaTagsToRemove = document.querySelectorAll('meta[data-rg="true"]');

    metaTagsToRemove.forEach((metaTag) => {
      metaTag.remove();
    });

    // Inject the meta tags
    metadatas.forEach((metaTag) => {
      // Convert React element to string
      const metaTagString = ReactDOMServer.renderToStaticMarkup(metaTag);

      document.head.insertAdjacentHTML('beforeend', metaTagString);
    });

    if (!leafMetadata) return;

    // Change the title of the page
    document.title = leafMetadata.title;

    // Change the description of the page
    const metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', leafMetadata.description);
    metaDescription.setAttribute('data-rg', 'true');
    document.head.appendChild(metaDescription);
  };

  return <>{children}</>;
}
