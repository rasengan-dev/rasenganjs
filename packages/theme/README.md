# Rasengan Theme

[![npm version](https://badge.fury.io/js/@rasenganjs%2Ftheme.svg)](https://badge.fury.io/js/@rasenganjs%2Ftheme)
![NPM Downloads](https://img.shields.io/npm/dm/%40rasenganjs%2Ftheme)
[![GitHub license](https://img.shields.io/github/license/rasengan-dev/rasengan-theme)](https://github.com/rasengan-dev/rasengan-theme/blob/main/LICENSE)

Simple Rasengan.JS package to manage the theme of your application.

## Installation

You can install the `@rasenganjs/theme` package by using the following command:

```bash
npm install @rasenganjs/theme
```

or

```bash
yarn add @rasenganjs/theme
```

## Usage

Here is an example of how you can use the `@rasenganjs/theme` package:

### Wrap your application with `ThemeProvider`

```tsx
import { type AppProps } from "rasengan";
import AppRouter from "@app/app.router";
import ThemeProvider from "@rasenganjs/theme";

export default function App({ Component, children }: AppProps) {
  return (
		<ThemeProvider>
			<Component router={AppRouter}>{children}</Component>
		</ThemeProvider>
	);
}

```

### Use the `useTheme` hook to get the current theme

```tsx 
import { useTheme } from "@rasenganjs/theme";

const Card = () => {
  const { theme, actualTheme, setTheme, isDark } = useTheme();

  return (
    <div>{/* Code here */}</div>
  );
};
```

| Property | Type | Description | Values |
| --- | --- | --- | --- |
| `theme` | `string` | The current theme | `light` or `dark` or `system` |
| `actualTheme` | `string` | The actual theme | `light` or `dark` |
| `setTheme` | `(theme: string) => void` | A function to set the theme | - |
| `isDark` | `boolean` | A boolean that indicates if the current theme is dark | `true` or `false` |


## Community

The Rasengan.js community can be found on [GitHub Discussions](https://github.com/rasengan-dev/rasenganjs/discussions) where you can ask questions, voice ideas, and share your projects with other people.

We also have a [Twitter](https://twitter.com/rasenganjs) account where you can follow us to get the latest news about Rasengan.js.

## License

Rasengan.js is [MIT licensed](https://github.com/rasengan-dev/rasengan-theme/blob/main/LICENSE).

## Authors

Here is the authors list:

- Dilane Kombou ([**@dilanekombou**](https://twitter.com/dilanekombou))