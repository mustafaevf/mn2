import React, { useState } from "react";

interface CheckboxProps  {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const Checkbox = ({label, value, onChange}: CheckboxProps) => {

    const handleChange = () => {
        onChange(!value);
    };

    return (
        <label className="flex items-center space-x-3 cursor-pointer select-none">
        <div className="relative">
            <input
                type="checkbox"
                checked={value}
                onChange={handleChange}
                className="sr-only"
            />
            <div
                className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition ${
                    value
                        ? "bg-background border-border-600"
                        : "border-gray-300"
                }`}
            >
                {value && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>
        </div>
        <span className="text-gray-700">{label}</span>
    </label>
    );
};

export default Checkbox;