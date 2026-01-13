
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Product } from '../types';
import { ProductDetailSkeleton } from '../components/SkeletonLoader';
import { useFavorites } from '../hooks/useFavorites';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await api.getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) return <ProductDetailSkeleton />;

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Product not found</h2>
        <button onClick={() => navigate('/')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold">
          Back to Listing
        </button>
      </div>
    );
  }

  const isFav = isFavorite(product.id);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 md:px-0">
      <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-400 truncate">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="bg-white rounded-3xl p-12 shadow-xl shadow-slate-200/50 border border-slate-100 group">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.round(product.rating.rate) ? 'text-amber-400' : 'text-slate-200'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-500 text-sm font-medium">
                {product.rating.rate} / 5.0 ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest block mb-1">Price</span>
            <span className="text-4xl font-black text-slate-900">${product.price.toFixed(2)}</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800">Product Description</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Cart
            </button>
            <button 
              onClick={() => toggleFavorite(product.id)}
              className={`flex-1 sm:flex-none px-8 py-4 rounded-xl font-bold text-lg border-2 transition-all flex items-center justify-center gap-2 ${
                isFav 
                  ? 'bg-rose-50 border-rose-500 text-rose-500 hover:bg-rose-100' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300 hover:text-rose-500'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isFav ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {isFav ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl">
              <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="block font-bold text-slate-900">Free Delivery</span>
                <span className="text-xs text-slate-500 font-medium">For orders over $100</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <span className="block font-bold text-slate-900">Easy Returns</span>
                <span className="text-xs text-slate-500 font-medium">30 days return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
