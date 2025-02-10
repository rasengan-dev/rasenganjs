import React, { FunctionComponent, JSX } from 'react';
import {
  BodyComponent,
  HeadComponent,
  RootComponent,
  ScriptComponent,
} from '../../routing/components/template.js';
import { AppProps } from '../../core/types.js';
import {
  Metadata,
  MetadataWithoutTitleAndDescription,
  TemplateProps,
} from '../../routing/types.js';
import { isServerMode, ServerMode } from '../../server/runtime/mode.js';

export const TemplateLayout = ({
  StaticRouterComponent,
  metadata,
  assets,
  App,
  Template,
}: {
  StaticRouterComponent: React.ReactNode;
  metadata: {
    page: Metadata;
    layout: MetadataWithoutTitleAndDescription;
  };
  assets?: JSX.Element[];
  App: FunctionComponent<AppProps>;
  Template: FunctionComponent<TemplateProps>;
}) => {
  // inject vite refresh script to avoid "React refresh preamble was not loaded"
  let viteScripts = <React.Fragment></React.Fragment>;

  if (
    isServerMode(process.env.NODE_ENV) &&
    process.env.NODE_ENV === ServerMode.Development
  ) {
    const refreshScript = `
      import RefreshRuntime from "/@react-refresh"
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    `;

    viteScripts = (
      <React.Fragment>
        <script type="module" src="/@vite/client" />
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: refreshScript }}
        />
      </React.Fragment>
    );
  }

  return (
    <Template
      Head={({ children }) => (
        <HeadComponent metadata={metadata} assets={assets}>
          {viteScripts}
          {children}
        </HeadComponent>
      )}
      Body={({ children }) => (
        <BodyComponent
          asChild
          AppContent={
            <App Component={RootComponent}>{StaticRouterComponent}</App>
          }
        >
          {children}
        </BodyComponent>
      )}
      Script={({ children }) => <ScriptComponent>{children}</ScriptComponent>}
    />
  );
};
