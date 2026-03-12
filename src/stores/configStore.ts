import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DefaultExtension, SourceResponse, Manga } from '../types/ExtensionData';
import { ThemeName, THEMES } from './themes/themes';

export interface AppConfig {
    theme: ThemeName;
    sources: SourceResponse[];
    sourceList: string;
    installedSourcesName: SourceResponse[];
    installedSources: DefaultExtension[];
    currentPage: PageName;
    pageRoutes: {
        library: {
            route: string;
            state: any
        };
        search: {
            route: string;
            state: any
        };
        browse: {
            route: string;
            state: any
        };
        settings: {
            route: string;
            state: any
        };
    };
    searchResults: { [key: string]: Manga[] };
    searchQuery: string;
}

interface ConfigStore {
    config: AppConfig;
    setConfig: <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => void;
    setPageRoute: (page: keyof AppConfig['pageRoutes'], path: string) => void;
    setSearch: (results: { [key: string]: Manga[] }, query: string) => void;
    setPageState: (page: keyof AppConfig['pageRoutes'], state: any) => void;
    setPage: (page: keyof AppConfig['pageRoutes'], path: string, state: any) => void;
    clearSearch: () => void;
}

export const useConfigStore = create<ConfigStore>()(
    persist(
        (set) => ({
            config: {
                theme: 'system',
                sources: [],
                pageRoutes: {
                    library: {
                        route: "/",
                        state: {}
                    },
                    search: {
                        route: "/",
                        state: {}
                    },
                    browse: {
                        route: "/",
                        state: {}
                    },
                    settings: {
                        route: "/",
                        state: {}
                    },
                },
                sourceList: "",
                currentPage: "library",
                installedSources: [],
                installedSourcesName: [],
                searchResults: {},
                searchQuery: "",
            },
            setConfig: (key, value) => {
                set((state) => ({
                    config: { ...state.config, [key]: value },
                }));

                if (key === 'theme') {
                    applyTheme(value as AppConfig['theme']);
                }
            },
            setPageState: (page, stateValue) => {
                set((state) => ({
                    config: {
                        ...state.config,
                        pageRoutes: {
                            ...state.config.pageRoutes,
                            [page]: {
                                ...state.config.pageRoutes[page],
                                state: stateValue,
                            },
                        },
                    },
                }));
            },
            setPage: (page, path, stateValue) => {
                set((store) => ({
                    config: {
                        ...store.config,
                        currentPage: page,
                        pageRoutes: {
                            ...store.config.pageRoutes,
                            [page]: {
                                ...store.config.pageRoutes[page],
                                route: path,
                                state: stateValue,
                            },
                        },
                    },
                }));
            },
            setPageRoute: (page, path) => {
                set((state) => ({
                    config: {
                        ...state.config,
                        pageRoutes: {
                            ...state.config.pageRoutes,
                            [page]: {
                                ...state.config.pageRoutes[page],
                                route: path,
                            },
                        },
                    },
                }));
            },
            setSearch: (results, query) => {
                set((state) => ({
                    config: { ...state.config, searchResults: results, searchQuery: query },
                }));
            },
            clearSearch: () => {
                set((state) => ({
                    config: { ...state.config, searchResults: {}, searchQuery: "" },
                }));
            },
        }),
        { name: 'urayomi-settings' }
    )
);

export function applyTheme(theme: ThemeName) {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const resolved =
        theme === "system"
            ? isSystemDark
                ? "dark"
                : "light"
            : theme;

    Object.values(THEMES).forEach((t) => {
        if (t.class) root.classList.remove(t.class);
    });

    const themeClass = THEMES[resolved].class;
    if (themeClass) root.classList.add(themeClass);
}