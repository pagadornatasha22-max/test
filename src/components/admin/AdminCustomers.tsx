import React, { useState } from 'react';
import { User, Order } from '../../types';
import { Search, User as UserIcon, Phone, Mail, MapPin, ShieldCheck, ShoppingBag } from 'lucide-react';

interface AdminCustomersProps {
  users: User[];
  orders: Order[];
}

export const AdminCustomers: React.FC<AdminCustomersProps> = ({ users, orders }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = users.filter((u) => u.role === 'customer').filter((c) => {
    return (
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactNumber.includes(searchQuery)
    );
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Registered Customers</h2>
          <p className="text-xs text-stone-500 mt-1">Review customer account profiles and order activity</p>
        </div>
        <div className="bg-blue-100 text-blue-800 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5">
          <UserIcon className="w-4 h-4" />
          <span>{customers.length} Verified Customer Accounts</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-stone-200/80">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer name, email, or mobile..."
            className="w-full pl-9 pr-4 py-2 bg-stone-100/80 border border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Customers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((cust) => {
          const custOrders = orders.filter((o) => o.customerId === cust.id);
          const totalSpent = custOrders.reduce((sum, o) => sum + o.totalAmount, 0);

          return (
            <div
              key={cust.id}
              className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-center space-x-3 pb-4 border-b border-stone-100">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg uppercase shrink-0">
                  {cust.fullName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-base text-stone-900 truncate">{cust.fullName}</h3>
                  <div className="flex items-center space-x-1 text-emerald-600 text-xs font-semibold mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Customer</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                  <span className="truncate">{cust.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>{cust.contactNumber}</span>
                </div>
                <div className="flex items-start space-x-2 pt-1">
                  <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-relaxed">{cust.address}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between bg-stone-50 p-3 rounded-2xl">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Orders Placed</span>
                  <span className="text-base font-bold text-stone-900 flex items-center gap-1">
                    <ShoppingBag className="w-4 h-4 text-rose-500 inline" /> {custOrders.length} orders
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Total Value</span>
                  <span className="text-lg font-black text-rose-600">₱{totalSpent.toLocaleString()}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
