"use client";

import React from "react";
import { Plus, Trash2, Copy, CopyPlus, ClipboardPaste } from "lucide-react";
import { FormInput } from "@/components/admin/FormField";
import { useToast } from "@/components/admin/Toast";

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
    const { showToast, ToastContainer } = useToast();

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

    const handleDuplicate = (index: number) => {
        const newValue = [...value];
        newValue.splice(index + 1, 0, newValue[index]);
        onChange(newValue);
        showToast("Item duplicated", "success");
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            showToast("Copied to clipboard", "success");
        } catch (err) {
            showToast("Failed to copy", "error");
        }
    };

    const handlePaste = async (index: number) => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                handleChange(index, text);
                showToast("Pasted from clipboard", "success");
            }
        } catch (err) {
            showToast("Failed to paste", "error");
        }
    };

    return (
        <div className="space-y-4">
            <ToastContainer />
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => handleCopy(JSON.stringify(value))}
                        className="inline-flex items-center text-xs text-gray-600 hover:text-indigo-600"
                        title="Copy entire list"
                    >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy List
                    </button>
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                const text = await navigator.clipboard.readText();
                                const data = JSON.parse(text);
                                if (Array.isArray(data) && data.every(item => typeof item === 'string')) {
                                    onChange(data);
                                    showToast("List pasted successfully", "success");
                                } else {
                                    showToast("Invalid list format", "error");
                                }
                            } catch (err) {
                                showToast("Failed to paste list", "error");
                            }
                        }}
                        className="inline-flex items-center text-xs text-gray-600 hover:text-indigo-600"
                        title="Paste list"
                    >
                        <ClipboardPaste className="h-4 w-4 mr-1" />
                        Paste List
                    </button>
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Item
                    </button>
                </div>
            </div>

            {description && <p className="text-sm text-gray-500">{description}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="space-y-2">
                {value.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start">
                        <div className="flex-grow">
                            <FormInput
                                label=""
                                name={`item-${index}`}
                                value={item}
                                onChange={(e) => handleChange(index, e.target.value)}
                                placeholder={placeholder}
                            />
                        </div>
                        <div className="flex gap-1 mt-1">
                            <button
                                type="button"
                                onClick={() => handleCopy(item)}
                                title="Copy"
                                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                <Copy className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDuplicate(index)}
                                title="Duplicate"
                                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                <CopyPlus className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handlePaste(index)}
                                title="Paste"
                                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                <ClipboardPaste className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                title="Remove"
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
                {value.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No items added.</p>
                )}
            </div>
        </div>
    );
}

