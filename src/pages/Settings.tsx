import { useState } from "react";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import DownloadsSettings from "../components/settings/DownloadSettings";
import ExtensionsSettings from "../components/settings/ExtensionSettings";

export default function Settings() {
    const [extensionCode, setExtensionCode] = useState("");
    return (
        <div className="w-full h-screen p-6 bg-background text-primary-text flex flex-col gap-6 overflow-auto">
            <h1 className="text-xl font-semibold">Settings</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AppearanceSettings />
                <DownloadsSettings />
                <ExtensionsSettings
                    extensionCode={extensionCode}
                    setExtensionCode={setExtensionCode}
                />
            </div>
        </div>
    );
}    