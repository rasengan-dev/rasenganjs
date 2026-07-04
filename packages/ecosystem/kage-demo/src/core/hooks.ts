import { useState } from 'react';
import type { KageDemoInstance, KageDemoStep } from './types.js';

export function useKageDemo(steps: KageDemoStep[]): KageDemoInstance {
  const [state, setState] = useState<{
    index: number;
    step: KageDemoStep | null;
    rect: DOMRect | null;
  }>({ index: -1, step: null, rect: null });

  const updateStep = (index: number) => {
    if (typeof window === 'undefined') return;

    if (index < 0 || index >= steps.length) {
      setState({ index: -1, step: null, rect: null });
      return;
    }

    const step = steps[index];
    const target = document.querySelector(step.target);
    if (!target) {
      setState({ index, step, rect: null });
      return;
    }

    target.scrollIntoView({ behavior: 'instant', block: 'center' });

    const rect = target.getBoundingClientRect();
    setState({ index, step, rect });
  };

  const start = () => updateStep(0);
  const end = () => setState({ index: -1, step: null, rect: null });
  const next = () =>
    updateStep(state.index + 1 < steps.length ? state.index + 1 : -1);
  const prev = () => updateStep(state.index > 0 ? state.index - 1 : 0);

  return {
    currentStep: state.step,
    currentIndex: state.index,
    highlightRect: state.rect,
    start,
    next,
    prev,
    end,
  };
}
