"use client";

import React, { useState, useMemo } from "react";
import {
    ChevronDown,
    ChevronUp,
    BookOpen,
    Target,
    Code2,
    Layers,
    CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface CurriculumModule {
    week: string;
    moduleName: string;
    topics: string[];
    learningOutcomes: string[];
    project?: string;
}

interface CurriculumSectionProps {
    curriculum: CurriculumModule[];
}

export function CurriculumSection({ curriculum }: CurriculumSectionProps) {
    const [expandedModuleIndices, setExpandedModuleIndices] = useState<Record<number, boolean>>({});

    if (!curriculum || curriculum.length === 0) {
        return null;
    }

    const toggleModule = (index: number) => {
        setExpandedModuleIndices((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-slate-50" id="curriculum">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-12">
                    <Badge className="bg-[#84994F]/10 text-[#84994F] hover:bg-[#84994F]/20 mb-3 px-3 py-1 text-sm font-medium border-none shadow-none">
                        Detailed Syllabus
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
                        Comprehensive Curriculum
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                        A structured path from basics to advanced concepts, designed to make you industry-ready.
                    </p>
                </div>

                <div className="space-y-4">
                    {curriculum.map((module, index) => {
                        const isExpanded = expandedModuleIndices[index] ?? (index === 0); // Expand first item by default

                        return (
                            <Card
                                key={index}
                                className={`border-l-4 transition-all duration-300 ${isExpanded ? "border-l-[#84994F] shadow-md" : "border-l-slate-300 hover:border-l-[#84994F]/50"}`}
                            >
                                <button
                                    onClick={() => toggleModule(index)}
                                    className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                                        <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap self-start sm:self-center">
                                            {module.week}
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            {module.moduleName}
                                        </h3>
                                    </div>
                                    <div className={`p-1 rounded-full ${isExpanded ? "bg-slate-100 text-slate-900" : "text-slate-400"}`}>
                                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </div>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 cursor-default">
                                            <div className="grid md:grid-cols-2 gap-6 mt-4">
                                                {/* Topics */}
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3 text-[#84994F] font-semibold">
                                                        <BookOpen className="w-4 h-4" />
                                                        Topics Covered
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {(module.topics || []).map((topic, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                                                                {topic}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Learning Outcomes */}
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3 text-[#84994F] font-semibold">
                                                        <Target className="w-4 h-4" />
                                                        Learning Outcomes
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {(module.learningOutcomes || []).map((outcome, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                                {outcome}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Project / Assignment */}
                                            {module.project && (
                                                <div className="mt-6 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-lg p-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 bg-[#84994F]/10 rounded-lg text-[#84994F]">
                                                            <Code2 className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-slate-900 text-sm mb-1">
                                                                Hands-on Project
                                                            </h4>
                                                            <p className="text-sm text-slate-600">
                                                                {module.project}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
