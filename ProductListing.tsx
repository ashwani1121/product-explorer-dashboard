
import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { Product, FilterState, SortOption } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import { useFavorites } from '../hooks/useFavorites';

export const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    showFavorites: false,
    sortBy: 'none'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || p.category === filters.category;
      const matchesFavorites = !filters.showFavorites || favorites.includes(p.id);
      return matchesSearch && matchesCategory && matchesFavorites;
    });

    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [products, filters, favorites]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
        <div className="bg-rose-50 text-rose-600 p-6 rounded-2xl border border-rose-100 max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-rose-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Hero Section */}
      <section className="bg-white border-b border-slate-100 -mx-4 px-4 py-8 md:py-12 md:-mx-8 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            Discover Exceptional Products
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Explore our curated collection of high-quality electronics, jewelry, and fashion essentials.
          </p>
        </div>
      </section>

      {/* Filters Toolbar */}
      <div className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200 -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-sm">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select 
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer shadow-sm hover:border-slate-300"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>

            <select 
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as SortOption }))}
              className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer shadow-sm hover:border-slate-300"
            >
              <option value="none">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <button 
              onClick={() => setFilters(prev => ({ ...prev, showFavorites: !prev.showFavorites }))}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                filters.showFavorites 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-rose-300 hover:text-rose-500'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {filters.showFavorites ? 'Showing Favorites' : 'Favorites Only'}
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <ProductGridSkeleton />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your filters or search terms to find what you're looking for.</p>
            <button 
              onClick={() => setFilters({ search: '', category: 'all', showFavorites: false, sortBy: 'none' })}
              className="text-indigo-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
