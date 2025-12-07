'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { blogPosts, blogCategories } from '@/config/blog';
import { content } from '@/config/content';
import { formatDate } from '@/lib/utils';

// Note: Metadata should be in a separate metadata export for client components
export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return blogPosts;
    }
    return blogPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {content.blog.title}
          </h1>
          <p className="text-xl text-slate-300">
            {content.blog.subtitle}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-slate-200 shadow-sm sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg transform scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <Card hover className="h-full flex flex-col border-2 border-slate-200 hover:border-indigo-300 transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="default" className="bg-indigo-100 text-indigo-700 border-indigo-200">{post.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="flex-1 flex flex-col p-6">
                      <div className="mb-4 flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 pb-4 border-b border-slate-200">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-200">
                              <Image
                                src={post.author.image}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{post.author.name}</div>
                              <div className="text-xs text-slate-500">{post.author.role}</div>
                            </div>
                          </div>
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <ArrowRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

