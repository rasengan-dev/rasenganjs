---
name: rasengan-optimizing
description: Optimization patterns for Rasengan.js. Covers static assets via the public/ directory, asset handling best practices, and performance optimization. Use when managing static files, serving assets, or optimizing resource delivery in a Rasengan.js project.
license: MIT
metadata:
  author: dilane3
  framework: rasengan
  version: '1.0.0'
---

# Rasengan.js Optimization Patterns

## When to Activate

- Serving static files (images, fonts, icons) from the `public/` directory
- Referencing assets in components or templates
- Optimizing images and static resources for production
- Configuring metadata for SEO (title, description, Open Graph, Twitter)
- Enabling React Compiler via Sage Mode for automatic memoization

## Static Assets — public/ Directory

Any file placed inside the `public/` directory is automatically served at the base URL (`/`). No imports or special loaders needed.

### File Placement

```
public/
├── favicon.ico
├── robots.txt
├── og-image.png
└── avatars/
    └── 1.png
```

### Referencing in Code

```tsx
// Public assets use root-relative paths
<img src="/avatars/1.png" alt="Avatar" />;

// With @rasenganjs/image
import { Image } from '@rasenganjs/image';
<Image src="/avatars/1.png" alt="Avatar" width={64} height={64} />;
```

```tsx
// In the HTML template (src/template.tsx)
import { type TemplateProps } from 'rasengan';

export default function Template({ Head, Body, Script }: TemplateProps) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Body>
        <Script />
      </Body>
    </html>
  );
}
```

### src/assets/ Directory

For assets that need bundling, transformation, or import-based references, use `src/assets/` instead:

```tsx
import logo from '@/assets/logo.svg';

function Header() {
  return <img src={logo} alt="Logo" />;
}
```

## Metadata & SEO

SEO metadata is defined as a static property on page or layout components:

```tsx
Home.metadata = {
  title: 'Home',
  description: 'Home page description',
  openGraph: {
    title: 'Home',
    description: 'Home page',
    url: 'https://example.com',
    image: 'https://example.com/og.png',
  },
  twitter: {
    card: 'summary_large_image',
    image: 'https://example.com/twitter.png',
    title: 'Home',
  },
};
```

Rules:

- Page metadata takes priority over layout metadata (merged, page wins)
- Loader-returned `meta` overrides static metadata at runtime
- `openGraph.url` and `openGraph.image` are required when using Open Graph
- `twitter.card`, `twitter.image`, `twitter.title` are required when using Twitter cards

## React Compiler (Sage Mode)

Enable automatic memoization in `rasengan.config.js`:

```js
export default defineConfig({
  sageMode: {
    reactCompiler: true, // auto-memoize all components
    // reactCompiler: { compilationMode: 'annotation' }, // only components with "use memo"
  },
});
```

- `true` — applies React Compiler to all components automatically
- `{ compilationMode: 'annotation' }` — only compiles components with a `"use memo"` directive

## Bundle Optimization

Build output structure:

```
dist/
  client/        # Client bundle + manifest.json
    assets/      # JS, CSS, config.json
    .vite/       # Vite manifest
  server/        # SSR server bundle
static/          # Pre-rendered HTML (SSG)
```

## Rules

- Use `public/` for assets that need a fixed URL path (favicon, robots.txt, og-images)
- Use `src/assets/` for assets that benefit from bundling, hashing, and import references
- Always provide `width` and `height` on images to prevent Cumulative Layout Shift (CLS)
- Place SEO-critical images (Open Graph, Twitter cards) in `public/` for stable URLs
- Enable `sageMode.reactCompiler` to reduce unnecessary re-renders in production
- The `public/` directory contents are copied as-is during build (no transformation)
