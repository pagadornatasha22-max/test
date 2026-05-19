import React, { useState } from 'react';
import { Product, Category, Review } from '../../types';
import { Search, ShoppingCart, Zap, Star, Sparkles, Filter } from 'lucide-react';

interface ShopCatalogProps {
  products: Product[];
  reviews: Review[];
  onAddToCart: (product: Product, quantity?: number, customNotes?: string) => void;
  onDirectCheckout: (product: Product) => void;
  onOpenCustomizer: () => void;
  onOpenReviews: (product: Product) => void;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  products,
  reviews,
  onAddToCart,
  onDirectCheckout,
  onOpenCustomizer,
  onOpenReviews,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && product.isAvailable;
  });

  return (
    <div className="space-y-8 pb-16 animate-fade-in-up">
      
      {/* Luxury Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-emerald-800 text-white p-8 sm:p-14 border border-emerald-700/30">
        {/* Soft elegant radial gradient highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(195,156,89,0.18),transparent_60%)] pointer-events-none" />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold tracking-wider text-gold-400 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>EXQUISITE FLORAL DESIGN • CANIPAAN</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight leading-tight">
            Freshly Handpicked Blooms For Life's <span className="text-gold-400 italic font-normal">Fine Moments</span>
          </h1>
          
          <p className="text-stone-300 text-sm sm:text-lg font-light max-w-2xl leading-relaxed">
            From classic dozen scarlet roses to customized garden installations, Macel's Flower Shop brings world-class botanical artistry directly to your milestones.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={onOpenCustomizer}
              className="px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-emerald-950 font-bold transition-all shadow-lg shadow-gold-500/20 flex items-center space-x-2 text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-950" />
              <span>Design Custom Bouquet</span>
            </button>
            <a 
              href="https://www.google.com/maps?q=10.414779,125.185361"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition-all border border-white/15 text-sm flex items-center space-x-2"
            >
              <span>📍 Locate Boutique</span>
            </a>
          </div>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/60 backdrop-blur-xs p-4 rounded-3xl shadow-xs border border-emerald-900/5">
        
        {/* Categories */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider px-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/10'
                : 'bg-stone-50 text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 border border-stone-200/60'
            }`}
          >
            🌸 All Arrangements
          </button>
          
          <button
            onClick={() => setSelectedCategory('bouquets')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'bouquets'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/10'
                : 'bg-stone-50 text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 border border-stone-200/60'
            }`}
          >
            💐 Flower Bouquets
          </button>
          
          <button
            onClick={() => setSelectedCategory('dozen')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'dozen'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/10'
                : 'bg-stone-50 text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 border border-stone-200/60'
            }`}
          >
            🌹 Dozen Flowers
          </button>
          
          <button
            onClick={() => setSelectedCategory('customized')}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'customized'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/10'
                : 'bg-stone-50 text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 border border-stone-200/60'
            }`}
          >
            ✨ Custom Handcraft
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4 text-stone-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our catalog..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all placeholder:text-stone-400 shadow-2xs"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-stone-200/80 shadow-xs">
          <p className="text-lg font-serif font-bold text-stone-700">No arrangements found matching your selection.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 px-6 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-xs transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-stone-150 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
            >
              {/* Product Card Image */}
              <div className="relative overflow-hidden aspect-[4/3] bg-stone-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category & Status badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="px-3 py-1 rounded-lg bg-emerald-950/85 backdrop-blur-md text-[10px] font-bold text-gold-400 shadow-2xs uppercase tracking-wider border border-white/10">
                    {product.category === 'bouquets' && '💐 Bouquet'}
                    {product.category === 'dozen' && '🌹 Dozen Stems'}
                    {product.category === 'customized' && '✨ Bespoke'}
                  </span>
                  {product.featured && (
                    <span className="px-3 py-1 rounded-lg bg-gold-500 text-emerald-950 text-[10px] font-black shadow-2xs uppercase tracking-wider flex items-center gap-1 border border-gold-400/20">
                      <Sparkles className="w-3 h-3 text-emerald-950" /> Featured
                    </span>
                  )}
                </div>

                {/* Rating Badge */}
                <div
                  onClick={() => onOpenReviews(product)}
                  className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 rounded-lg bg-emerald-950/85 backdrop-blur-md text-gold-400 text-xs font-bold shadow-2xs hover:bg-emerald-900 transition-colors cursor-pointer border border-white/10"
                  title="Click to view reviews"
                >
                  <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  <span>
                    {(() => {
                      const prodRevs = reviews.filter((r) => r.productId === product.id);
                      return prodRevs.length > 0
                        ? (prodRevs.reduce((s, r) => s + r.rating, 0) / prodRevs.length).toFixed(1)
                        : '5.0';
                    })()}
                  </span>
                  <span className="text-[9px] text-stone-300 ml-0.5 font-normal">
                    ({reviews.filter((r) => r.productId === product.id).length})
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5 cursor-pointer" onClick={() => onOpenReviews(product)}>
                  <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 space-y-3.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Price</span>
                    <span className="text-2xl font-serif font-black text-emerald-800">
                      ₱{product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-stone-50 p-2.5 rounded-xl border border-stone-200/50">
                    <button
                      onClick={() => onOpenReviews(product)}
                      className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <Star className="w-3 h-3 text-gold-500 fill-gold-500 inline" />
                      <span>Reviews ({reviews.filter((r) => r.productId === product.id).length})</span>
                    </button>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Fresh Cut</span>
                  </div>

                  {/* Add to Cart / Buy Now options */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onAddToCart(product, 1)}
                      className="px-3 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => onDirectCheckout(product)}
                      className="px-3 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-emerald-800/10 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
