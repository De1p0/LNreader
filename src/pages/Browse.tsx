import { useConfigStore } from "../stores/configStore";

export default function Browse() {
    const { config } = useConfigStore();

    return (
        <div className="w-full h-full p-8">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-primary-text tracking-tight">
                    Sources
                </h1>
            </header>

            <div className="flex flex-row gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
                {config?.sources?.map((source, index) => (
                    <div
                        key={source.id || index}
                        className="flex items-center gap-4 p-3 rounded-xl bg-secondary-bg/30 border border-primary-text/10 shrink-0 w-60 snap-start"
                    >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface">
                            <img
                                src={source.cover}
                                alt={source.id}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg" />
                        </div>

                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-primary-text truncate capitalize">
                                {source.id}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] font-bold text-primary-text/30 uppercase tracking-tighter bg-primary-text/5 px-1.5 py-0.5 rounded">
                                    EN
                                </span>
                                <span className="text-[11px] text-primary-text/40 font-medium">
                                    Source
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}