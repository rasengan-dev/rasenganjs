# Rasengan Theme

[![npm version](https://badge.fury.io/js/@rasenganjs%2Fi18n.svg)](https://badge.fury.io/js/@rasenganjs%2Fi18n)
![NPM Downloads](https://img.shields.io/npm/dm/%40rasenganjs%2Fi18n)
[![GitHub license](https://img.shields.io/github/license/rasengan-dev/rasengan-i18n)](https://github.com/rasengan-dev/rasengan-i18n/blob/main/LICENSE)

# Rasengan I18n

The `@rasenganjs/i18n` makes it easy to add internationalization (i18n) to your Rasengan.js applications. It lets you manage translations using simple, static JSON files—keeping your localization workflow clear, fast, and scalable.

## Installation

```bash title="Terminal"
npm install @rasenganjs/i18n@1.0.0-beta.1
```

## Usage

### Configuration

First thing first, you have to configure the `i18n` package into the `rasengan.config.js` file by importing the plugin and passing it to the vite `plugins` array.

```js title="rasengan.config.js" showLineNumbers
import { defineConfig } from 'rasengan';
import i18n from '@rasenganjs/i18n/plugin';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [
        i18n({
          defaultLocale: 'fr',
          resources: {
            source: '/src/messages', // The path to the messages directory
          },
        }),
      ],
    },
  };
});
```

The `i18n plugin` takes a configuration object with the following properties:

| Name             | Type   | Description                         | Optional | Default        |
| ---------------- | ------ | ----------------------------------- | -------- | -------------- |
| defaultLocale    | string | The default locale to use.          | false    | -              |
| resources.source | string | The path to the messages directory. | true     | `src/messages` |

### Messages

The messages directory should contain JSON files for each locale, with the following structure:

```json title="src/messages/en.json"
{
  "translation": {
    "greeting": "Hello, World!"
  }
}
```

> Every JSON file should have a `translation` key that contains the translations for that locale.

### Register the Provider

You have to register the `RasenganI18nProvider` component at the root of your application inside the root layout file.

```tsx title="src/app/app.layout.tsx" showLineNumbers
import { LayoutComponent, Outlet } from 'rasengan';
import { RasenganI18nProvider } from '@rasenganjs/i18n';

const RootLayout: LayoutComponent = () => {
  return (
    <RasenganI18nProvider>
      <Outlet />
    </RasenganI18nProvider>
  );
};

RootLayout.path = '/'; // Only work while using a Config-based routing

export default RootLayout;
```

> Don't wrap your application with the `RasenganI18nProvider` inside the `main.tsx` file, prefer to wrap it inside the root layout file.

### Hooks

The `@rasenganjs/i18n` package provides a number of hooks to help you manage translations in your application.

| Name             | Description                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| `useTranslation` | Returns a function that returns the current translation based on the key. |
| `useLocale`      | Returns the current locale and a function to change it.                   |

#### useTranslation

```tsx title="src/components/greeting.tsx" showLineNumbers
import { useTranslation } from '@rasenganjs/i18n';

const Greeting = () => {
  const t = useTranslation();

  return (
    <div>
      <h1>{t('greeting')}</h1>
    </div>
  );
};

export default Greeting;
```

The `useTranslation` hook takes an optional param called `namespace` that allows you to specify the namespace of the translation you want to use.
<br />

Let's suppose we have the following message:

```json title="src/messages/en.json"
{
  "translation": {
    "home": {
      "header": {
        "greeting": "Hello, World!"
      }
    }
  }
}
```

And we can use the `useTranslation` hook like this:

```tsx title="src/components/greeting.tsx" showLineNumbers
import { useTranslation } from '@rasenganjs/i18n';

const Greeting = () => {
  const t = useTranslation('home');

  return (
    <div>
      <h1>{t('header.greeting')}</h1>
    </div>
  );
};

export default Greeting;
```

#### useLocale

From the `useLocale` hook, you can get the current locale and a function to change it.

```tsx title="src/components/navbar.tsx" showLineNumbers
import { useLocale } from '@rasenganjs/i18n';

const Navbar = () => {
  const { locale, setLocale } = useLocale();

  return (
    <div>
      <h1>{locale}</h1>
      <button onClick={() => setLocale('en')}>English</button>
      <button onClick={() => setLocale('fr')}>French</button>
    </div>
  );
};

export default Navbar;
```

> **Note:** The value passed to `setLocale` must be one of the locales defined into your messages directory.

## Community

The Rasengan.js community can be found on [GitHub Discussions](https://github.com/rasengan-dev/rasenganjs/discussions) where you can ask questions, voice ideas, and share your projects with other people.

We also have a [Twitter](https://twitter.com/rasenganjs) account where you can follow us to get the latest news about Rasengan.js.

## License

Rasengan.js is [MIT licensed](https://github.com/rasengan-dev/rasengan-theme/blob/main/LICENSE).

## Authors

Here is the authors list:

- Dilane Kombou ([**@dilanekombou**](https://twitter.com/dilanekombou))
