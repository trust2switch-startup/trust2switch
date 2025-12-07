'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Briefcase, Infinity, MessageCircle, Clock } from 'lucide-react';
import { content } from '@/config/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  code: Code,
  briefcase: Briefcase,
  infinity: Infinity,
  'message-circle': MessageCircle,
  clock: Clock,
};

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
            {content.home.features.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {content.home.features.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.home.features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Users;
            // Alternate between indigo and orange for visual variety
            const useOrange = index % 2 === 1;
            const iconGradient = useOrange ? 'from-orange-500 to-orange-600' : 'from-indigo-500 to-indigo-600';
            const bgGradient = useOrange ? 'from-orange-50 to-orange-100/50' : 'from-indigo-50 to-indigo-100/50';
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="group p-6 rounded-2xl bg-white border-2 border-slate-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0`}></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${iconGradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 group-hover:text-slate-700 transition-colors leading-relaxed">{feature.description}</p>
                </div>

                {/* Decorative Corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${iconGradient} opacity-5 rounded-bl-full`}></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


