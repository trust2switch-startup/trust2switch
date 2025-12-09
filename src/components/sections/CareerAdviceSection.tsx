'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { content } from '@/config/content';
import { CareerAdviceModal } from '@/components/booking/CareerAdviceModal';

export const CareerAdviceSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { headline, content: description, ctaPrimary, ctaSecondary } = content.home.careerAdvice;

    return (
        <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-br from-[#435663] via-indigo-950/30 to-[#435663] relative overflow-hidden">
            {/* Animated background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-indigo-500/10"
                >
                    <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
                        {/* Content */}
                        <div className="flex-1 text-center md:text-left space-y-3">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
                                <Sparkles className="w-3 h-3" />
                                <span>FREE</span>
                            </div>
                            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                                {headline}
                            </h2>
                            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="flex-shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(132,153,79,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsModalOpen(true)}
                                className="group relative bg-gradient-to-r from-[rgba(132,153,79,1)] to-[rgba(132,153,79,1)] hover:from-[rgba(132,153,79,1)] hover:to-[rgba(132,153,79,0.8)] text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg shadow-lg shadow-[rgba(132,153,79,0.4)] flex items-center gap-2 transition-all duration-200 whitespace-nowrap text-sm sm:text-base w-full sm:w-auto justify-center"
                            >
                                <span>{ctaPrimary} Career Advice</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-2 text-xs text-slate-400 hover:text-[rgba(132,153,79,1.0)] transition-colors block w-full text-center"
                            >
                                {ctaSecondary}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <CareerAdviceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
};
