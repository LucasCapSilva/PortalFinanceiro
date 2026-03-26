import { useEffect } from 'react';
import { useThemeStore } from '../../store/useThemeStore';

export const ThemeInitializer = () => {
  const { themeMode, colors } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;

    // Update dark mode
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update CSS variables for colors
    Object.entries(colors.brand).forEach(([shade, value]) => {
      root.style.setProperty(`--color-brand-${shade}`, value);
    });
    Object.entries(colors.secondary).forEach(([shade, value]) => {
      root.style.setProperty(`--color-secondary-${shade}`, value);
    });

  }, [themeMode, colors]);

  return null;
};
