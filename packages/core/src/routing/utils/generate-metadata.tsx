import { Metadata, MetadataLink, MetaTag } from "../types";

/**
 * This function generates metadata useful for pages to show images when sharing on social media
 * @param {Metadata[]} metadatas
 */
export const generateMetadata = (metadatas: Metadata[]) => {
	const metadataElements: JSX.Element[] = [];

	metadatas.forEach((metadata) => {
		const { openGraph, twitter, links, metaTags } = metadata;

		// Handling openGraph
		if (openGraph) {
			const { title, description, url, image, width, height, type } = openGraph;

			if (title) {
				metadataElements.push(
					<meta key='og:title' property='og:title' content={title} />
				);
			}

			if (description) {
				metadataElements.push(
					<meta
						key='og:description'
						property='og:description'
						content={description}
					/>
				);
			}

			if (url) {
				metadataElements.push(
					<meta key='og:url' property='og:url' content={url} />
				);
			}

			if (image) {
				metadataElements.push(
					<meta key='og:image' property='og:image' content={image} />
				);
			}

			if (width) {
				metadataElements.push(
					<meta
						key='og:image:width'
						property='og:image:width'
						content={width}
					/>
				);
			}

			if (height) {
				metadataElements.push(
					<meta
						key='og:image:height'
						property='og:image:height'
						content={height}
					/>
				);
			}

			metadataElements.push(
				<meta key='og:type' property='og:type' content={type || "website"} />
			);
		}

		// Handling twitter
		if (twitter) {
			const { card, site, creator, image, title, description } = twitter;

			metadataElements.push(
				<meta
					key='twitter:card'
					name='twitter:card'
					content={card || "summary_large_image"}
				/>
			);

			if (site) {
				metadataElements.push(
					<meta key='twitter:site' name='twitter:site' content={site} />
				);
			}

			if (creator) {
				metadataElements.push(
					<meta
						key='twitter:creator'
						name='twitter:creator'
						content={creator}
					/>
				);
			}

			if (image) {
				metadataElements.push(
					<meta key='twitter:image' name='twitter:image' content={image} />
				);
			}

			if (title) {
				metadataElements.push(
					<meta key='twitter:title' name='twitter:title' content={title} />
				);
			}

			if (description) {
				metadataElements.push(
					<meta
						key='twitter:description'
						name='twitter:description'
						content={description}
					/>
				);
			}
		}

		// Handling links
		if (links) {
			metadataElements.push(...generateLinks(links));
		}

		// Handling metadata tags
		if (metaTags) {
			metadataElements.push(...generateMetaTags(metaTags));
		}
	});

	return metadataElements;
};

/**
 * This function generates links for metadata
 */
const generateLinks = (links: MetadataLink[]) => {
	return links.map((link) => {
		const { rel, sizes, type, href } = link;

		return (
			<link
				key={rel}
				rel={rel}
				sizes={sizes || "32x32"}
				type={type || "image/png"}
				href={href}
			/>
		);
	});
};

/**
 * This function generates meta tags for metadata
 * @param metaTags
 * @returns
 */
const generateMetaTags = (metaTags: MetaTag[]) => {
	return metaTags.map((metaTag) => {
		const { content, name, property } = metaTag;

		if (property) {
			return <meta key={property} property={property} content={content} />;
		}

		return <meta key={name} name={name} content={content} />;
	});
};
