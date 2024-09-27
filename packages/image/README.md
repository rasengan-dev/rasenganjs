# Rasengan Image

[![npm version](https://badge.fury.io/js/@rasenganjs%2Fimage.svg)](https://badge.fury.io/js/@rasenganjs%2Fimage)
![NPM Downloads](https://img.shields.io/npm/dm/%40rasenganjs%2Fimage)
[![GitHub license](https://img.shields.io/github/license/rasengan-dev/rasengan-image)](https://github.com/rasengan-dev/rasengan-image/blob/main/LICENSE)

An utility component for Image which offers a lazy loading behavior with a previewing animation for enhancing UX

Images are loading when they are in the viewport by default, and a previewing animation is displayed while the image is loading. But you can change that behavior as you want.

## Installation

You can install the `@rasenganjs/image` package using the following command:

```bash
npm install @rasenganjs/image
```

or

```bash
yarn add @rasenganjs/image
```

## Usage

Here is an example of how you can use the `@rasenganjs/image` package:

### Basic Usage

```tsx
import Image from '@rasenganjs/image';
import logo from './logo.svg';

const App = () => {
  return (
    <Image
      src={logo}
      alt="Image"
      width={400}
      height={300}
    />
  );
};
```

### With `URI`

```tsx
import Image from '@rasenganjs/image';

const App = () => {
  return (
    <Image
      src={{ uri: "https://example.com/image.jpg" }}
      alt="Image"
      width={400}
      height={300}
    />
  );
};
```

Learn more on the [Documentation](https://rasengan.dev/docs/core/optimizing/images) website.

## Community

The Rasengan.js community can be found on [GitHub Discussions](https://github.com/rasengan-dev/rasenganjs/discussions) where you can ask questions, voice ideas, and share your projects with other people.

We also have a [Twitter](https://twitter.com/rasenganjs) account where you can follow us to get the latest news about Rasengan.js.

## License

Rasengan.js is [MIT licensed](https://github.com/rasengan-dev/rasengan-image/blob/main/LICENSE).

## Authors

Here is the authors list:

- Dilane Kombou ([**@dilanekombou**](https://twitter.com/dilanekombou))