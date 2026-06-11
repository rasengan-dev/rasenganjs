---
name: rasengan-data-fetching
description: Data fetching and SSG static path patterns for Rasengan.js. Covers LoaderFunction, route-level data fetching with params/request, loader return types (props, redirect, meta, source), defineStaticPaths, and generatePaths for SSG. Use when adding loaders to pages, generating static paths for prerendered dynamic routes, or handling data loading states.
license: MIT
metadata:
  author: dilane3
  framework: rasengan
  version: '1.0.0'
---

# Rasengan.js Data Fetching Patterns

## When to Activate

- Writing loader functions for data fetching per route
- Handling SSR data fetching and client-side navigation loading
- Generating static paths for prerendered dynamic routes (SSG)
- Managing loading states and redirects from loaders
- Passing fetched data as props to page components

## Loader Functions

Loaders fetch data per route — both on server (SSR) and client (navigation):

```ts
import { type LoaderFunction } from 'rasengan';

export const loader: LoaderFunction = async ({ params, request }) => {
  const data = await fetchData(params.id);
  return { props: { data }, meta: { title: 'Page Title' } };
};
```

## Attaching a Loader to a Page Component

```tsx
import { type PageComponent } from 'rasengan';

const Posts: PageComponent = () => { ... };

Posts.loader = async ({ params }) => {
  const data = await fetch(`/api/posts/${params.id}`).then(r => r.json());
  return { props: { data } };
};

export default Posts;
```

## Loader Return Type

```ts
type LoaderResult = {
  props?: Record<string, unknown>; // data passed to the page component
  redirect?: string; // URL to redirect to (302 Response)
  meta?: Partial<Metadata>; // dynamic metadata, overrides static metadata
  source?: string; // source file identifier (auto-filled for file-based)
};
```

## Accessing Loader Data in Components

```tsx
const Post: PageComponent = ({ props: { post } }) => {
  return <article>{post.title}</article>;
};
```

## Loading States

Set a `loaderComponent` on the router to show during data loading:

```tsx
import { RouterComponent, defineRouter } from 'rasengan';

class AppRouter extends RouterComponent {}

export default defineRouter({
  pages: [Posts],
  loaderComponent: () => <div>Loading...</div>,
})(AppRouter);
```

## SSG Static Path Generation

For prerendered dynamic routes, export `generatePaths` on the page component:

```tsx
const Post: PageComponent = () => {
  /* ... */
};

Post.generatePaths = async () => {
  const posts = await fetch('/api/posts').then((r) => r.json());
  return {
    paths: posts.map((post) => ({ params: { id: post.id.toString() } })),
  };
};
```

### defineStaticPaths (config-based SSG)

```ts
import { defineStaticPaths } from 'rasengan';

export default defineStaticPaths(async () => {
  const posts = await fetch('https://api.example.com/posts').then((r) =>
    r.json()
  );
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
  };
});
```

## Rules

- Attach loader as a static `.loader` property on the component — do NOT export standalone
- `params` contains dynamic route segment values (e.g., `params.id` for `[id]`)
- `request` is a Fetch API Request object (available in SSR and client navigation)
- Return `redirect` to perform a server-side 302 redirect (e.g., for authentication guards)
- Loader-returned `meta` overrides static `.metadata` on the component
- Loaders run on the server during SSR and on the client during SPA navigations
- `generatePaths` is only effective when `prerender: true` in `rasengan.config.js`
- Each entry in `paths` must have `params` keys matching dynamic segments in the route path
- Use `loaderComponent` on the router for a global loading fallback during data fetches
