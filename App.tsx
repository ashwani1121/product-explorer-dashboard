
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductListing } from './pages/ProductListing';
import { ProductDetails } from './pages/ProductDetails';

const Navbar: React.FC = () => (
  <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <span className="text-xl font-black text-slate-900 tracking-tight">Pro<span className="text-indigo-600">Explore</span></span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Catalog</Link>
        <a href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Categories</a>
        <a href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Deals</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-600 hover:text-indigo-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
        <button className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute top-0 right-0 h-4 w-4 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">0</span>
        </button>
      </div>
    </div>
  </nav>
);

const Footer: React.FC = () => (
  <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4 md:px-8 mt-24">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">ProExplore</span>
          </Link>
          <p className="text-slate-500 text-sm">
            The world's premier destination for high-quality goods, delivered straight to your door.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-slate-500 font-medium">
            <li><a href="#" className="hover:text-indigo-600">All Collections</a></li>
            <li><a href="#" className="hover:text-indigo-600">Featured Items</a></li>
            <li><a href="#" className="hover:text-indigo-600">New Arrivals</a></li>
            <li><a href="#" className="hover:text-indigo-600">Discounts</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-500 font-medium">
            <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
            <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Newsletter</h4>
          <p className="text-sm text-slate-500 mb-4 font-medium">Get the latest updates on new products and upcoming sales.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 outline-none" />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-400 font-medium">© 2024 ProExplore Dashboard. Built for technical excellence.</p>
        <div className="flex gap-6">
          <div className="h-6 w-8 bg-slate-100 rounded"></div>
          <div className="h-6 w-8 bg-slate-100 rounded"></div>
          <div className="h-6 w-8 bg-slate-100 rounded"></div>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<ProductListing />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
