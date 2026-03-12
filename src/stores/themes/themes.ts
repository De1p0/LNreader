export interface ThemeConfig {
    class: string | null;
    mode: "light" | "dark";
}

export const THEMES: Record<string, ThemeConfig> = {
    system: { class: null, mode: "light" },
    light: { class: "light", mode: "light" },
    dark: { class: "dark", mode: "dark" },
    scarlet: { class: "scarlet", mode: "dark" },
    nord: { class: "nord", mode: "dark" },
    midnight: { class: "midnight", mode: "dark" },
    forest: { class: "forest", mode: "dark" },
    candy: { class: "candy", mode: "light" },
} as const;

export type ThemeName = keyof typeof THEMES;

export const THEME_NAMES: ThemeName[] = Object.keys(THEMES) as ThemeName[];