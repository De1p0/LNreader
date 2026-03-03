import { fetch } from "@tauri-apps/plugin-http";

export const corFetch = (url: string, init: any = {}) => {
    return fetch(url, {
        ...init,
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            ...init?.headers,
        },
    });
};