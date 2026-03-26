import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { THEME_PRESETS } from './themePresets';

export interface ThemeColors {
  brand: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

interface ThemeState {
  themeMode: 'light' | 'dark';
  brokerName: string;
  logoUrl: string | null;
  colors: ThemeColors;
  toggleTheme: () => void;
  setBrokerName: (name: string) => void;
  setLogoUrl: (url: string) => void;
  setThemeColors: (colors: ThemeColors) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeMode: 'dark',
      brokerName: 'Portal Financeiro',
      logoUrl: null,
      colors: THEME_PRESETS['blue'],
      toggleTheme: () => set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
      setBrokerName: (name) => set({ brokerName: name }),
      setLogoUrl: (url) => set({ logoUrl: url }),
      setThemeColors: (colors) => set({ colors }),
    }),
    {
      name: 'portal-theme-storage',
    }
  )
);
