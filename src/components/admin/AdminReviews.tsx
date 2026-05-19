import React, { useState } from 'react';
import { Review, Product } from '../../types';
import { Star, Search, MessageSquare } from 'lucide-react';

interface AdminReviewsProps {
  reviews: Review[];
  products: Product[];
}

export const AdminReviews: React.FC<AdminReviewsProps> = ({ reviews, products }) => {
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = reviews.filter((rev) => {
    const matchesRating = ratingFilter === 'all' || rev.rating === ratingFilter;
    const matchesSearch =
      rev.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const avgStoreRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title & Overview stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Store Feedback & Reviews</h2>
          <p className="text-xs text-stone-500 mt-1">Monitor all customer comments and star ratings</p>
        </div>

        <div className="flex items-center space-x-4 bg-white px-5 py-3 rounded-2xl shadow-xs border border-stone-200/80">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Overall Rating</span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-2xl font-extrabold text-stone-900">{avgStoreRating}</span>
              <span className="text-xs text-stone-500 font-medium">/ 5</span>
            </div>
          </div>
          <div className="h-8 w-px bg-stone-200 hidden sm:block" />
          <div className="text-center sm:text-left hidden sm:block">
            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Total Feedback</span>
            <span className="text-lg font-bold text-stone-900">{reviews.length} reviews ({fiveStarCount} ★★★★★)</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-xs border border-stone-200/80">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider px-2 hidden sm:inline">
            Rating:
          </span>
          {(['all', 5, 4, 3, 2, 1] as const).map((star) => (
            <button
              key={star}
              onClick={() => setRatingFilter(star)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                ratingFilter === star ? 'bg-rose-600 text-white shadow-md shadow-rose-200' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span>{star === 'all' ? 'All Feedback' : `${star} ★ Stars`}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer or comment..."
            className="w-full pl-9 pr-4 py-2 bg-stone-100/80 border border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-stone-200/80">
            <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-base font-medium text-stone-600">No reviews match your filter criteria.</p>
            <button
              onClick={() => { setRatingFilter('all'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 bg-rose-100 text-rose-800 font-bold rounded-xl text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const reviewedProduct = products.find((p) => p.id === rev.productId);

            return (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <p className="font-bold text-sm text-stone-900">{rev.customerName}</p>
                      <p className="text-[10px] text-stone-400 font-mono">
                        {new Date(rev.createdAt).toLocaleDateString()} at {new Date(rev.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {reviewedProduct && (
                    <div className="flex items-center space-x-2.5 bg-stone-50 p-2 rounded-xl border border-stone-200">
                      <img
                        src={reviewedProduct.image}
                        alt={reviewedProduct.name}
                        className="w-10 h-10 rounded-lg object-cover bg-stone-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-bold text-rose-700 tracking-wider block">
                          Reviewed Product
                        </span>
                        <p className="font-serif font-bold text-xs text-stone-900 truncate">
                          {reviewedProduct.name}
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-stone-700 leading-relaxed italic bg-stone-50/60 p-3 rounded-2xl border border-stone-100">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-stone-400">
                  <span>Feedback ID: {rev.id}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Verified Customer</span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
