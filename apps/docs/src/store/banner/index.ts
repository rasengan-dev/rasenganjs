import { create } from 'zustand';

type State = {
  show: boolean;
};

type Actions = {
  setShow: (show: boolean) => void;
};

export const useBannerStore = create<State & Actions>((set) => ({
  show: false,
  setShow: (show: boolean) => set(() => ({ show })),
}));
