# **@rasenganjs/kage-demo**

### ✨ Build beautiful guided product tours for your Rasengan.js apps

`@rasenganjs/kage-demo` is a lightweight, framework-native library that allows you to create **guided step-by-step demos, onboarding flows, and product tours** inside your Rasengan.js application.

It highlights UI elements, overlays the screen, and displays custom tooltips — all with smooth transitions, precise positioning, and full control over the rendering of each step.

Perfect for:
✔ Onboarding new users
✔ Showcasing features
✔ Product tours
✔ Interactive tutorials
✔ Demo walkthroughs

---

## 🚀 **Installation**

```bash
pnpm add @rasenganjs/kage-demo
```

---

## 📦 **Basic Usage**

You define your demo steps as an array of `KageDemoStep`, each with:

- `target`: a CSS selector pointing to the DOM element to highlight
- `render`: a function returning your custom tooltip component

Here's a full working example:

```tsx
import Step01 from '@/components/demo/step-01';
import Step02 from '@/components/demo/step-02';
import KageDemoContainer, {
  useKageDemo,
  KageDemoStep,
} from '@rasenganjs/kage-demo';

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
    <>
      <section className="w-screen h-screen bg-blue-300 flex flex-col justify-center items-center">
        <KageDemoContainer {...props} />

        <div className="p-4 flex flex-col items-center gap-2">
          <button id="get-started">Get Started</button>

          <button
            onClick={props.start}
            className="bg-black text-white py-2 px-4 rounded-lg"
          >
            Start
          </button>
          <p id="end">End demo</p>
        </div>
      </section>
    </>
  );
}
```

---

## 🧩 **What is a Step?**

Each step describes:

### **🔍 The target**

```ts
target: '#end';
```

This element will be highlighted and centered on screen.

### **💬 The tooltip component**

```tsx
render: (props) => <Step01 {...props} />;
```

Your component receives these props:

```ts
{
  next: () => void,
  prev: () => void,
  end: () => void
}
```

This gives you full freedom to style the tooltip however you want.

---

## 🧠 **The `useKageDemo` Hook**

```ts
const props = useKageDemo(steps);
```

This hook returns:

| Name      | Description                                    |
| --------- | ---------------------------------------------- |
| `start()` | Starts the demo                                |
| `stop()`  | Stops the demo                                 |
| `next()`  | Moves to the next step                         |
| `prev()`  | Moves to the previous step                     |
| `active`  | Whether a step is active                       |
| `index`   | Current step index                             |
| `rect`    | The current highlighted element’s bounding box |

You pass these props directly to:

```tsx
<KageDemoContainer {...props} />
```

---

## 🖼️ **Kage Demo Container**

This component handles:

- the overlay
- the cut-out mask
- the transitions
- the tooltip positioning
- the scroll-into-view logic

Simply place it once in your page:

```tsx
<KageDemoContainer {...props} />
```

---

## ✨ Features

- 🎯 Smart target detection
- 🖼️ Dynamic overlay with cut-out
- 🎢 Smooth transitions
- 🧲 Auto-scrolling
- 🎨 Fully customizable tooltips
- ⚡ Minimal performance impact
- 🧱 Framework-native (no external dependencies)

---

## 🧪 Example of a Custom Step Component

```tsx
export default function Step01({ next, end }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg space-y-3">
      <h2 className="text-lg font-semibold">Welcome!</h2>
      <p>This is the first step of your guided demo.</p>

      <div className="flex gap-2">
        <button
          onClick={next}
          className="px-3 py-2 bg-black text-white rounded-lg"
        >
          Next →
        </button>
        <button onClick={end} className="px-3 py-2 bg-gray-200 rounded-lg">
          Skip
        </button>
      </div>
    </div>
  );
}
```

---

## 📄 License

Licensed under the **MIT License**.
Part of the **Rasengan.js ecosystem** ⚡
