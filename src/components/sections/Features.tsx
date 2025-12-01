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
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            {content.home.features.title}
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {content.home.features.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.home.features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Users;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 rounded-xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


