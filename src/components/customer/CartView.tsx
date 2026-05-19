import React from 'react';
import { CartItem } from '../../types';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, Flower, Sparkles } from 'lucide-react';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  onContinueShopping,
}) => {
  const subtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-md space-y-6 my-8 animate-fade-in-up">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
          <ShoppingBag className="w-10 h-10 text-emerald-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold text-stone-900">Your Flower Cart is Empty</h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
            Curate fresh custom arrangements or choose from our classic dozens to place an order.
          </p>
        </div>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3.5 bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:bg-emerald-800 transition-all inline-flex items-center space-x-2 text-sm cursor-pointer"
        >
          <Flower className="w-4 h-4" />
          <span>Browse Bouquets</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fade-in-up">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Shopping Cart</h2>
          <p className="text-xs text-stone-500 mt-1">Verify details before proceeding to payment</p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
          {cart.reduce((s, i) => s + i.quantity, 0)} Items Selected
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center gap-5 transition-all hover:border-emerald-700/30"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shrink-0 bg-stone-100 border border-stone-200"
              />

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                  <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                    {item.product.name}
                  </h3>
                  <span className="font-serif font-black text-emerald-800 text-lg shrink-0">
                    ₱{item.itemTotal.toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-stone-500 line-clamp-1">
                  Unit Price: ₱{item.product.price.toLocaleString()}
                </p>

                {item.selectedOptions && (
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium">
                      Wrap: {item.selectedOptions.wrapper}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium">
                      Ribbon: {item.selectedOptions.ribbon}
                    </span>
                    {item.selectedOptions.sampleImage && (
                      <span className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                        📸 Reference Photo Attached
                      </span>
                    )}
                  </div>
                )}

                {item.customNotes && (
                  <p className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-200">
                    <span className="font-bold">Instructions: </span> {item.customNotes}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2 bg-stone-105 p-1 rounded-xl">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-stone-700 hover:bg-stone-200 transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-stone-700 hover:bg-stone-200 transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-stone-400 hover:text-rose-600 p-2 rounded-lg transition-colors flex items-center space-x-1 text-xs font-semibold"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={onContinueShopping}
              className="text-stone-600 hover:text-emerald-700 font-bold text-xs transition-colors flex items-center space-x-1"
            >
              <span>← Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Order Summary Checkout Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-900/5 space-y-6 sticky top-28">
            <h3 className="font-serif font-bold text-xl text-stone-900 pb-3 border-b border-stone-100">
              Cart Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-650">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-stone-900">₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-650">
                <span>Bespoke Styling</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-stone-650">
                <span>Boutique Pickup</span>
                <span className="text-emerald-600 font-semibold">Canipaan, Hinunangan</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-baseline justify-between">
              <span className="font-bold text-stone-900 text-base">Total:</span>
              <span className="text-3xl font-serif font-black text-emerald-800">₱{subtotal.toLocaleString()}</span>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-xs text-emerald-900 space-y-1">
              <p className="font-bold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-600 inline shrink-0" />
                <span>Florist Handcraft Quality</span>
              </p>
              <p className="text-emerald-800/90 leading-relaxed">
                Macel prepares arrangements freshly on the day of your selected pickup from the shop.
              </p>
            </div>

            <button
              onClick={onProceedCheckout}
              className="w-full py-4 px-6 bg-emerald-700 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-800 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
