import { useState, useCallback } from 'react';
import { ThemeContextType, Theme } from './index';

export const useTheme = (): ThemeContextType => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme: toggleTheme };
};
