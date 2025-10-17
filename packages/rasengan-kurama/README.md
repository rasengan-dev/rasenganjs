# 🦊 @rasenganjs/kurama

### The Nine-Tails of State Management — Control Your Chakra, Control Your State.

`@rasenganjs/kurama` is a **lightweight and reactive state management library** designed for **Rasengan.js** and **any React application**.
Inspired by **Zustand**, **Jotai**, and the raw energy of **Kurama**, it gives developers full control over their application’s chakra (state) — simple, fast, and scalable.

---

## ⚡️ Features

- 🌀 **Minimal API** – Simple store creation, no boilerplate.
- 💫 **Reactive Selectors** – Subscribe to specific slices for performance.
- 🧠 **Type-safe by Design** – Written in TypeScript, fully inferred.
- 🔁 **Persistent Stores** – Save state to `localStorage` or custom drivers.
- 🔒 **SSR + Hydration** – Works seamlessly with Rasengan.js server rendering.
- ⚙️ **Middleware System** – Extend store behavior (logger, persist, devtools, etc.).
- 🧱 **Composable Stores** – Combine stores to build scalable state systems.
- 🧩 **Framework Agnostic** – Works in Rasengan.js, Next.js, Remix, React Router & more.

---

## 🚀 Installation

```bash
pnpm add @rasenganjs/kurama
```

or

```bash
npm install @rasenganjs/kurama
```

---

## 🦾 Quick Start

```tsx
import { createStore } from '@rasenganjs/kurama';

type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounter = createStore<CounterState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
}));

// Use it anywhere
function Counter() {
  const { count, increment, decrement } = useCounter();
  return (
    <>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      Chakra Power: {count}
    </>
  );
}
```

---

## 💾 Persistent Store Example

```tsx
import { persist, createStore } from '@rasenganjs/kurama';

export type ThemeState = {
  mode: 'light' | 'dark';
  toggle: () => void;
};

export const useTheme = createStore<ThemeState>(
  persist(
    (set) => ({
      mode: 'light',
      toggle: () =>
        set((s) => ({ mode: s.mode === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'theme',
      storage: localStorage,
    }
  )
);
```

---

## ⚙️ Middleware Example

```tsx
import { createStore, middleware } from '@rasenganjs/kurama';

export const useStore = createStore(
  middleware.logger((set) => ({
    chakra: 100,
    decrease: () => set((s) => ({ chakra: s.chakra - 10 })),
  }))
);
```

---

## 🧩 Composing Stores

```tsx
import { combineStores } from '@rasenganjs/kurama';
import { useTheme } from './theme';
import { useCounter } from './counter';

export const useApp = combineStores(useTheme, useCounter);
```

---

## 🔮 Roadmap

- [ ] DevTools integration (Kurama Vision)
- [ ] Store dependency tracking
- [ ] Multi-tab state synchronization
- [ ] Asynchronous action queue
- [ ] Integration with `@rasenganjs/query`

---

## 🧠 Philosophy

> “Kurama represents raw, limitless chakra.
> In Rasengan.js, that chakra is your **state** — energy you can control, share, and master.”

Simple. Reactive. Controlled.
That’s the power of Kurama.

---

## 📄 License

Licensed under the **MIT License**.
Part of the **Rasengan.js ecosystem** ⚡
