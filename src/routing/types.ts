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

export type Metadata = MetadataTag | MetadataLink;
