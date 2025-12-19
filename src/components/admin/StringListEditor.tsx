"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { FormInput } from "@/components/admin/FormField";

interface StringListEditorProps {
    label: string;
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    error?: string;
    description?: string;
}

export function StringListEditor({
    label,
    value = [],
    onChange,
    placeholder = "",
    error,
    description,
}: StringListEditorProps) {
    const handleAdd = () => {
        onChange([...value, ""]);
    };

    const handleRemove = (index: number) => {
        const newValue = value.filter((_, i) => i !== index);
        onChange(newValue);
    };

    const handleChange = (index: number, val: string) => {
        const newValue = [...value];
        newValue[index] = val;
        onChange(newValue);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <button
                    type="button"
                    onClick={handleAdd}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                </button>
            </div>

            {description && <p className="text-sm text-gray-500">{description}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="space-y-2">
                {value.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <div className="flex-grow">
                            <FormInput
                                label=""
                                name={`item-${index}`}
                                value={item}
                                onChange={(e) => handleChange(index, e.target.value)}
                                placeholder={placeholder}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors mt-1"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                ))}
                {value.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No items added.</p>
                )}
            </div>
        </div>
    );
}
