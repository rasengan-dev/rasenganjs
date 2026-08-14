import { create } from 'zustand';

/**
 * Controls the main site nav drawer on mobile (< lg): Docs/Skills/Blog/
 * Showcase/Products. Separate from the docs sidebar's own store
 * (@/store/navigation) — the two can be open independently on doc pages.
 */
type State = {
  isOpen: boolean;
};

type Actions = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useMobileMenuStore = create<State & Actions>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
