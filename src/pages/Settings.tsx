import { useState } from "react";
import { ArrowDownIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from "../stores/themeStore";

export default function Settings() {
    const { theme, setTheme } = useThemeStore();
    const [isOpen, setIsOpen] = useState(false);

    const options = ["system", "light", "dark"];

    return (
        <div className="w-full h-screen p-6 bg-background text-primary-text flex flex-col gap-6">
            <h1 className="text-xl font-semibold">Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-surface border border-primary-text/10 rounded-lg relative">
                    <h2 className="text-sm font-semibold">Appearance</h2>
                    <p className="text-xs text-primary-text/40 mt-1">Theme and UI options.</p>

                    <div className="mt-4 relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex items-center justify-between bg-surface border border-primary-text/10 rounded-xl px-4 py-3 hover:bg-surface/10 transition-all"
                        >
                            <div className="text-left">
                                <p className="text-sm font-medium">Theme</p>
                                <p className="text-xs text-primary-text/40 capitalize">{theme}</p>
                            </div>
                            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-surface border border-primary-text/10 rounded-xl z-50 overflow-hidden">
                                {options.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => { setTheme(opt as any); setIsOpen(false); }}
                                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-surface/5 capitalize"
                                    >
                                        <span className={theme === opt ? "text-primary-text" : "text-gray-400"}>{opt}</span>
                                        {theme === opt && <CheckIcon className="w-4 h-4 text-accent" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-2 p-4 bg-surface border border-primary-text/10 rounded-lg">
                    <h2 className="text-sm font-semibold">Downloads</h2>
                    <div className="mt-4 flex gap-2">
                        <input className="flex-1 bg-surface border border-primary-text/10 rounded-lg px-3 py-2 text-sm outline-none" placeholder="/home/user/downloads" />
                        <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium flex items-center gap-2">
                            <ArrowDownIcon className="w-4 h-4" /> Choose
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}