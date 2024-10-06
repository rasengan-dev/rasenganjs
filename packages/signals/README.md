# - Global State Management for React Applications

`React` and `React Native` Library for managing global state.

[![npm version](https://badge.fury.io/js/%40dilane3%2F.svg)](https://badge.fury.io/js/%40dilane3%2F)
[![npm downloads](https://img.shields.io/npm/dm/%40dilane3%2F)](https://www.npmjs.com/package/@dilane3/)
[![GitHub license](https://img.shields.io/github/license/react-/)](https://github.com/react-//blob/main/LICENSE)

![logo](https://lh4.googleusercontent.com/k2V9Oh-tfABeDjwovtMUqE-lt6cULH0c1EFgb-XNTFh1lt5DVGTGhl3Ty3fMF3xhCBY=w2400)

This library aims to provide you an `easy` and `fast` way to set up and manage the global state of your **`react`** application.

## Documentation

You can read the entire [documentation](https://.dilane3.com) and see how to use this library perfectly.

But, If you want to start directly with the library continue reading this small documentation here.

## Installation

You can use `npm` or `yarn` to install this library into your react application.

### Using npm

```bash
npm install @dilane3/
```

### Using yarn

```bash
yarn add @dilane3/
```

## Prerequisites

```bash
Since version `1.4.0` of ``, you can use it with `strict mode` enabled.
```

But, if you are using a version below `1.4.0`, you have to disable `strict mode` in your react application.

### Disabling strict mode on React

**Before**

```jsx
import React, { StrictMode } from "react";

function App() {
	return (
		<StrictMode>
			{
				// Your application here
			}
		</StrictMode>
	);
}

export default App;
```

**After**

```jsx
import React, { Fragment } from "react";

function App() {
	return (
		<Fragment>
			{
				// Your application here
			}
		</Fragment>
	);
}

export default App;
```

### Disabling strict mode on Next.js

Open the `next.config.js` file and add the following code.

```js
module.exports = {
	reactStrictMode: false,
};
```

## Definition of concepts

\*\*\*\* comes with some new concepts like `signal`, `action`, and `store`.

### 1. Signal

**Signal** represent a specific state that your application has to manage.
For example, for managing users and products inside your ecommerce application you will have to create two separate signals called `usersSignal` and `productsSignal`.

For handle it, there is a special `createSignal` function for this case.

### 2. Action

**Actions** represent functions that act to the state and make it changing over the time.

You have to specify these `actions` when you create yours `signals`.

```txt
Since version `1.4.0` of ``, you can use `async` actions.
```

You can read more about it on the [documentation](https://.dilane3.com/docs/guide/async-actions)

### 3. Store

**Store** is a collection of `signals`. We know that in an application, we can manage many state separately, so `` gives you the possibility to centralize all your state into a special place. The state becomes easier to manage like that.

For handle it, there is a special `createStore` function for this case, which takes an array of `signals`.

## Usage

### First step: Setting up the code structure.

For structuring your code very well you have to follow these steps.

- Create a directory called ``or whatever you want inside the`src` directory
- Inside the ``directory, create two others one called`signals`and`store`.
- Inside the signals directory you will create files that will contains your state declaration with actions that act to this state. (**ie: counter.js**)
- Inside the store directory, just create an index.js file. We will see how to fill it.

Here is the result.

![structure](https://lh3.googleusercontent.com/_z_JTStNFHyXTmjz4GrcphAN6BC_CeKYxN1zwyxWGC-ujpIcVTqthesXT6Lfe8b4t1M=w2400)

### Second step: Creating your signals.

Inside the `signals` directory, create a file called `counter.js` for example.

```js
import { createSignal } from "@dilane3/";

const counterSignal = createSignal({
	name: "counter",
	state: 0,
	actions: {
		increment: (state, payload) => {
			return state + payload;
		},

		decrement: (state, payload) => {
			return state - payload;
		},
	},
});

export default counterSignal;
```

If you want to use `async` actions, you can learn more about it on the [documentation](https://.dilane3.com/docs/guide/async-actions)

### Third step: Creating your store.

Inside the `store` directory, create an `index.js` file.

```js
import { createStore } from "@dilane3/";
import counterSignal from "../signals/counter";

export default createStore([counterSignal]);
```

### Fourth step: Using your store.

Inside your `App.js` file, import your store and wrap your application with the `Provider` component.

```js
import React from "react";
import store from ".//store";
import Provider from "@dilane3/";

function App() {
	return (
		<Provider store={store}>
			{
				// Your application here
			}
		</Provider>
	);
}

export default App;
```

### Fifth step: Using your signals.

Create a component called `Counter` inside the Counter.js file. Then import two hooks from ``called`useSignal`and`useActions` like follow.

```js
import React from "react";
import { useSignal, useActions } from "@dilane3/";

function Counter() {
	// State
	const counter = useSignal("counter");

	// Actions
	const { increment, decrement } = useActions("counter");

	return (
		<div>
			<h1>Counter App</h1>

			<p>Count: {counter}</p>

			<button onClick={() => increment(1)}>Increment</button>
			<button onClick={() => decrement(1)}>Decrement</button>
		</div>
	);
}

export default Counter;
```

Note that the `useSignal` hook takes the name of the signal as a parameter and return the state contained inside that signal.

The `useAction` hook takes the name of the signal too and returns an object that contains all the actions of this signal.

Actually, if you click on the increment button, the counter will increase by one and if you click on the decrement button, the counter will decrease by one.

### Sixth step: Adding operations to your signals.

This feature comes with the version `1.3.0` of ``. It allows you to add operations to your signals.
**Operations** are functions that use your current state and apply some filters on it. They return the result of the operation without changing the state.

For example, if you want to know if the counter is even or odd, you can create an operation called `isEven` like follow.

```js
import { createSignal } from "@dilane3/";

const counterSignal = createSignal({
	name: "counter",
	state: 0,
	actions: {
		increment: (state, payload) => {
			return state + payload;
		},

		decrement: (state, payload) => {
			return state - payload;
		},
	},

	// Operations section
	operations: {
		isEven: (state) => {
			return state % 2 === 0;
		},
	},
});

export default counterSignal;
```

Then, you can use it inside your component like follow.

```js
import React from "react";
import { useSignal, useActions, useOperations } from "@dilane3/";

function Counter() {
	// State
	const counter = useSignal("counter");

	// Actions
	const { increment, decrement } = useActions("counter");

	// Operations
	const { isEven } = useOperations("counter");

	return (
		<div>
			<h1>Counter App</h1>

			<p>Count: {counter}</p>

			<p>is even: {isEven() ? "yes" : "no"}</p>

			<button onClick={() => increment(1)}>Increment</button>
			<button onClick={() => decrement(1)}>Decrement</button>
		</div>
	);
}

export default Counter;
```

## API

### `createSignal`

This function takes an object as a parameter and returns a signal.

The object must contain the following properties:

| Properties | Type     | Description                                            |
| ---------- | -------- | ------------------------------------------------------ |
| `name`     | `string` | The name of the signal. It must be unique.             |
| `state`    | `any`    | The initial state of the signal.                       |
| `actions`  | `object` | An object that contains all the actions of the signal. |

Structure of the `actions` object:

```js
{
	actionName: (state, payload) => {
		// Do something with the state and the payload
		return state;
	};
}
```

All actions must return the new state of the signal.

### `createStore`

This function takes an array of signals as a parameter and returns a store.

```js
const store = createStore([signal1, signal2, signal3]);
```

### `Provider`

This component takes a store as a parameter and wraps your application with it.

```jsx
const App = () => (
	<Provider store={store}>
		{
			// Your application here
		}
	</Provider>
);
```

### `useSignal`

This hook takes the name of the signal as a parameter and returns the state contained inside that signal.

```js
const counter = useSignal("counter");
```

### `useActions`

This hook takes the name of the signal as a the first parameter and returns an object that contains all the actions of this signal.

```js
const { increment, decrement } = useActions("counter");
```

### `useAction`

This hook takes the name of the signal as the first parameter and the name of the action as the second one and then return that action.

```js
const increment = useAction("counter", "increment");
```

See more on the [documentation](https://.dilane3.com/docs/guide/hooks/useAction)

## TypeScript Support

`` support TypeScript, so that you can use it directly into your application.

See how to integrate it on the [documentation](https://.dilane3.com/docs/typescript) website

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

- Github: [**@dilane3**](https://github.com/dilane3)
- Twitter: [**@dilanekombou**](https://twitter.com/DilaneKombou)
- LinkedIn: [**@dilanekombou**](https://www.linkedin.com/in/dilane-kombou-6824b2207/)
- website: [**dilane3.com**](https://dilane3.com/)

## Contributing

Contributions, issues and feature requests are welcome!
See the [Contributing Guide](./CONTRIBUTING.md).
