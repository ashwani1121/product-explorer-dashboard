
import React from 'react';

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 animate-pulse">
    <div className="w-full h-48 bg-slate-200 rounded-lg mb-4"></div>
    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
    <div className="flex justify-between items-center">
      <div className="h-6 bg-slate-200 rounded w-16"></div>
      <div className="h-8 bg-slate-200 rounded-full w-24"></div>
    </div>
  </div>
);

export const ProductGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const ProductDetailSkeleton: React.FC = () => (
  <div className="max-w-6xl mx-auto p-4 md:p-8 grid md:grid-cols-2 gap-12 animate-pulse">
    <div className="aspect-square bg-slate-200 rounded-2xl w-full"></div>
    <div className="space-y-6">
      <div className="h-10 bg-slate-200 rounded w-full"></div>
      <div className="h-6 bg-slate-200 rounded w-24"></div>
      <div className="h-32 bg-slate-200 rounded w-full"></div>
      <div className="h-12 bg-slate-200 rounded w-32"></div>
    </div>
  </div>
);
