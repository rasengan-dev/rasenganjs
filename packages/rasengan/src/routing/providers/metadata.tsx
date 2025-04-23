import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { Metadata } from '../types.js';
import { generateMetadata } from '../utils/generate-metadata.js';
import ReactDOMServer from 'react-dom/server';

export default function MetadataProvider({
  children,
  metadataMapping,
}: {
  children: React.ReactNode;
  metadataMapping: Record<string, Metadata>;
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = metadataMapping[pathname];

    if (!metadata) return;

    handleInjectMetadata(metadata);
  }, [pathname]);

  const handleInjectMetadata = (metadata: Metadata) => {
    if (!metadata) return;

    // Check if we are on the browser
    if (typeof window !== 'undefined') {
      const metaTags = generateMetadata([metadata]);

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

      // Change the title of the page
      document.title = metadata.title;

      // Change the description of the page
      const metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', metadata.description);
      metaDescription.setAttribute('data-rg', 'true');
      document.head.appendChild(metaDescription);
    }
  };

  return <>{children}</>;
}
