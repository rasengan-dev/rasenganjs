# Rasengan Serve

[![npm version](https://badge.fury.io/js/@rasenganjs%2Fserve.svg)](https://badge.fury.io/js/@rasenganjs%2Fserve)
![NPM Downloads](https://img.shields.io/npm/dm/%40rasenganjs%2Fserve)
[![GitHub license](https://img.shields.io/github/license/rasengan-dev/rasengan-serve)](https://github.com/rasengan-dev/rasengan-serve/blob/main/LICENSE)

`@rasenganjs/serve` is a simple utility to launch your Rasengan.js application in production mode. It serves the built application from the `dist` directory, ensuring a smooth and optimized deployment.

## Installation

To use `@rasenganjs/serve`, install it as a dependency in your project:

```bash title="Terminal"
npm install @rasenganjs/serve
```

## Usage

After building your application with Rasengan.js, you can start the production server using the `rasengan-serve` command.

### Start the production server

#### Define the serve command

```json title="package.json"
{
  "scripts": {
    "serve": "rasengan-serve ./dist"
  }
}
```

#### Run the serve command

```bash title="Terminal"
npm run serve
```

This will start a server that serves your application from the `dist` folder.

### Options

Currently, `@rasenganjs/serve` provides a default configuration for serving your built project. Future updates may include additional options for customization.

#### Custom port

You can specify a custom port for the server by using the `--p` or `--port` option:

```bash title="Terminal"
npm run serve -- -p 3000
```

or

```bash title="Terminal"
pnpm run serve -p 3000
```

The `-p` option stands for `port`, and allow you to specify a custom port for the server by replacing the default port `4320` for production server.

Learn more on the [Documentation](https://rasengan.dev/docs/core/optimizing/images) website.

## Community

The Rasengan.js community can be found on [GitHub Discussions](https://github.com/rasengan-dev/rasenganjs/discussions) where you can ask questions, voice ideas, and share your projects with other people.

We also have a [Twitter](https://twitter.com/rasenganjs) account where you can follow us to get the latest news about Rasengan.js.

## License

Rasengan.js is [MIT licensed](https://github.com/rasengan-dev/rasengan-serve/blob/main/LICENSE).

## Authors

Here is the authors list:

- Dilane Kombou ([**@dilanekombou**](https://twitter.com/dilanekombou))
