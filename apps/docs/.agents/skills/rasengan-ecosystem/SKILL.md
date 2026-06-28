---
name: rasengan-ecosystem
description: Rasengan.js ecosystem package patterns. Covers @rasenganjs/kurama (state management), @rasenganjs/image (optimized images), @rasenganjs/theme (light/dark/system), @rasenganjs/i18n (internationalization), @rasenganjs/kage-demo (guided tours), and @rasenganjs/mdx (MDX content). Use when integrating ecosystem packages into a Rasengan.js project.
license: MIT
metadata:
  author: dilane3
  framework: rasengan
  version: '2.0.0'
---

# Rasengan.js Ecosystem Package Patterns

## When to Activate

- Adding state management with `@rasenganjs/kurama`
- Optimizing images with `@rasenganjs/image`
- Implementing light/dark/system theming with `@rasenganjs/theme`
- Adding internationalization with `@rasenganjs/i18n`
- Setting up MDX content with `@rasenganjs/mdx`
- Creating guided product tours with `@rasenganjs/kage-demo`

## State Management — @rasenganjs/kurama

```ts
import { createStore } from '@rasenganjs/kurama';

const useStore = createStore(({ set }) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

// In a component:
function Counter() {
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);
  return <button onClick={increment}>{count}</button>;
}

// Subscribe to multiple values:
const { count, increment } = useStore();
```

Rules:

- Create stores outside components to avoid re-creation on re-render
- Use selectors (`useStore(state => state.count)`) for granular subscriptions and to avoid unnecessary re-renders
- Call `set()` with a partial state or updater function (Zustand-like API)

## Image Optimization — @rasenganjs/image

```tsx
import { Image } from '@rasenganjs/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  placeholder="blur" // or "wave"
  lazy // enable lazy loading
/>;
```

Rules:

- Always provide `width` and `height` to prevent Cumulative Layout Shift (CLS)
- Use `placeholder="blur"` for production — generates a blurred placeholder
- Use `placeholder="wave"` for a lighter, animated wave placeholder
- Use `lazy` prop to defer offscreen images (recommended for most images)
- Import from `@rasenganjs/image`, not a generic `<img>` tag

## Theming — @rasenganjs/theme

```tsx
import { ThemeProvider, useTheme } from '@rasenganjs/theme';

// Wrap in root App component:
<ThemeProvider defaultTheme="system">
  <Component router={AppRouter}>{children}</Component>
</ThemeProvider>;

// In any component:
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

Rules:

- Wrap at the App root level (inside `src/main.tsx`)
- `defaultTheme="system"` respects OS preference (recommended)
- Theme is persisted to `localStorage` automatically
- `useTheme()` returns `{ theme, setTheme, toggleTheme }`

## Internationalization — @rasenganjs/i18n

```tsx
import { I18nProvider, useLocale, useTranslation } from '@rasenganjs/i18n';

// Wrap in root App component:
<I18nProvider defaultLocale="en" locales={['en', 'fr', 'de']}>
  <Component router={AppRouter}>{children}</Component>
</I18nProvider>;

// Translate in components:
function Greeting() {
  const { t } = useTranslation();
  return <h1>{t('welcome')}</h1>;
}

// Switch locale:
function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  );
}
```

Rules:

- Locale is auto-detected from URL by default; `setLocale` updates the URL
- Use flat key structures for translation files (e.g., `{ "welcome": "Hello" }`)
- Wrap `I18nProvider` at the App root, inside `src/main.tsx`
- `useTranslation()` loads translations for the current locale automatically

## Guided Tours — @rasenganjs/kage-demo

Creates interactive step-by-step tours and onboarding experiences:

```tsx
import KageDemoContainer, {
  useKageDemo,
  KageDemoStep,
} from '@rasenganjs/kage-demo';
import Step01 from '@/components/demo/step-01';
import Step02 from '@/components/demo/step-02';

const steps: KageDemoStep[] = [
  {
    target: '#get-started',
    render: (props) => <Step01 {...props} />,
  },
  {
    target: '#end',
    render: (props) => <Step02 {...props} />,
  },
];

export default function Page() {
  const props = useKageDemo(steps);

  return (
    <section>
      <KageDemoContainer {...props} />
      <button id="get-started">Get Started</button>
      <button onClick={props.start}>Start tour</button>
      <p id="end">End demo</p>
    </section>
  );
}
```

### Step Component Props

```ts
interface StepProps {
  next: () => void; // go to next step
  prev: () => void; // go to previous step
  end: () => void; // end the tour
}
```

### Core API

| API                  | Description                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| `KageDemoContainer`  | Main container — renders overlay and spotlight on the target element              |
| `useKageDemo(steps)` | Hook that initializes the tour system. Returns `{ start, end, ... }`              |
| `KageDemoStep`       | `{ target: string; render: React.FC<StepProps> }` — CSS selector + step component |

Rules:

- Define steps with a `target` CSS selector and a custom `render` component for each step
- Each step component receives `next`, `prev`, `end` callbacks for navigation
- Call `props.start` to begin the tour (e.g., from a "Start tour" button)
- The container renders a spotlight effect over the target element automatically
- Steps are type-safe with full TypeScript inference

Rules:

- `@rasenganjs/kage-demo` uses CSS selectors for element targeting — ensure target IDs/classes exist in the DOM
- All ecosystem packages require `"type": "module"` in `package.json`
