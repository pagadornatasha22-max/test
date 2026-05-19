import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import { ShoppingBag, Clock, CheckCircle2, Package, Sparkles, Receipt, X, ArrowRight } from 'lucide-react';

interface MyOrdersProps {
  orders: Order[];
  onContinueShopping: () => void;
}

export const MyOrders: React.FC<MyOrdersProps> = ({ orders, onContinueShopping }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-sm space-y-6 my-8">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold text-stone-900">No Orders Found</h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
            You haven't placed any flower orders yet. When you complete an order, you can track its progress right here.
          </p>
        </div>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3.5 bg-rose-600 text-white font-bold rounded-xl shadow-md shadow-rose-200 hover:bg-rose-700 transition-all inline-flex items-center space-x-2 text-sm cursor-pointer"
        >
          <span>Shop Beautiful Blooms</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pending</span>;
      case 'Preparing':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 animate-spin" /> Preparing</span>;
      case 'Ready for Pickup':
        return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><Package className="w-3.5 h-3.5 animate-bounce" /> Ready for Pickup</span>;
      case 'Completed':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>;
    }
  };

  const getStatusProgress = (status: OrderStatus) => {
    const statuses: OrderStatus[] = ['Pending', 'Preparing', 'Ready for Pickup', 'Completed'];
    const currentIndex = statuses.indexOf(status);

    return (
      <div className="pt-4 sm:pt-6">
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-200 -translate-y-1/2 rounded-full" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-rose-600 -translate-y-1/2 rounded-full transition-all duration-500"
            style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
          />

          <div className="relative z-10 flex justify-between">
            {statuses.map((step, idx) => {
              const isPassed = idx <= currentIndex;
              return (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-xs transition-colors ${
                      isPassed ? 'bg-rose-600 text-white shadow-rose-200' : 'bg-white text-stone-400 border-2 border-stone-200'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold mt-1 text-center ${isPassed ? 'text-stone-900' : 'text-stone-400'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div className="pb-4 border-b border-stone-200">
        <h2 className="text-3xl font-serif font-bold text-stone-900">My Order History & Tracking</h2>
        <p className="text-xs text-stone-500 mt-1">Live updates on your flower arrangements from Macel's Flower Shop</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-rose-600 text-lg">{order.orderNumber}</span>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-xs text-stone-500">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div className="flex items-center space-x-4 justify-between sm:justify-end">
                <div className="text-left sm:text-right">
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-bold">Total Paid / Due</p>
                  <p className="text-2xl font-black text-stone-900">₱{order.totalAmount.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Receipt className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>

            {/* Visual Status Tracker */}
            {getStatusProgress(order.status)}

            {/* Preview of items */}
            <div className="pt-2 flex items-center space-x-3 overflow-x-auto pb-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider shrink-0">Items:</span>
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 shrink-0">
                  <img src={item.product.image} alt="" className="w-6 h-6 rounded-md object-cover bg-stone-200" />
                  <span className="text-xs font-semibold text-stone-800">{item.product.name} ({item.quantity})</span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative animate-scale-up border border-stone-100">
            
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h3 className="font-serif font-bold text-2xl text-stone-900">Order Receipt</h3>
              <p className="font-mono text-rose-600 font-bold">{selectedOrder.orderNumber}</p>
              <div className="pt-1 flex justify-center">{getStatusBadge(selectedOrder.status)}</div>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-3">
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-stone-200">
                <div>
                  <span className="text-stone-500 font-medium">Customer:</span>
                  <p className="font-bold text-stone-900">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">Contact No:</span>
                  <p className="font-bold text-stone-900">{selectedOrder.contactNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-stone-200">
                <div>
                  <span className="text-stone-500 font-medium">Pickup Schedule:</span>
                  <p className="font-bold text-stone-900">{new Date(selectedOrder.pickupDateTime).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">Payment Option:</span>
                  <p className="font-bold text-stone-900">{selectedOrder.paymentMethod} {selectedOrder.paymentReference ? `(Ref: ${selectedOrder.paymentReference})` : ''}</p>
                </div>
              </div>

              {selectedOrder.optionalMessageCard && (
                <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-100 text-rose-950">
                  <span className="font-bold block text-rose-900 mb-0.5">💌 Dedication Message Card:</span>
                  <p className="italic font-serif leading-relaxed">"{selectedOrder.optionalMessageCard}"</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider">Itemized Breakdown</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-none">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs pb-2 border-b border-stone-100 last:border-0">
                    <div className="flex items-center space-x-2.5">
                      <img src={item.product.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-stone-100" />
                      <div>
                        <p className="font-bold text-stone-900">{item.product.name}</p>
                        <p className="text-stone-500">Qty: {item.quantity} × ₱{item.product.price.toLocaleString()}</p>
                        {item.selectedOptions && (
                          <div className="text-[10px] text-stone-500 space-y-0.5">
                            <p>Wrap: {item.selectedOptions.wrapper} | Ribbon: {item.selectedOptions.ribbon}</p>
                            {item.selectedOptions.sampleImage && (
                              <div className="pt-1 flex items-center space-x-2">
                                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">📸 Attached Sample Reference</span>
                                <a href={item.selectedOptions.sampleImage} target="_blank" rel="noreferrer" className="text-purple-600 underline font-semibold">View Photo</a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="font-extrabold text-stone-900">₱{item.itemTotal.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-between items-baseline">
              <span className="font-bold text-stone-900 text-sm uppercase">Total Amount:</span>
              <span className="text-3xl font-black text-rose-600">₱{selectedOrder.totalAmount.toLocaleString()}</span>
            </div>

            <div className="text-center pt-2">
              <p className="text-[11px] text-stone-400">
                📍 Purok E, Brgy Canipaan, Hinunangan, Southern Leyte
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
