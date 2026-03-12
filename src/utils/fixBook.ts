import { AppConfig, useConfigStore } from '../stores/configStore';
export async function fixBook(book: any, config: AppConfig) {
    const source = config.installedSources.find(
        s => s.source.name.toLowerCase() === book.source.toLowerCase());
    if (!source?.getDetail) return []
    if (source) {
        return { ...book, getDetail: source.getDetail.bind(source) };
    }
    return book;



}
