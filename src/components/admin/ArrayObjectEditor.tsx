"use client";

import React, { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { FormInput, FormTextarea } from "@/components/admin/FormField";

export interface FieldConfig {
    name: string;
    label: string;
    type: "text" | "textarea" | "number";
    placeholder?: string;
    required?: boolean;
}

interface ArrayObjectEditorProps {
    label: string;
    itemName: string; // e.g. "Project", "FAQ"
    value: any[];
    onChange: (value: any[]) => void;
    fields: FieldConfig[];
    error?: string;
    titleField?: string; // Which field to use as the title in the collapsed view
}

export function ArrayObjectEditor({
    label,
    itemName,
    value = [],
    onChange,
    fields,
    error,
    titleField,
}: ArrayObjectEditorProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleAdd = () => {
        const newItem: any = {};
        fields.forEach((field) => {
            newItem[field.name] = "";
        });
        onChange([...value, newItem]);
        setExpandedIndex(value.length);
    };

    const handleRemove = (index: number) => {
        const newValue = value.filter((_, i) => i !== index);
        onChange(newValue);
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else if (expandedIndex !== null && expandedIndex > index) {
            setExpandedIndex(expandedIndex - 1);
        }
    };

    const handleChange = (index: number, field: string, val: any) => {
        const newValue = [...value];
        newValue[index] = { ...newValue[index], [field]: val };
        onChange(newValue);
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
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
                    Add {itemName}
                </button>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="space-y-3">
                {value.map((item, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                    >
                        <div
                            className={`flex items-center justify-between p-3 bg-gray-50 cursor-pointer ${expandedIndex === index ? "border-b border-gray-200" : ""
                                }`}
                            onClick={() => toggleExpand(index)}
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full text-xs font-bold">
                                    {index + 1}
                                </span>
                                <span className="font-medium text-gray-900 text-sm truncate max-w-[200px] sm:max-w-md">
                                    {titleField && item[titleField]
                                        ? item[titleField]
                                        : `${itemName} ${index + 1}`}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(index);
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                {expandedIndex === index ? (
                                    <ChevronUp className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                )}
                            </div>
                        </div>

                        {expandedIndex === index && (
                            <div className="p-4 space-y-4">
                                {fields.map((field) => (
                                    <div key={field.name}>
                                        {field.type === "textarea" ? (
                                            <FormTextarea
                                                label={field.label}
                                                name={`${field.name}-${index}`}
                                                value={item[field.name] ?? ""}
                                                onChange={(e) =>
                                                    handleChange(index, field.name, e.target.value)
                                                }
                                                rows={3}
                                                required={field.required}
                                                placeholder={field.placeholder}
                                            />
                                        ) : (
                                            <FormInput
                                                label={field.label}
                                                name={`${field.name}-${index}`}
                                                type={field.type}
                                                value={item[field.name] ?? ""}
                                                onChange={(e) =>
                                                    handleChange(index, field.name, e.target.value)
                                                }
                                                required={field.required}
                                                placeholder={field.placeholder}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {value.length === 0 && (
                    <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-sm text-gray-500">No {label.toLowerCase()} added yet.</p>
                        <button
                            type="button"
                            onClick={handleAdd}
                            className="mt-2 text-sm text-indigo-600 font-medium hover:text-indigo-500"
                        >
                            Add your first {itemName.toLowerCase()}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
