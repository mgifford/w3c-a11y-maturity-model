import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('a11y-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
}

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>('light');

  return {
    subscribe,
    init() {
      const initial = getInitialTheme();
      set(initial);
      document.documentElement.setAttribute('data-theme', initial);
    },
    toggle() {
      update(current => {
        const next: Theme = current === 'light' ? 'dark' : 'light';
        localStorage.setItem('a11y-theme', next);
        document.documentElement.setAttribute('data-theme', next);
        return next;
      });
    }
  };
}

export const themeStore = createThemeStore();
