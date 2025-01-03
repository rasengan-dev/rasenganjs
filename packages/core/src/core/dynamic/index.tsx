import React, { FunctionComponent } from "react";

type DynamicComponent<T extends React.ComponentType<any>> = FunctionComponent<
	React.ComponentProps<T>
>;

export function dynamicLoad<T extends React.ComponentType<any>>(
	load: () => Promise<{
		default: T;
	}>,
	fallback = <>Loading</>
) {
	try {
		const LazyComponent = React.lazy(load);

		// Return a functional component preserving the exact props type
		const WrappedComponent: DynamicComponent<T> = (props) => (
			<React.Suspense fallback={fallback}>
				<LazyComponent {...props} />
			</React.Suspense>
		);

		return WrappedComponent;
	} catch (error) {
		throw new Error(error);
	}
}
