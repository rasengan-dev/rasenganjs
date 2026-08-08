import { create } from 'zustand';

type State = {
  isOpen: boolean;
};

type Actions = {
  toggle: () => void;
};

export const useNavigationStore = create<State & Actions>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
