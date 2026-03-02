import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import { useConfigStore } from "../../stores/configStore";
import { getSourceList } from "../../ExtensionHandler/SourceLoader";
import { useEffect, useState } from "react";

interface ExtensionsSettingsProps {
    extensionCode: string;
    setExtensionCode: (code: string) => void;
}

export default function ExtensionsSettings({ extensionCode, setExtensionCode }: ExtensionsSettingsProps) {
    const { config, setConfig } = useConfigStore();
    let [sources, setSources] = useState("")
    const handleInstallExtension = async () => {
        setConfig("sources", []);

        const newSources = await getSourceList(sources); // array for now until gh updates
        setConfig("sourceList", sources);

        setConfig("sources", newSources);

        console.log(useConfigStore.getState().config);
    };

    useEffect(() => {

        console.log(config.sources);
    }, [config.sources]);

    return (
        <div className="md:col-span-3 p-4 bg-surface border border-primary-text/10 rounded">
            <div className="flex items-center gap-2">
                <PuzzlePieceIcon className="w-4 h-4" />
                <h2 className="text-sm font-semibold">Manga Extensions</h2>
            </div>
            <p className="text-xs text-primary-text/40 mt-1">
                Paste an extension script or repository URL to add new sources.
            </p>

            <div className="mt-4 flex flex-col gap-3">
                <textarea
                    defaultValue={config.sourceList}
                    onChange={(e) => setSources(e.target.value)}
                    className="w-full h-24 bg-background/50 border border-primary-text/10 rounded p-3 text-sm font-mono outline-none focus:border-accent/50 resize-none"
                    placeholder="Paste JSON or script URL here..."
                />

                <div className="flex w-full justify-end gap-2">

                    <button
                        onClick={handleInstallExtension}
                        className="px-6 py-2 bg-accent text-primary-text rounded text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}