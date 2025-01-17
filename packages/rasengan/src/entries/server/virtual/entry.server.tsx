export default function rasenganServerEntryPlugin() {
	const virtualModuleId = "virtual:entry-server";
	const resolvedVirtualModuleId = "\0" + virtualModuleId;

	return {
		name: "rasengan-plugin-entry-server",
		resolveId(id: string) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
		},
		load(id: string) {
			if (id === resolvedVirtualModuleId) {
				return `
          import { jsx as _jsx } from "react/jsx-runtime";
          import { TemplateLayout, renderToStream } from "rasengan";

          /**
           * Render the app to a stream
           * @param router
           * @param res
           * @param options 
           * @returns
           */
          export async function render(
            router,
            res,
            options
          ) {
            const { context, metadata, App, Template } = options;

            return await renderToStream(
              _jsx(TemplateLayout, { router: router, context: context, metadata: metadata, App: App, Template: Template }), res
            );
          }
        `;
			}
		},
	};
}
