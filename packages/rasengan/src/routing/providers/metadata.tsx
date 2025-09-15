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
      const loadersData = routes.map((route) => route.loaderData) as Array<{
        meta: Metadata;
      }>;

      await handleApplyMetadata(loadersData);
    })();
  }, [location]);

  const handleApplyMetadata = async (
    loadersData: Array<{ meta: Metadata }>
  ) => {
    // We generate the metadata
    const metadatas = generateMetadata(loadersData.map((item) => item.meta));

    // We get the last metadata
    // This is the metadata of the page
    const leafMetadata = loadersData.at(-1)?.meta;

    handleInjectMetadata(metadatas, leafMetadata);
  };

  const handleInjectMetadata = (
    metaTags: React.JSX.Element[],
    leafMetadata?: Metadata
  ) => {
    // Check if we are on the browser
    if (typeof window !== 'undefined') {
      // Find all meta tags with data-rg attribute and remove them
      const metaTagsToRemove = document.querySelectorAll(
        'meta[data-rg="true"]'
      );

      metaTagsToRemove.forEach((metaTag) => {
        metaTag.remove();
      });

      // Inject the meta tags
      metaTags.forEach((metaTag) => {
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
    }
  };

  return <>{children}</>;
}
