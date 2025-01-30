import React from "react";
import { ImageProps, LoadingFallbackProps } from "../types/index.js";

// Lazy load the actual image component
const LazyLoadedImage = React.lazy(() => import("./image.js"));

// Fallback component to show while the image is loading
export const LoadingFallback = ({ width, height }: LoadingFallbackProps) => (
	<div
		style={{
			width,
			height,
			backgroundColor: "#e5e5e5",
		}}
	></div>
);

export const LazyImage = ({
	src,
	alt,
	loading = "lazy",
	mode = "wave",
	...props
}: ImageProps) => {
	return (
		<React.Suspense
			fallback={
				<LoadingFallback
					width={props.width || 200}
					height={props.height || 200}
				/>
			}
		>
			{/* Use lazy-loaded image component */}
			<LazyLoadedImage
				src={typeof src === "string" ? src : src.uri}
				alt={alt}
				loading={loading}
				mode={mode}
				{...props}
			/>
		</React.Suspense>
	);
};
