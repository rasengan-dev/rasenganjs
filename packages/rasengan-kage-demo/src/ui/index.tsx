import { useEffect } from 'react';
import { KageDemoProps } from '../core/types.js';
import { Overlay } from './overlay.js';
import { Tooltip } from './tooltip.js';

export const KageDemo: React.FC<KageDemoProps> = ({
  autoStart = false,
  currentStep,
  highlightRect,
  start,
  next,
  prev,
  end,
}) => {
  useEffect(() => {
    if (autoStart) start();
  }, [autoStart]);

  if (currentStep === null) return null;

  return (
    <>
      <Overlay rect={highlightRect} />
      <Tooltip step={currentStep} onNext={next} onPrev={prev} onEnd={end} />
    </>
  );
};
