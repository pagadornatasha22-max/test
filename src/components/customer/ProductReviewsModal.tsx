import React, { useState } from 'react';
import { Product, Review, User } from '../../types';
import { Star, MessageSquare, Send, X } from 'lucide-react';

interface ProductReviewsModalProps {
  product: Product;
  reviews: Review[];
  currentUser: User | null;
  onClose: () => void;
  onSubmitReview: (productId: string, rating: number, comment: string) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const ProductReviewsModal: React.FC<ProductReviewsModalProps> = ({
  product,
  reviews,
  currentUser,
  onClose,
  onSubmitReview,
  addToast,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const avgRating = productReviews.length > 0
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : '5.0';

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      addToast('info', 'Please sign in to submit a review.');
      return;
    }
    if (!comment.trim()) {
      addToast('error', 'Please write a comment for your review.');
      return;
    }

    onSubmitReview(product.id, rating, comment.trim());
    setComment('');
    setRating(5);
    addToast('success', 'Thank you for your review!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative animate-scale-up border border-emerald-900/5">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start space-x-4 pb-4 border-b border-stone-100 pr-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 rounded-2xl object-cover bg-stone-100 shrink-0 shadow-2xs border border-stone-200"
          />
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
              Customer Feedback
            </span>
            <h3 className="font-serif font-bold text-xl text-stone-900 mt-2">{product.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= Number(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-800">{avgRating} / 5</span>
              <span className="text-xs text-stone-400">({productReviews.length} reviews)</span>
            </div>
          </div>
        </div>

        {/* Review Submission Form */}
        <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-100/55 space-y-4">
          <h4 className="font-serif font-bold text-sm text-emerald-900 flex items-center space-x-1.5">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>Post a Review</span>
          </h4>

          {currentUser ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
                  Rating Status:
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110 cursor-pointer"
                      title={`${star} Stars`}
                    >
                      <Star
                        className={`w-7 h-7 ${star <= rating ? 'fill-gold-500 text-gold-500' : 'text-stone-300'}`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold px-2.5 py-1 bg-white rounded-lg border border-stone-200 ml-2">
                    {rating} Star{rating > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  Comment Details:
                </label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the scent, wrapper quality, freshness, or styling..."
                  className="w-full p-3 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 shadow-2xs"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5 text-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-gold-400" />
                  <span>Submit Feedback</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-xs text-stone-500 bg-white p-4 rounded-xl border border-stone-200 text-center">
              Please sign in as a customer to post a review.
            </div>
          )}
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider">
            Review History ({productReviews.length})
          </h4>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-none">
            {productReviews.length === 0 ? (
              <p className="text-xs text-stone-400 italic text-center py-6">No feedback posted yet for this bouquet.</p>
            ) : (
              productReviews.map((rev) => (
                <div key={rev.id} className="bg-stone-50/50 p-4 rounded-2xl border border-stone-200/60 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs uppercase">
                        {rev.customerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-stone-900">{rev.customerName}</p>
                        <p className="text-[10px] text-stone-400">{new Date(rev.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-gold-500 text-gold-500' : 'text-stone-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-150">
                    "{rev.comment}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
