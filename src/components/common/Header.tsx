import React from 'react';
import { User, CustomerTab, AdminTab, CartItem } from '../../types';
import { Flower, ShoppingBag, ClipboardList, User as UserIcon, LogOut, LayoutDashboard, Package, Users, BarChart3, Star, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
  cart: CartItem[];
  currentCustomerTab: CustomerTab;
  setCustomerTab: (tab: CustomerTab) => void;
  currentAdminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  onGoToLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onLogout,
  cart,
  currentCustomerTab,
  setCustomerTab,
  currentAdminTab,
  setAdminTab,
  onGoToLogin
}) => {
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-40 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Location Subtitle */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => currentUser?.role === 'admin' ? setAdminTab('overview') : setCustomerTab('shop')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-100 transition-all duration-300 group-hover:scale-105">
              <Flower className="w-6 h-6 animate-pulse text-gold-100" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-emerald-800 tracking-tight leading-none">
                Macel's <span className="text-gold-500 font-normal italic">Flower Shop</span>
              </h1>
              <p className="text-[10px] sm:text-xs font-semibold text-stone-500 mt-1 hidden sm:block">
                📍 Canipaan, Hinunangan, Southern Leyte
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          {currentUser ? (
            <div className="flex items-center space-x-1 sm:space-x-3">
              {currentUser.role === 'customer' ? (
                <>
                  <button
                    onClick={() => setCustomerTab('shop')}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                      currentCustomerTab === 'shop'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Flower className="w-4 h-4" />
                    <span className="hidden md:inline">Catalog</span>
                  </button>

                  <button
                    onClick={() => setCustomerTab('customizer')}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                      currentCustomerTab === 'customizer'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-gold-500 animate-spin-slow" />
                    <span className="hidden md:inline">Custom Bouquet</span>
                    <span className="md:hidden">Custom</span>
                  </button>

                  <button
                    onClick={() => setCustomerTab('cart')}
                    className={`relative px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                      currentCustomerTab === 'cart'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="hidden md:inline">My Cart</span>
                    {totalCartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-white">
                        {totalCartCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setCustomerTab('orders')}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                      currentCustomerTab === 'orders'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span className="hidden md:inline">My Orders</span>
                  </button>

                  <button
                    onClick={() => setCustomerTab('profile')}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                      currentCustomerTab === 'profile'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <UserIcon className="w-4 h-4" />
                    <span className="hidden lg:inline">{currentUser.fullName.split(' ')[0]}</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Admin Navigation */}
                  <button
                    onClick={() => setAdminTab('overview')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                      currentAdminTab === 'overview'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Overview</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('orders')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                      currentAdminTab === 'orders'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <ClipboardList className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Orders</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('inventory')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                      currentAdminTab === 'inventory'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Inventory</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('customers')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                      currentAdminTab === 'customers'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Customers</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('analytics')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                      currentAdminTab === 'analytics'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Analytics</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('reviews')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                      currentAdminTab === 'reviews'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    <span className="hidden lg:inline">Reviews</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('users')}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                      currentAdminTab === 'users'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <UserIcon className="w-3.5 h-3.5 text-purple-600" />
                    <span className="hidden lg:inline">Accounts</span>
                  </button>
                </>
              )}

              <div className="h-6 w-px bg-stone-200 mx-1" />

              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors flex items-center space-x-1 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-bold">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={onGoToLogin}
                className="bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-800 shadow-md shadow-emerald-100 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                <span>Get Started</span>
              </button>
            </div>
          )}

        </div>
        
        {/* Mobile Location Banner */}
        <div className="sm:hidden pb-3 text-center border-t border-emerald-50 pt-2">
          <p className="text-[10px] text-stone-500 font-semibold flex items-center justify-center space-x-1">
            <span>📍 Canipaan, Hinunangan, Southern Leyte (GPS: 10.414779, 125.185361)</span>
          </p>
        </div>
      </div>
    </header>
  );
};
