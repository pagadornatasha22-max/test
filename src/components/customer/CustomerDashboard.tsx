import React, { useState } from 'react';
import { User, Product, CartItem, Order, CustomerTab, SelectedOptions, Review } from '../../types';
import { ShopCatalog } from './ShopCatalog';
import { CustomizerTool } from './CustomizerTool';
import { CartView } from './CartView';
import { CheckoutView } from './CheckoutView';
import { MyOrders } from './MyOrders';
import { UserProfile } from './UserProfile';
import { ProductReviewsModal } from './ProductReviewsModal';

interface CustomerDashboardProps {
  currentUser: User;
  products: Product[];
  orders: Order[];
  reviews: Review[];
  cart: CartItem[];
  currentTab: CustomerTab | 'checkout';
  setCustomerTab: (tab: CustomerTab | 'checkout') => void;
  onAddToCart: (product: Product, quantity?: number, customNotes?: string, selectedOptions?: SelectedOptions) => void;
  onUpdateCartQuantity: (cartItemId: string, delta: number) => void;
  onRemoveCartItem: (cartItemId: string) => void;
  onConfirmOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'status' | 'createdAt'>) => Order;
  onUpdateUser: (updatedUser: User) => void;
  onAddReview: (productId: string, rating: number, comment: string) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  currentUser,
  products,
  orders,
  reviews,
  cart,
  currentTab,
  setCustomerTab,
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onConfirmOrder,
  onUpdateUser,
  onAddReview,
  addToast,
}) => {
  const [selectedReviewProduct, setSelectedReviewProduct] = useState<Product | null>(null);

  const customerOrders = orders.filter((ord) => ord.customerId === currentUser.id);

  const handleDirectCheckout = (product: Product, selectedOptions?: SelectedOptions) => {
    onAddToCart(product, 1, undefined, selectedOptions);
    setCustomerTab('checkout');
    addToast('info', `Proceeding to direct checkout for ${product.name}`);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {currentTab === 'shop' && (
        <ShopCatalog
          products={products}
          reviews={reviews}
          onAddToCart={(prod, qty, notes) => {
            onAddToCart(prod, qty, notes);
            addToast('success', `${prod.name} added to cart!`);
          }}
          onDirectCheckout={handleDirectCheckout}
          onOpenCustomizer={() => setCustomerTab('customizer')}
          onOpenReviews={setSelectedReviewProduct}
        />
      )}

      {selectedReviewProduct && (
        <ProductReviewsModal
          product={selectedReviewProduct}
          reviews={reviews}
          currentUser={currentUser}
          onClose={() => setSelectedReviewProduct(null)}
          onSubmitReview={onAddReview}
          addToast={addToast}
        />
      )}

      {currentTab === 'customizer' && (
        <CustomizerTool
          onAddToCart={(prod, qty, notes, opts) => {
            onAddToCart(prod, qty, notes, opts);
            addToast('success', 'Customized arrangement added to cart!');
          }}
          onDirectCheckout={handleDirectCheckout}
        />
      )}

      {currentTab === 'cart' && (
        <CartView
          cart={cart}
          onUpdateQuantity={onUpdateCartQuantity}
          onRemoveItem={(id) => {
            onRemoveCartItem(id);
            addToast('info', 'Item removed from cart');
          }}
          onProceedCheckout={() => setCustomerTab('checkout')}
          onContinueShopping={() => setCustomerTab('shop')}
        />
      )}

      {currentTab === 'checkout' && (
        <CheckoutView
          currentUser={currentUser}
          cart={cart}
          onConfirmOrder={onConfirmOrder}
          onBackToCart={() => setCustomerTab('cart')}
          onViewMyOrders={() => setCustomerTab('orders')}
          addToast={addToast}
        />
      )}

      {currentTab === 'orders' && (
        <MyOrders
          orders={customerOrders}
          onContinueShopping={() => setCustomerTab('shop')}
        />
      )}

      {currentTab === 'profile' && (
        <UserProfile
          currentUser={currentUser}
          onUpdateUser={onUpdateUser}
          addToast={addToast}
        />
      )}
    </div>
  );
};
