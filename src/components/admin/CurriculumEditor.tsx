"use client";

import React, { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { FormInput, FormTextarea } from "@/components/admin/FormField";

interface CurriculumModule {
    week: string;
    moduleName: string;
    topics: string[];
    learningOutcomes: string[];
    project?: string;
}

interface CurriculumEditorProps {
    value: CurriculumModule[];
    onChange: (value: CurriculumModule[]) => void;
    error?: string;
}

export function CurriculumEditor({
    value = [],
    onChange,
    error,
}: CurriculumEditorProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    const handleAddModule = () => {
        const newModule: CurriculumModule = {
            week: `Week ${value.length + 1}`,
            moduleName: "",
            topics: [],
            learningOutcomes: [],
            project: "",
        };
        onChange([...value, newModule]);
        setExpandedIndex(value.length);
    };

    const handleRemoveModule = (index: number) => {
        const newValue = value.filter((_, i) => i !== index);
        onChange(newValue);
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else if (expandedIndex !== null && expandedIndex > index) {
            setExpandedIndex(expandedIndex - 1);
        }
    };

    const handleChange = (
        index: number,
        field: keyof CurriculumModule,
        fieldValue: any
    ) => {
        const newValue = [...value];

        if (field === 'topics' || field === 'learningOutcomes') {
            // Handle array inputs from textarea (newline separated)
            if (typeof fieldValue === 'string') {
                newValue[index] = {
                    ...newValue[index],
                    [field]: fieldValue.split('\n').filter(line => line.trim() !== '')
                };
            } else {
                newValue[index] = {
                    ...newValue[index],
                    [field]: fieldValue
                };
            }
        } else {
            newValue[index] = {
                ...newValue[index],
                [field]: fieldValue,
            };
        }
        onChange(newValue);
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Helper to join array for textarea display
    const getArrayString = (arr: string[]) => {
        return Array.isArray(arr) ? arr.join('\n') : '';
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    Curriculum Modules
                </label>
                <button
                    type="button"
                    onClick={handleAddModule}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Module
                </button>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="space-y-3">
                {value.map((module, index) => (
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
                                <span className="font-medium text-gray-900 text-sm">
                                    {module.week || "New Week"} - {module.moduleName || "Untitled Module"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveModule(index);
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        label="Week / Timeline"
                                        name={`week-${index}`}
                                        value={module.week}
                                        onChange={(e) =>
                                            handleChange(index, "week", e.target.value)
                                        }
                                        placeholder="e.g. Week 1 or Day 1-2"
                                        required
                                    />
                                    <FormInput
                                        label="Module Name"
                                        name={`moduleName-${index}`}
                                        value={module.moduleName}
                                        onChange={(e) =>
                                            handleChange(index, "moduleName", e.target.value)
                                        }
                                        placeholder="e.g. Introduction to React"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormTextarea
                                        label="Topics (one per line)"
                                        name={`topics-${index}`}
                                        value={getArrayString(module.topics)}
                                        onChange={(e) =>
                                            handleChange(index, "topics", e.target.value)
                                        }
                                        rows={4}
                                        required
                                    />
                                    <FormTextarea
                                        label="Learning Outcomes (one per line)"
                                        name={`learningOutcomes-${index}`}
                                        value={getArrayString(module.learningOutcomes)}
                                        onChange={(e) =>
                                            handleChange(index, "learningOutcomes", e.target.value)
                                        }
                                        rows={4}
                                        required
                                    />
                                </div>

                                <FormInput
                                    label="Project (Optional)"
                                    name={`project-${index}`}
                                    value={module.project || ''}
                                    onChange={(e) =>
                                        handleChange(index, "project", e.target.value)
                                    }
                                    placeholder="e.g. Build a To-Do App"
                                />
                            </div>
                        )}
                    </div>
                ))}

                {value.length === 0 && (
                    <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-sm text-gray-500">No curriculum modules added yet.</p>
                        <button
                            type="button"
                            onClick={handleAddModule}
                            className="mt-2 text-sm text-indigo-600 font-medium hover:text-indigo-500"
                        >
                            Add your first module
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
