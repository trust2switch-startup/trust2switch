'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { content } from '@/config/content';
import { CareerAdviceModal } from '@/components/booking/CareerAdviceModal';

export const CareerAdviceSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { headline, content: description, ctaPrimary, ctaSecondary } = content.home.careerAdvice;

    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 mb-8">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-semibold tracking-wide uppercase">Free Career Consultation</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white tracking-tight leading-tight">
                        {headline}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                        {description}
                    </p>

                    <div className="flex flex-col items-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsModalOpen(true)}
                            className="group relative bg-white text-slate-900 text-xl font-bold px-12 py-5 rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] flex items-center gap-3 transform transition-all"
                        >
                            <span className="relative z-10">{ctaPrimary}</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-slate-400 hover:text-white text-sm font-medium border-b border-dashed border-slate-600 hover:border-white pb-0.5 transition-all"
                        >
                            {ctaSecondary}
                        </button>
                    </div>
                </motion.div>
            </div>

            <CareerAdviceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
};
