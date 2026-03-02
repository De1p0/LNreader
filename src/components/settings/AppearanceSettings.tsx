import { useState } from "react";
import { EyeIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import ToggleButton from "../shared/ToggleButton";
import SelectDropDown from "../shared/SelectDropdown";
import { useConfigStore } from "../../stores/configStore";

export default function AppearanceSettings() {
    const { config, setConfig } = useConfigStore();

    return (
        <div className="p-4 bg-surface border border-primary-text/10 rounded relative">
            <div className="flex items-center gap-2">
                <EyeIcon className="w-4 h-4" />
                <h2 className="text-sm font-semibold">Appearance</h2>
            </div>
            <p className="text-xs text-primary-text/40 mt-1">Theme and UI options.</p>

            <div className="mt-4 relative space-y-2">
                <SelectDropDown
                    label="Theme"
                    value={config.theme}
                    options={["system", "light", "dark"]}
                    onChange={(val) => setConfig('theme', val as any)}
                />
                {/* <ToggleButton /> */}


            </div>
        </div>
    );
}