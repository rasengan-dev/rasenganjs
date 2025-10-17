import { createStore, middleware } from '@rasenganjs/kurama';

interface State {
  mode: 'light' | 'dark';
}

interface Actions {
  toggle: () => void;
}

export const useThemeStore = createStore<State & Actions>(
  middleware.compose(
    middleware.logger,
    middleware.persist({ name: 'theme', storage: 'session' })
  )((set) => ({
    mode: 'light',
    toggle: () =>
      set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
  }))
);
