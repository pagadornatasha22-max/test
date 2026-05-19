import React from 'react';
import { Order, Product } from '../../types';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Sparkles, Award } from 'lucide-react';

interface AdminAnalyticsProps {
  orders: Order[];
  products?: Product[];
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ orders }) => {
  const completedOrders = orders.filter((o) => o.status === 'Completed' || o.status === 'Ready for Pickup');
  const totalSales = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const averageOrderValue = completedOrders.length > 0 ? Math.round(totalSales / completedOrders.length) : 0;

  // Breakdown by payment method
  const gcashCount = orders.filter((o) => o.paymentMethod === 'GCash').length;

  // Top products
  const productCountMap: { [key: string]: { name: string; count: number; total: number } } = {};
  orders.forEach((o) => {
    o.items.forEach((item) => {
      if (!productCountMap[item.product.id]) {
        productCountMap[item.product.id] = { name: item.product.name, count: 0, total: 0 };
      }
      productCountMap[item.product.id].count += item.quantity;
      productCountMap[item.product.id].total += item.itemTotal;
    });
  });

  const topProducts = Object.values(productCountMap).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Sales Analytics & Reports</h2>
          <p className="text-xs text-stone-500 mt-1">Key financial metrics for Macel's Flower Shop</p>
        </div>
        <div className="bg-amber-100 text-amber-900 text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-2xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Real-time Financial Audit</span>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-rose-600 to-rose-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-100 pt-2">Gross Sales Revenue</p>
          <p className="text-4xl font-extrabold tracking-tight">₱{totalSales.toLocaleString()}</p>
          <p className="text-[11px] text-rose-200">Verified Completed & Ready orders</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-100 pt-2">Average Order Value</p>
          <p className="text-4xl font-extrabold tracking-tight">₱{averageOrderValue.toLocaleString()}</p>
          <p className="text-[11px] text-blue-200">Per customer checkout basket</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100 pt-2">Total Orders Logged</p>
          <p className="text-4xl font-extrabold tracking-tight">{orders.length}</p>
          <p className="text-[11px] text-emerald-200">Including Pending preparations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Payment Methods */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
          <div className="pb-3 border-b border-stone-100">
            <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-rose-600" />
              <span>Verified Payment Channels</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">Exclusive GCash Online Payments</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-stone-800 mb-1">
                <span>GCash Verified Online Transfers</span>
                <span>{gcashCount} orders (100%)</span>
              </div>
              <div className="w-full bg-stone-100 h-4 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
          <div className="pb-3 border-b border-stone-100">
            <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center space-x-2">
              <Award className="w-5 h-5 text-rose-600" />
              <span>Top Selling Bouquets & Arrangements</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">Most popular flowers ordered by customers</p>
          </div>

          <div className="space-y-4">
            {topProducts.length === 0 ? (
              <p className="text-xs text-stone-500 text-center py-4">No product data logged yet.</p>
            ) : (
              topProducts.map((prod, idx) => (
                <div key={prod.name} className="flex items-center justify-between text-xs bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-stone-900 text-sm">{prod.name}</p>
                      <p className="text-stone-500">{prod.count} units ordered</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-stone-900 text-sm">₱{prod.total.toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
