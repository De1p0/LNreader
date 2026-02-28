import { create } from 'zustand';

type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeStore {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
    const savedTheme = localStorage.getItem('urayomi.theme') as ThemeMode | null;
    const initialTheme: ThemeMode = savedTheme && ['system', 'light', 'dark'].includes(savedTheme) ? savedTheme : 'system';

    return {
        theme: initialTheme,
        setTheme: (theme: ThemeMode) => {
            set({ theme });
            localStorage.setItem('urayomi.theme', theme);
            applyTheme(theme);
        },
    };
});

export function applyTheme(theme: ThemeMode) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark =
        theme === 'dark' ||
        (theme === 'system' && mq.matches);

    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}
