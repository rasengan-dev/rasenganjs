export type NotFoundComponentContainerProps = {
  content: React.FC;
};

export type MetadataLink = {
  rel: string;
  type?: string;
  sizes?: string;
  href: string;
};

export type MetaTag = {
  name?: string;
  property?: string;
  content: string;
};

export type Metadata = {
  /**
   * Title of the pate
   */
  title?: string;

  /**
   * Description of the page
   */
  description?: string;

  /**
   * Configuring link preview on social media like facebook, linkedin, etc.
   */
  openGraph?: {
    type?: string;
    title?: string;
    description?: string;
    url: string;
    image: string;
    width?: string;
    height?: string;
  };

  /**
   * Configuring link preview on twitter
   */
  twitter?: {
    card: "summary_large_image" | "summary";
    image: string;
    title: string;
    description?: string;
    creator?: string;
    site?: string;
  };

  /**
   * Configuring link tags to define icons and others
   */
  links?: Array<MetadataLink>;

  /**
   * Other metadata tags
   */
  metaTags?: Array<MetaTag>;
}