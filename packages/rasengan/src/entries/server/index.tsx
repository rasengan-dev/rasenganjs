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
  isSpaMode = false,
}: {
  StaticRouterComponent?: React.ReactNode;
  metadata?: {
    page: Metadata;
    layout: MetadataWithoutTitleAndDescription;
  };
  assets?: JSX.Element[];
  App?: FunctionComponent<AppProps>;
  Template: FunctionComponent<TemplateProps>;
  isSpaMode?: boolean;
}) => {
  // inject vite refresh script to avoid "React refresh preamble was not loaded"
  let viteScripts = <React.Fragment></React.Fragment>;
  let otherScripts = <React.Fragment></React.Fragment>;

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

  if (isSpaMode) {
    otherScripts = (
      <React.Fragment>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `window.__RASENGAN_SPA_MODE__ = true;`,
          }}
        />

        {!assets && (
          <script type="module" src="/src/index" async={true}></script>
        )}
      </React.Fragment>
    );
  } else {
    otherScripts = (
      <React.Fragment>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `window.__RASENGAN_SPA_MODE__ = false;`,
          }}
        />
      </React.Fragment>
    );
  }

  return (
    <Template
      Head={({ children }) => (
        <HeadComponent metadata={metadata} assets={assets}>
          {viteScripts}
          {otherScripts}
          {children}
        </HeadComponent>
      )}
      Body={({ children }) => (
        <BodyComponent
          asChild={App ? true : false}
          AppContent={
            App && <App Component={RootComponent}>{StaticRouterComponent}</App>
          }
        >
          {children}
        </BodyComponent>
      )}
      Script={({ children }) => <ScriptComponent>{children}</ScriptComponent>}
    />
  );
};
