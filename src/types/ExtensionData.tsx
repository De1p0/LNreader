export type SourceConfig = {
    name: string;
    langs: string[];
    baseUrl: string;
    apiUrl: string;
    iconUrl: string;
    typeSource: "single" | "multi";
    itemType: number;
    version: string;
    pkgPath: string;
};

export type MangaListItem = {
    name: string;
    imageUrl: string;
    link: string;
};

export type MangaListResponse = {
    list: MangaListItem[];
    hasNextPage: boolean;
};

export type MangaDetail = {
    name: string;
    description: string;
    author: string;
    genre: string[];
    status: 0 | 1 | 2 | 3;
    imageUrl: string;
};

export type ApiRelationship = {
    id: string;
    type: string;
    attributes?: {
        name?: string;
        fileName?: string;
    };
};

export type ApiMangaAttributes = {
    title: Record<string, string>;
    description: Record<string, string>;
    status: "ongoing" | "completed" | "hiatus" | "cancelled";
    tags: {
        attributes: {
            name: Record<string, string>;
        };
    }[];
};

export type ApiManga = {
    id: string;
    attributes: ApiMangaAttributes;
    relationships: ApiRelationship[];
};

export type ApiResponse<T> = {
    data: T[];
};

export interface DefaultExtension {
    source: SourceConfig;

    fetchUrl(url: string): Promise<any>;

    getPopular(page?: number): Promise<MangaListResponse>;

    getLatestUpdates(page?: number): Promise<MangaListResponse>;

    search(query: string, page?: number): Promise<MangaListResponse>;

    getDetail(mangaId: string): Promise<MangaDetail>;

    mangaRes(data: ApiResponse<ApiManga>): MangaListResponse;
}
export type SourceResponse = {
    "id": string,
    "cover": string,
    "script": string
}  