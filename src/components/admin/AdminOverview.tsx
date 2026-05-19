import React from 'react';
import { Order, Product, User } from '../../types';
import { TrendingUp, ShoppingBag, Package, Users, Clock, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

interface AdminOverviewProps {
  orders: Order[];
  products: Product[];
  users: User[];
  onNavigateTab: (tab: 'orders' | 'inventory' | 'customers' | 'analytics') => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  orders,
  products,
  users,
  onNavigateTab,
  onUpdateOrderStatus,
}) => {
  const totalSales = orders
    .filter((ord) => ord.status === 'Completed' || ord.status === 'Ready for Pickup')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const customersCount = users.filter((u) => u.role === 'customer').length;
  const availableProductsCount = products.filter((p) => p.isAvailable).length;

  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><Clock className="w-3.5 h-3.5 inline" /> Pending</span>;
      case 'Preparing':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><Sparkles className="w-3.5 h-3.5 inline animate-spin" /> Preparing</span>;
      case 'Ready for Pickup':
        return <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><Package className="w-3.5 h-3.5 inline animate-bounce" /> Ready for Pickup</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><CheckCircle2 className="w-3.5 h-3.5 inline" /> Completed</span>;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            Admin Management Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Macel's Flower Shop Store Overview
          </h1>
          <p className="text-rose-100 text-sm max-w-xl">
            Monitor real-time sales performance, manage flower inventory, and process customer orders instantly.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shrink-0">
          <p className="text-xs uppercase tracking-wider text-rose-200 font-bold mb-1">Total Verified Revenue</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-amber-300">₱{totalSales.toLocaleString()}</p>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between pb-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-rose-600 transition-colors" />
          </div>
          <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Pending Orders</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-black text-stone-900">{pendingOrdersCount}</span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Action Req</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between pb-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-rose-600 transition-colors" />
          </div>
          <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Total Sales Count</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-black text-stone-900">{orders.length}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Orders</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('customers')}
          className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between pb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-rose-600 transition-colors" />
          </div>
          <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Active Customers</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-black text-stone-900">{customersCount}</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Accounts</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('inventory')}
          className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between pb-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-rose-600 transition-colors" />
          </div>
          <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Available Products</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-black text-stone-900">{availableProductsCount}</span>
            <span className="text-xs font-bold text-stone-500">Listed</span>
          </div>
        </div>

      </div>

      {/* Quick Action Recent Orders */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900">Recent Customer Orders</h3>
            <p className="text-xs text-stone-500 mt-0.5">Quickly view or update order statuses</p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center space-x-1"
          >
            <span>View All Orders →</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-400">
                <th className="pb-3 pr-4">Order ID</th>
                <th className="pb-3 px-4">Customer</th>
                <th className="pb-3 px-4">Pickup Date & Time</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4">Total</th>
                <th className="pb-3 pl-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-4 pr-4 font-mono font-bold text-rose-600">{order.orderNumber}</td>
                  <td className="py-4 px-4 text-stone-900">
                    <span className="font-bold block">{order.customerName}</span>
                    <span className="text-xs text-stone-400">{order.contactNumber}</span>
                  </td>
                  <td className="py-4 px-4 text-stone-600 text-xs">
                    {new Date(order.pickupDateTime).toLocaleString()}
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(order.status)}</td>
                  <td className="py-4 px-4 font-bold text-stone-900">₱{order.totalAmount.toLocaleString()}</td>
                  <td className="py-4 pl-4 text-right">
                    <div className="inline-flex space-x-1">
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Preparing')}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors"
                        >
                          Mark Preparing
                        </button>
                      )}
                      {order.status === 'Preparing' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Ready for Pickup')}
                          className="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-purple-700 transition-colors"
                        >
                          Ready for Pickup
                        </button>
                      )}
                      {order.status === 'Ready for Pickup' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Completed')}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                      {order.status === 'Completed' && (
                        <span className="text-xs text-emerald-600 font-bold px-2 py-1 bg-emerald-50 rounded-lg">
                          Collected
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
