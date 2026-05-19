import React from 'react';
import { User, Order, Product, AdminTab, OrderStatus, Review } from '../../types';
import { AdminOverview } from './AdminOverview';
import { AdminOrders } from './AdminOrders';
import { AdminInventory } from './AdminInventory';
import { AdminCustomers } from './AdminCustomers';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminReviews } from './AdminReviews';
import { AdminUsers } from './AdminUsers';

interface AdminDashboardProps {
  currentUser: User;
  users: User[];
  orders: Order[];
  products: Product[];
  reviews: Review[];
  currentTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  users,
  orders,
  products,
  reviews,
  currentTab,
  setAdminTab,
  onUpdateOrderStatus,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateUser,
  onDeleteUser,
  addToast,
}) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {currentTab === 'overview' && (
        <AdminOverview
          orders={orders}
          products={products}
          users={users}
          onNavigateTab={setAdminTab}
          onUpdateOrderStatus={onUpdateOrderStatus}
        />
      )}

      {currentTab === 'orders' && (
        <AdminOrders
          orders={orders}
          onUpdateOrderStatus={onUpdateOrderStatus}
          addToast={addToast}
        />
      )}

      {currentTab === 'inventory' && (
        <AdminInventory
          products={products}
          onAddProduct={onAddProduct}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
          addToast={addToast}
        />
      )}

      {currentTab === 'customers' && (
        <AdminCustomers
          users={users}
          orders={orders}
        />
      )}

      {currentTab === 'analytics' && (
        <AdminAnalytics
          orders={orders}
          products={products}
        />
      )}

      {currentTab === 'reviews' && (
        <AdminReviews
          reviews={reviews}
          products={products}
        />
      )}

      {currentTab === 'users' && (
        <AdminUsers
          users={users}
          onUpdateUser={onUpdateUser}
          onDeleteUser={onDeleteUser}
          addToast={addToast}
        />
      )}
    </div>
  );
};
