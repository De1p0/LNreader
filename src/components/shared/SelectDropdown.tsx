import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

interface SelectProps<T> {
    label: string;
    value: T;
    options: T[];
    onChange: (value: T) => void;
}

export default function SelectDropDown<T extends string>({ label, value, options, onChange }: SelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="relative w-full" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-surface border border-primary-text/10 rounded px-4 py-3 hover:bg-primary-text/5 transition-all"
            >
                <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider text-primary-text/40 font-bold">{label}</p>
                    <p className="text-sm font-medium capitalize">{value}</p>
                </div>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-surface border border-primary-text/10 rounded-lg z-1337 shadow-2xl py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => {
                                onChange(opt);
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-primary-text/5 capitalize transition-colors"
                        >
                            <span className={value === opt ? "text-primary-text font-semibold" : "text-primary-text/60"}>
                                {opt}
                            </span>
                            {value === opt && <CheckIcon className="w-4 h-4 text-accent" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}