'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Phone, Download, Package } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import { CallbackModal } from '@/components/booking/CallbackModal';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = true }) => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -2 }}
        className="group"
      >
        <div className="bg-white rounded-lg border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-row h-32 w-[380px] flex-shrink-0">
          {/* Image - Left Side */}
          <div className="relative w-28 h-32 flex-shrink-0 overflow-hidden bg-slate-100">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
              {product.isPopular && (
                <Badge variant="primary" className="text-[10px] px-1.5 py-0.5">Popular</Badge>
              )}
              {product.isNew && (
                <Badge variant="success" className="text-[10px] px-1.5 py-0.5">New</Badge>
              )}
              {product.isFeatured && (
                <Badge variant="default" className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5">Featured</Badge>
              )}
            </div>
            {!product.inStock && (
              <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
                <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
              </div>
            )}
          </div>

          {/* Content - Right Side */}
          <div className="flex-1 flex flex-col p-3 min-w-0">
            {/* Top Row: Category, Rating, SKU */}
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Badge variant="default" className="bg-indigo-50 text-indigo-700 text-[10px] px-1.5 py-0.5 flex-shrink-0">
                  {product.category}
                </Badge>
                {product.sku && (
                  <span className="text-[10px] text-slate-400 truncate">SKU: {product.sku}</span>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center gap-0.5 text-[10px] flex-shrink-0">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-slate-700">{product.rating}</span>
                  {product.reviews && (
                    <span className="text-slate-500">({product.reviews})</span>
                  )}
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-1 leading-tight">
              {product.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-slate-600 mb-2 line-clamp-1 leading-relaxed flex-1">
              {product.description}
            </p>

            {/* Bottom Row: Price & Actions */}
            <div className="flex items-center justify-between gap-2 mt-auto">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  {formatPrice(product.price, product.currency || 'INR')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product.originalPrice, product.currency || 'INR')}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs py-1.5 px-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white"
                  onClick={() => setIsCallbackModalOpen(true)}
                  disabled={!product.inStock}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
                {product.deliveryMethod === 'Instant Download' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-2 py-1.5 text-xs"
                    title="Instant Download"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* File Info */}
            {product.fileFormat && (
              <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  <span>{product.fileFormat}</span>
                </div>
                {product.fileSize && (
                  <span>• {product.fileSize}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />
    </>
  );
};
