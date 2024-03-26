export type NotFoundComponentContainerProps = {
  content: React.FC;
};

export type MetadataLink = {
  rel: string;
  type?: string;
  sizes?: string;
  href: string;
};

export type MetadataTag = {
  name?: string;
  property?: string;
  content: string;
};

export type Metadata = {
  openGraph?: {
    type?: string;
    title?: string;
    description?: string;
    url: string;
    image: string;
    width?: string;
    height?: string;
  };

  twitter?: {
    card: "summary_large_image" | "summary";
    image: string;
    title: string;
    description?: string;
    creator?: string;
    site?: string;
  };

  links?: Array<MetadataLink>;

  metadataTags?: Array<MetadataTag>;
}