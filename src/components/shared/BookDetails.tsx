import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { MangaDetail } from "../../types/ExtensionData";

// 1. Import ReactMarkdown
import ReactMarkdown from "react-markdown";
import { useConfigStore } from "../../stores/configStore";
import { fixBook } from "../../utils/fixBook";

export default function BookDetailsPage() {
    const { config, setPageRoute } = useConfigStore();
    const [mangaDetail, setMangaDetail] = useState({} as MangaDetail);
    const [descriptionExp, setDescExp] = useState(false);
    const [genreExp, setGenreExp] = useState(false);

    const description = mangaDetail.description || "";
    const manga = config.pageRoutes[config.currentPage].state;

    useEffect(() => {
        const getDetail = async () => {
            if (!config.installedSources || config.installedSources.length === 0) return;

            if (manga?.getDetail) {
                const detail = await manga.getDetail(manga.link);
                setMangaDetail(detail);
            } else {
                const fixedBook = await fixBook(manga, config);
                if (fixedBook.getDetail) {
                    const detail = await fixedBook.getDetail(fixedBook.link);
                    setMangaDetail(detail);
                } else {
                    setMangaDetail(fixedBook);
                }
            }
        };

        getDetail();
    }, [manga, config.installedSources]);
    return (
        <div className="p-8 w-full h-full text-primary-text overflow-y-auto">
            <div className="flex items-start gap-10">
                <div className="sticky top-0 shrink-0">

                    <img
                        src={manga?.imageUrl}
                        alt={manga?.name}
                        className="w-72 object-cover aspect-2/3 rounded-xl"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h1 className="text-5xl font-black tracking-tight">{manga?.name}</h1>

                    <div className="flex flex-row flex-wrap w-full gap-2 mt-6 items-center">
                        {mangaDetail?.genre?.slice(0, genreExp ? undefined : 5).map((genre) => (
                            <div
                                key={genre}
                                className="shrink-0 bg-surface/80 py-1.5 px-3 rounded-lg text-xs font-semibold text-primary-text/70"
                            >
                                {genre}
                            </div>
                        ))}

                        {mangaDetail?.genre?.length > 5 && (
                            <button
                                onClick={() => setGenreExp(!genreExp)}
                                className="shrink-0 bg-accent/10 text-accent/80 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                            >
                                {genreExp ? "Show less" : `+${mangaDetail.genre.length - 5} more`}
                            </button>
                        )}
                    </div>

                    <div className="mt-6 max-w-3xl">
                        <div className={`text-md leading-relaxed text-primary-text/60 ${descriptionExp ? "" : "line-clamp-3"}`}>
                            <ReactMarkdown
                                components={{
                                    p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                    hr: ({ node, ...props }) => <hr className="border-primary-text/10 my-4" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                }}
                            >
                                {description}
                            </ReactMarkdown>
                        </div>

                        {description && (
                            <button
                                onClick={() => setDescExp(!descriptionExp)}
                                className="mt-2 text-accent text-sm font-medium cursor-pointer hover:underline"
                            >
                                {descriptionExp ? "Read less" : "Read full description"}
                            </button>
                        )}
                    </div>

                    <hr className="my-8 border-primary-text/5" />

                    <div className="mt-2">
                        <h2 className="text-2xl font-bold mb-4">Chapters</h2>
                        <div className="grid grid-cols-1">
                            {mangaDetail.chapters?.map((chapter, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center justify-between p-4 border-b border-primary-text/5 hover:bg-surface transition-all cursor-pointer active:bg-primary-text/10"
                                >
                                    <span className="font-medium text-primary-text/70 transition-all duration-200 flex flex-col">
                                        {chapter.name}
                                        <span className="text-sm text-primary-text/50 transition-all duration-200">
                                            {`${(() => {
                                                const date = new Date(+chapter.dateUpload);
                                                return date.toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                });
                                            })()}   •   ${chapter.scanlator}`}
                                        </span>
                                    </span>



                                    <span className="text-xs font-bold text-primary-text/0 group-hover:text-primary-text/20 transition-all uppercase tracking-widest">
                                        Read
                                    </span>
                                </div>
                            ))}
                        </div>

                        {!mangaDetail.chapters && (
                            <div className="animate-pulse text-primary-text/20">Loading chapters...</div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}