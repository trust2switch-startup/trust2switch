'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Briefcase } from 'lucide-react';

export const IndustryProjects: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-indigo-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/10 to-orange-400/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10 p-6 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              {/* Icon Section */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#435663] to-[#435663] flex items-center justify-center shadow-lg">
                  <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 sm:mb-3 leading-tight">
                  Already Skilled but Missing Industry-Grade Projects?
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                  Explore industry-grade projects in your field, shared by experienced engineers from top MNCs. Ideal for skilled professionals and freshers who need real-world, resume-ready projects to showcase practical expertise, strengthen their portfolio, and boost job placement opportunities.
                </p>
                
                {/* CTA Button */}
                <Link href="/shop" className="inline-block">
                  <Button
                    variant="primary"
                    size="md"
                    className="group bg-[#84994F] flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <span>Explore Projects & Research Papers</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

