import { useState, useCallback } from 'react';
import { ThemeContextType, Theme } from './index';

export const useTheme = (): ThemeContextType => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  return { theme, setTheme: toggleTheme };
};
