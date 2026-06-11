# Rasengan Vercel

[![npm version](https://badge.fury.io/js/@rasenganjs%2Fvercel.svg)](https://badge.fury.io/js/@rasenganjs%2Fvercel)
![NPM Downloads](https://img.shields.io/npm/dm/%40rasenganjs%2Fvercel)
[![GitHub license](https://img.shields.io/github/license/rasengan-dev/rasengan-serve)](https://github.com/rasengan-dev/rasengan-serve/blob/main/LICENSE)

The `@rasenganjs/vercel` package is an adapter that configures Rasengan.js applications for deployment on the Vercel platform. It ensures that the project is properly structured and optimized for Vercel's serverless environment.

## Installation

```bash title="Terminal"
npm install @rasenganjs/vercel
```

## Configuration

To configure Rasengan.js for Vercel, you need to import the adapter in your `rasengan.config.js` file and integrate it with the Rasengan.js plugin.

### Example Configuration

```javascript title="rasengan.config.js" showLineNumbers {2,3,8-10}
import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import { configure } from '@rasenganjs/vercel';

export default defineConfig({
  vite: {
    plugins: [
      rasengan({
        adapter: configure(),
      }),
    ],
  },
});
```

In the example above, the `configure` function from `@rasenganjs/vercel` is used to set up the Vercel adapter for the Rasengan.js application. The adapter is then passed to the `rasengan` plugin exported from `rasengan/plugin` to enable the necessary features for Vercel deployment.

## Deployment

Once the adapter is configured, you can deploy your Rasengan.js application using Vercel's CLI:

```bash title="Terminal"
vercel
```

Alternatively, you can link your GitHub repository to Vercel, and it will automatically detect the configuration and deploy your application.

Learn more on the [Documentation](https://rasengan.dev/docs/core/optimizing/images) website.

## Community

The Rasengan.js community can be found on [GitHub Discussions](https://github.com/rasengan-dev/rasenganjs/discussions) where you can ask questions, voice ideas, and share your projects with other people.

We also have a [Twitter](https://twitter.com/rasenganjs) account where you can follow us to get the latest news about Rasengan.js.

## License

Rasengan.js is [MIT licensed](https://github.com/rasengan-dev/rasengan-vercel/blob/main/LICENSE).

## Authors

Here is the authors list:

- Dilane Kombou ([**@dilanekombou**](https://twitter.com/dilanekombou))
