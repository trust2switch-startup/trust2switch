'use client';

import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { products, productSortOptions } from '@/config/products';
import { content } from '@/config/content';
import { Product } from '@/types';
import { Search, Code, FileText, Layout } from 'lucide-react';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [sortBy, setSortBy] = useState('popular');

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {
      'Projects': [],
      'Research Papers': [],
      'Templates': []
    };

    products.forEach(product => {
      if (grouped[product.category]) {
        grouped[product.category].push(product);
      }
    });

    return grouped;
  }, []);

  const getFilteredProducts = (categoryProducts: Product[]) => {
    let filtered = [...categoryProducts];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'popular') {
      filtered.sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return (b.rating || 0) - (a.rating || 0);
      });
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };


  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Projects':
        return <Code className="w-4 h-4" />;
      case 'Research Papers':
        return <FileText className="w-4 h-4" />;
      case 'Templates':
        return <Layout className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'All', label: 'All Products', count: products.length },
    { id: 'Projects', label: 'Projects', count: productsByCategory['Projects'].length },
    { id: 'Research Papers', label: 'Research Papers', count: productsByCategory['Research Papers'].length },
    { id: 'Templates', label: 'Templates', count: productsByCategory['Templates'].length },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compact Header */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-8 sm:py-10 lg:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-1 sm:mb-2">
                {content.shop?.title || 'Shop'}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-slate-300">
                {content.shop?.subtitle || 'Browse and purchase projects, research papers, and templates'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Search & Filters Bar */}
      <section className="sticky top-[88px] sm:top-[72px] z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search products, SKUs, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 py-1.5 sm:py-2 text-xs sm:text-sm"
              />
            </div>
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-xs sm:text-sm text-slate-700 min-w-[140px] sm:min-w-[160px]"
            >
              {productSortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-[156px] sm:top-[140px] z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {getCategoryIcon(tab.id)}
                <span>{tab.label}</span>
                <Badge variant="default" className="bg-slate-200 text-slate-700 text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5">
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Sections */}
      <section className="py-6 sm:py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* All Products View */}
          {activeTab === 'All' ? (
            <>
              {Object.entries(productsByCategory).map(([category, categoryProducts]) => {
                const filtered = getFilteredProducts(categoryProducts);
                if (filtered.length === 0) return null;

                return (
                  <div key={category} className="mb-8 sm:mb-10 lg:mb-12">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category)}
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{category}</h2>
                      </div>
                      <Badge variant="default" className="bg-slate-200 text-slate-700">
                        {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
                      </Badge>
                    </div>
                    <div className="overflow-x-auto scrollbar-hide scroll-smooth pb-2 -mx-3 sm:-mx-4 px-3 sm:px-4">
                      <div className="flex gap-2 sm:gap-3">
                        {filtered.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            compact={true}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            // Single Category View
            <>
              {productsByCategory[activeTab] && (() => {
                const filtered = getFilteredProducts(productsByCategory[activeTab]);
                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-16">
                      <p className="text-lg text-slate-600 mb-2">No {activeTab.toLowerCase()} found</p>
                      <p className="text-sm text-slate-500 mb-6">
                        {searchQuery ? 'Try adjusting your search' : 'Check back later for new items'}
                      </p>
                      {searchQuery && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSearchQuery('')}
                        >
                          Clear Search
                        </Button>
                      )}
                    </div>
                  );
                }

                return (
                  <div>
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(activeTab)}
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{activeTab}</h2>
                        <Badge variant="default" className="bg-slate-200 text-slate-700">
                          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
                        </Badge>
                      </div>
                    </div>
                    <div className="overflow-x-auto scrollbar-hide scroll-smooth pb-2 -mx-3 sm:-mx-4 px-3 sm:px-4">
                      <div className="flex gap-2 sm:gap-3">
                        {filtered.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            compact={true}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </section>

    </div>
  );
}
