---
name: rasengan-routing
description: Router definition and navigation patterns for Rasengan.js. Covers config-based and file-based routing, RouterComponent, defineRouter, defineRoutesGroup, Link, NavLink, useLocation, useNavigate, useParams, useSearchParams, dynamic routes, route groups, and file-based routing conventions. Use when creating or modifying app.router.ts, defining route structures, setting up dynamic segments, or implementing navigation.
license: MIT
metadata:
  author: dilane3
  framework: rasengan
  version: '2.0.0'
---

# Rasengan.js Routing Patterns

## When to Activate

- Creating or editing `src/app/app.router.{js,ts}`
- Choosing between config-based and file-based routing
- Defining navigation links with `Link` or `NavLink`
- Using navigation hooks: `useNavigate`, `useLocation`, `useParams`, `useSearchParams`
- Defining dynamic route segments `[param]`, `[_param]`, route groups `(group)`
- Setting up nested routers or route groups with `defineRoutesGroup`
- Customizing 404 / loading fallbacks at the router level

## RouterComponent Properties

| Property            | Type                             | Description                     |
| ------------------- | -------------------------------- | ------------------------------- |
| `layout`            | `LayoutComponent \| RouteNode`   | Layout component for the router |
| `routers`           | `RouterComponent[]`              | Nested sub-routers              |
| `pages`             | `PageComponent[] \| RouteNode[]` | Page components                 |
| `loaderComponent`   | `FunctionComponent`              | Loading fallback                |
| `notFoundComponent` | `FunctionComponent`              | 404 component                   |
| `useParentLayout`   | `boolean`                        | Inherit parent layout           |

## Config-based Routing

```ts
import { RouterComponent, defineRouter } from 'rasengan';
import Home from './home.page';
import About from './about.page';
import AppLayout from './layout';

class AppRouter extends RouterComponent {}

export default defineRouter({
  layout: AppLayout,
  pages: [Home, About],
  notFoundComponent: NotFound,
})(AppRouter);
```

## File-based Routing

```ts
import { RouterComponent, defineRouter } from 'rasengan';
import Router from 'virtual:rasengan/router';

class AppRouter extends RouterComponent {}

export default defineRouter({ imports: [Router] })(AppRouter);
```

## Route Groups with defineRoutesGroup

```ts
import { defineRoutesGroup } from 'rasengan';

export default defineRoutesGroup({
  path: '/dashboard',
  pages: [Settings, Profile],
  routers: [AdminRouter],
});
```

## Dynamic Route Conventions

| File pattern               | Route segment     | Example URL       |
| -------------------------- | ----------------- | ----------------- |
| `[id].page.tsx`            | `:id`             | `/posts/123`      |
| `[_locale]/index.page.tsx` | `:locale?`        | `/en` or `/`      |
| `(group)/index.page.tsx`   | (ignored in path) | `/`               |
| `_optional/index.page.tsx` | `optional?`       | `/optional` or `` |

Config-based dynamic routes use react-router syntax:

```ts
Profile.path = '/profile/:id'; // required param
Profile.path = '/profile/:id?'; // optional param
Profile.path = '/profile/:id?/:name?'; // multiple optional params
```

## Link Component

Import from `rasengan` for client-side navigation:

```tsx
import { Link } from 'rasengan';

// Basic usage
<Link to="/dashboard">Go to Dashboard</Link>

// Dynamic routes
<Link to={`/post/${post.id}`}>Read More</Link>

// Hash anchors (renders as <a>, not react-router Link)
<Link to="#section">Section</Link>

// Fragment navigation with hash
<Link to="/admin/dashboard#statistics">Statistics</Link>
```

The `Link` component renders an `<a>` element that navigates client-side without a full page reload.

## NavLink Component

Import from `rasengan` for links with active state tracking:

```tsx
import { NavLink } from 'rasengan';

// Basic usage with className callback
<NavLink
  to="/about"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  About
</NavLink>

// Children as render props
<NavLink to="/tasks">
  {({ isActive }) => (
    <span className={isActive ? "active" : ""}>Tasks</span>
  )}
</NavLink>
```

Active state matching:

| NavLink                       | URL          | `isActive` |
| ----------------------------- | ------------ | ---------- |
| `<NavLink to="/tasks" />`     | `/tasks`     | `true`     |
| `<NavLink to="/tasks" />`     | `/tasks/123` | `true`     |
| `<NavLink to="/tasks" end />` | `/tasks`     | `true`     |
| `<NavLink to="/tasks" end />` | `/tasks/123` | `false`    |

- `isActive` — `true` when current route **starts with** `to` value
- `isPending` — `true` when the route transition is loading
- `end` prop — restricts active matching to exact match only

## useNavigate Hook

Import from `rasengan` for programmatic navigation:

```tsx
import { useNavigate } from 'rasengan';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/sign-in');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

- `navigate(to)` — navigate to a path
- `navigate(-1)` — go back in history
- `navigate(1)` — go forward in history
- Supports all react-router `NavigateOptions` (`replace`, `state`, etc.)

## useLocation Hook

Import from `rasengan` to read the current URL location:

```tsx
import { useLocation } from 'rasengan';

function ActiveLink({ to, children }) {
  const { pathname } = useLocation();

  return (
    <Link to={to} className={pathname === to ? 'active' : ''}>
      {children}
    </Link>
  );
}
```

Returns a location object with `pathname`, `search`, `hash`, `state`, and `key` properties.

## useParams Hook

Import from `rasengan` to access dynamic route parameters:

```tsx
import { useParams } from 'rasengan';

const Profile = () => {
  const { id } = useParams();

  return <div>User ID: {id}</div>;
};

Profile.path = '/profile/:id';
```

- Returns an object where keys match the dynamic segment names in the route path
- Optional params (`:id?`) may be `undefined`
- Works in both config-based and file-based routing

## useSearchParams Hook

Import from `rasengan` (re-exported from react-router) to read and update URL query string:

```tsx
import { useSearchParams } from 'rasengan';

function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'overview';

  return (
    <div>
      <p>Active tab: {tab}</p>
      <button onClick={() => setSearchParams({ tab: 'settings' })}>
        Go to Settings tab
      </button>
    </div>
  );
}
```

`setSearchParams` accepts multiple forms:

```tsx
// Search param string
setSearchParams('?tab=1');

// Shorthand object
setSearchParams({ tab: '1' });

// Object with array values (multiple values for same key)
setSearchParams({ brand: ['nike', 'reebok'] });

// Array of tuples
setSearchParams([['tab', '1']]);

// Function callback (receives current URLSearchParams)
setSearchParams((prev) => {
  prev.set('tab', '2');
  return prev;
});

// With navigation options (prevent scroll reset, replace history)
setSearchParams({ tab: '2' }, { replace: true, preventScrollReset: true });
```

- `searchParams` is a stable `URLSearchParams` reference (safe as useEffect dependency)
- `setSearchParams` causes a navigation — URL updates and re-render triggers
- Optional `defaultInit` provides default values without changing the URL on first render
- Function callback does NOT support React's setState queueing — multiple calls in same tick won't build on prior value

## Rules

- Always create a class extending `RouterComponent` and wrap it with `defineRouter()`
- Config-based: list all pages in `pages` array, set `layout` explicitly, provide `notFoundComponent`
- File-based: use `import Router from 'virtual:rasengan/router'` with `{ imports: [Router] }`
- Use `routers` for nested sub-routers when splitting large route trees
- Set `useParentLayout: true` on child routers to inherit the parent's layout
- Use `defineRoutesGroup` to group routes under a shared path prefix without a separate router class
- Optional segments `[_param]` generate both with and without the segment
- Route groups `(group)` do not add a path segment — use them for organization only
- Underscore-prefixed directories `_name/` become optional path segments
- Do NOT import directly from `react-router` — import routing APIs from `rasengan`
- Use `NavLink` over `Link` + `useLocation` when you need active state tracking (less boilerplate)
- Set `end` prop on `NavLink` when active state should only match the exact path, not sub-routes
- Use `useSearchParams` instead of manual URL parsing for query string access
- Prefer `Link` for declarative navigation and `useNavigate` for imperative navigation (e.g., after form submission)
