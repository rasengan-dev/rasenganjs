export interface KageDemoStep {
  target: string; // CSS selector
  render: (props: {
    next: () => void;
    prev: () => void;
    end: () => void;
  }) => React.ReactNode;
}

export interface KageDemoInstance {
  currentIndex: number;
  currentStep: KageDemoStep | null;
  highlightRect: DOMRect | null;
  start: () => void;
  next: () => void;
  prev: () => void;
  end: () => void;
}

export interface KageDemoProps
  extends Omit<KageDemoInstance, 'steps' | 'currentIndex'> {
  autoStart?: boolean;
}
