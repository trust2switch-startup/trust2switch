'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Target, Eye, Award, Users } from 'lucide-react';
import { content } from '@/config/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  target: Target,
  eye: Eye,
  award: Award,
  users: Users,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {content.about.title}
          </h1>
          <p className="text-xl text-primary-100">
            {content.about.subtitle}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                    {content.about.mission.title}
                  </h2>
                  <p className="text-neutral-700 leading-relaxed">
                    {content.about.mission.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent>
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                    {content.about.vision.title}
                  </h2>
                  <p className="text-neutral-700 leading-relaxed">
                    {content.about.vision.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.about.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardContent>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

