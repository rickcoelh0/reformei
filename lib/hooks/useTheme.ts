'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface IUseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

/**
 * Hook to manage theme (light/dark mode)
 * Persists preference to localStorage and respects system preference
 */
export const useTheme = (): IUseThemeReturn => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get saved theme or system preference
    const saved = localStorage.getItem('theme') as Theme | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (preferred ? 'dark' : 'light');

    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme, mounted };
};

/**
 * Apply theme to document
 */
const applyTheme = (theme: Theme) => {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};
