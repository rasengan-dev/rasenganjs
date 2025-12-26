// Types
import type { KageDemoStep } from './core/types.js';

// Components
import { KageDemo as KageDemoContainer } from './ui/index.js';

// Hooks
import { useKageDemo } from './core/hooks.js';

export default KageDemoContainer;

export { useKageDemo, KageDemoStep };
