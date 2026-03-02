import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DefaultExtension, SourceResponse } from '../types/ExtensionData';

export interface AppConfig {
    theme: 'system' | 'light' | 'dark';
    sources: SourceResponse[],
    sourceList: string,
    installedSources: DefaultExtension[],
}

interface ConfigStore {
    config: AppConfig;
    setConfig: <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => void;
}

export const useConfigStore = create<ConfigStore>()(
    persist(
        (set) => ({
            config: {
                theme: 'system',
                sources: [],
                sourceList: "",
                installedSources: [],
            },
            setConfig: (key, value) => {
                set((state) => ({
                    config: { ...state.config, [key]: value },
                }));

                if (key === 'theme') {
                    applyTheme(value as AppConfig['theme']);
                }
            },
        }),
        {
            name: 'urayomi-settings',
        }
    )
);

export function applyTheme(theme: AppConfig['theme']) {
    if (typeof window === 'undefined') return;
    const isDark = theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
}