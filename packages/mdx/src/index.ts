/**
 * License: MIT
 * 
 * Copyright (c) 2024 Dilane Kombou
 * 
 * This package is inspired by @mdx-js/rollup to provide a custom implement of the MDX plugin for RasenganJs.
 */

export * from './types/index.js';
import { plugin, generatePage, globalsPolyfill } from "./utils/index.js";

export default function() {
  return [plugin(), globalsPolyfill()];
}
export { generatePage };