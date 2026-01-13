
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <button 
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(product.id);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-colors ${
          isFavorite 
            ? 'bg-rose-500 text-white shadow-lg' 
            : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </button>

      <Link to={`/products/${product.id}`} className="flex-1 p-4 flex flex-col">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center p-6">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-1">
            {product.category}
          </span>
          <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-900">${product.price.toFixed(2)}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-slate-500">{product.rating.rate} ({product.rating.count})</span>
              </div>
            </div>
            
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 text-slate-800 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
