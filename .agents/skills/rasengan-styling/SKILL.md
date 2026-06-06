---
name: rasengan-styling
description: Styling patterns for Rasengan.js. Covers CSS Modules (scoped styles), Tailwind CSS integration (v3/v4), and CSS preprocessors (Sass, Less, Stylus). Use when adding or configuring styling in a Rasengan.js project.
license: MIT
metadata:
  author: dilane3
  framework: rasengan
  version: '1.0.0'
---

# Rasengan.js Styling Patterns

## When to Activate

- Adding CSS Modules for component-scoped styles
- Setting up Tailwind CSS (v3 or v4) in a Rasengan.js project
- Configuring Sass, Less, or Stylus preprocessors
- Importing global styles or external stylesheets
- Choosing between styling approaches for a new project

## CSS Modules

Rasengan.js has built-in support for CSS Modules using the `.module.css` extension. Class names are auto-scoped to the component.

```tsx
import styles from './Card.module.css';

type CardProps = { title: string; content: string };

export default function Card({ title, content }: CardProps) {
  return (
    <div className={styles.card}>
      <h1 className={styles.card__title}>{title}</h1>
      <p className={styles.card__content}>{content}</p>
    </div>
  );
}
```

### Global Styles

Place global styles in `src/styles/` and import them in `src/main.tsx`:

```css
/* src/styles/index.css */
body,
html {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
}
```

```tsx
// src/main.tsx
import '@/styles/index.css';
import { type AppProps } from 'rasengan';
import AppRouter from '@/app/app.router';

export default function App({ Component, children }: AppProps) {
  return <Component router={AppRouter}>{children}</Component>;
}
```

### External Stylesheets

Import package stylesheets in `src/main.tsx` or load CDN stylesheets in `src/template.tsx`:

```tsx
// src/main.tsx — package styles
import '@rasenganjs/image/css';

// src/template.tsx — CDN styles
import { type TemplateProps } from 'rasengan';

export default function Template({ Head, Body, Script }: TemplateProps) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://cdn.example.com/styles.css" />
      </Head>
      <Body>
        <Script />
      </Body>
    </html>
  );
}
```

## Tailwind CSS

### Version 4

```bash
npm install tailwindcss @tailwindcss/vite
```

```js
// rasengan.config.js
import { defineConfig } from 'rasengan';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css
/* src/styles/index.css */
@import 'tailwindcss';
```

### Version 3

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

```css
/* src/styles/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## CSS Preprocessors

Rasengan.js supports Sass, Less, and Stylus — install the compiler and use the matching file extension.

### Sass (.scss / .sass)

```bash
npm install --save-dev sass
```

```scss
/* MyComponent.scss */
$primary-color: #333;

.my-component {
  color: $primary-color;
}
```

```tsx
import './MyComponent.scss';
```

Sass with CSS Modules (`.module.scss`):

```scss
/* MyComponent.module.scss */
$primary-color: #333;
.component {
  color: $primary-color;
}
```

```tsx
import styles from './MyComponent.module.scss';
```

### Less (.less)

```bash
npm install --save-dev less
```

```less
/* MyComponent.less */
@primary-color: #333;
.my-component {
  color: @primary-color;
}
```

```tsx
import './MyComponent.less';
```

### Stylus (.styl / .stylus)

```bash
npm install --save-dev stylus
```

```styl
/* MyComponent.styl */
primary-color = #333
.my-component
  color primary-color
```

```tsx
import './MyComponent.styl';
```

## Rules

- Use CSS Modules (`.module.css`) for component-scoped styles to avoid class name conflicts
- Place global styles in `src/styles/` and import them in `src/main.tsx`
- For Tailwind v4: use the `@tailwindcss/vite` plugin; for v3: use PostCSS with `tailwind.config.js`
- Import external/package stylesheets in `src/main.tsx`; CDN stylesheets go in `src/template.tsx`
- Sass with CSS Modules uses the `.module.scss` extension for scoped styles with preprocessor features
- No additional Vite config is needed for preprocessors — just install the compiler package
