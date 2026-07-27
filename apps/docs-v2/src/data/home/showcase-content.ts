export type ShowcaseFile = {
  filename: string;
  lang: 'ts' | 'tsx' | 'js' | 'json';
  code: string;
};

export type ShowcaseFramework = {
  key: string;
  title: string;
  files: ShowcaseFile[];
};

export const showcaseFrameworks: ShowcaseFramework[] = [
  {
    key: 'rasengan',
    title: 'Rasengan',
    files: [
      {
        filename: 'package.json',
        lang: 'json',
        code: `{
  "name": "my-rasengan-app",
  "type": "module",
  "scripts": {
    "dev": "rasengan dev",
    "build": "rasengan build",
    "serve": "rasengan-serve ./dist"
  },
  "dependencies": {
    "rasengan": "^1.2.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}`,
      },
      {
        filename: 'rasengan.config.js',
        lang: 'js',
        code: `import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';

export default defineConfig({
  vite: {
    plugins: [rasengan()],
  },
});`,
      },
      {
        filename: 'src/index.ts',
        lang: 'ts',
        code: `import { renderApp } from 'rasengan/client';
import App from './main';
import AppRouter from '@/app/app.router';

renderApp(App, AppRouter, { reactStrictMode: true });`,
      },
      {
        filename: 'src/main.tsx',
        lang: 'tsx',
        code: `import '@/styles/index.css';
import { type AppProps } from 'rasengan';

export default function App({ Component, children }: AppProps) {
  return <Component>{children}</Component>;
}`,
      },
      {
        filename: 'src/template.tsx',
        lang: 'tsx',
        code: `import { type TemplateProps } from 'rasengan';

export default function Template({ Head, Body, Script }: TemplateProps) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/rasengan.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Body>
        <Script />
      </Body>
    </html>
  );
}`,
      },
      {
        filename: 'src/app/app.router.ts',
        lang: 'ts',
        code: `import { RouterComponent, defineRouter } from 'rasengan';
import Router from 'virtual:rasengan/router';

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [Router],
})(AppRouter);`,
      },
      {
        filename: 'src/app/_routes/layout.tsx',
        lang: 'tsx',
        code: `import { Outlet, LayoutComponent } from 'rasengan';

const RootLayout: LayoutComponent = () => {
  return <Outlet />;
};

export default RootLayout;`,
      },
      {
        filename: 'src/app/_routes/index.page.tsx',
        lang: 'tsx',
        code: `import { PageComponent } from 'rasengan';

const Home: PageComponent = () => {
  return <h1>Welcome to Rasengan.js</h1>;
};

Home.metadata = {
  title: 'Home',
};

export default Home;`,
      },
    ],
  },
  {
    key: 'futon',
    title: 'Futon',
    files: [
      {
        filename: 'package.json',
        lang: 'json',
        code: `{
  "name": "my-futon-app",
  "type": "module",
  "scripts": {
    "dev": "node --import tsx --watch src/index.ts",
    "start": "node --import tsx src/index.ts",
    "build": "tsc"
  },
  "dependencies": {
    "@rasenganjs/futon": "^1.0.0-beta.1",
    "@rasenganjs/runtime": "^1.0.0-beta.1"
  }
}`,
      },
      {
        filename: 'tsconfig.json',
        lang: 'json',
        code: `{
  "include": ["src"],
  "exclude": ["node_modules", "dist"],
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true
  }
}`,
      },
      {
        filename: 'src/index.ts',
        lang: 'ts',
        code: `import { Futon, json, logger, cors } from '@rasenganjs/futon';
import { NodeDevAdapter } from '@rasenganjs/runtime/adapters/node';

const app = new Futon();

app.use(logger());
app.use(cors());

app.get('/', async () => json({ message: 'Welcome to your Futon app!' }));
app.get('/health', async () => json({ status: 'ok' }));

app.onError(async (error) => {
  console.error(error);
  return json({ error: error.message }, { status: 500 });
});

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '0.0.0.0';

const runtime = new NodeDevAdapter({ port, host });

runtime.serve(app, {
  onListening: () => console.log(\`Listening on http://\${host}:\${port}\`),
});`,
      },
    ],
  },
  {
    key: 'server',
    title: 'Rasengan Server',
    files: [
      {
        filename: 'package.json',
        lang: 'json',
        code: `{
  "name": "my-server-app",
  "type": "module",
  "scripts": {
    "dev": "rasengan-server dev",
    "build": "rasengan-server build",
    "start": "rasengan-server start"
  },
  "dependencies": {
    "@rasenganjs/server": "^1.0.0-beta.3"
  }
}`,
      },
      {
        filename: 'rasengan.server.ts',
        lang: 'ts',
        code: `import { defineConfig } from '@rasenganjs/server';

export default defineConfig({
  entry: 'src/main.ts',
  port: 3000,
  preset: 'node',
});`,
      },
      {
        filename: 'src/main.ts',
        lang: 'ts',
        code: `import { bootstrap } from '@rasenganjs/server';
import appModule from './app.module';

bootstrap((app) => {
  app.registerModule(appModule);
});`,
      },
      {
        filename: 'src/app.module.ts',
        lang: 'ts',
        code: `import { defineModule } from '@rasenganjs/server';
import { HelloController } from './hello.controller';

export default defineModule({
  name: 'AppModule',
  controllers: [HelloController],
});`,
      },
      {
        filename: 'src/hello.controller.ts',
        lang: 'ts',
        code: `import { Controller, type Router, json } from '@rasenganjs/server';

export class HelloController extends Controller {
  routes(router: Router): void {
    router.get('/', async () => json({ message: 'Welcome to your Rasengan Server app!' }));
    router.get('/health', async () => json({ status: 'ok' }));
  }
}`,
      },
    ],
  },
];
