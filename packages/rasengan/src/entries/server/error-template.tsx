import React, { type FunctionComponent } from 'react';
import type { TemplateProps } from '../../routing/types.js';
import { TemplateLayout } from './index.js';
import { renderToString } from '../../server/node/rendering.js';

export function renderErrorPage(error: unknown): string {
  const serialized = JSON.stringify({
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    name: error instanceof Error ? error.name : 'Error',
  });

  const ErrorTemplate: FunctionComponent<TemplateProps> = ({
    Head,
    Body,
    Script,
  }) => (
    <html lang="en">
      <Head>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `window.__RASENGAN_SSR_ERROR__ = ${serialized};`,
          }}
        />
      </Head>
      <Body>
        <Script>
          <script type="module" src="/src/index" />
        </Script>
      </Body>
    </html>
  );

  return renderToString(
    <TemplateLayout Template={ErrorTemplate} isSpaMode={false} />
  );
}
