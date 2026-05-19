export type Role = 'admin' | 'customer';

export type Category = 'bouquets' | 'dozen' | 'customized';

export interface User {
  id: string;
  username?: string;
  email: string;
  password?: string;
  fullName: string;
  contactNumber: string;
  address: string;
  role: Role;
}

export interface ProductOption {
  name: string;
  price: number;
}

export interface CustomArrangementOptions {
  flowers: ProductOption[];
  wrappers: ProductOption[];
  ribbons: ProductOption[];
  addOns: ProductOption[];
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  rating: number;
  isAvailable: boolean;
  featured?: boolean;
}

export interface SelectedOptions {
  flower?: string;
  wrapper?: string;
  ribbon?: string;
  addOns?: string[];
  sampleImage?: string;
}

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  quantity: number;
  customNotes?: string;
  selectedOptions?: SelectedOptions;
  itemTotal: number;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Ready for Pickup' | 'Completed' | 'Rejected';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  contactNumber: string;
  email: string;
  pickupDateTime: string;
  optionalMessageCard?: string;
  paymentMethod: 'GCash';
  paymentReference?: string;
  paymentReceiptPhoto?: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number; // 1 to 5 stars
  comment: string;
  createdAt: string;
}

export type PageView = 'login' | 'register' | 'customer-dash' | 'admin-dash' | 'checkout';
export type CustomerTab = 'shop' | 'cart' | 'orders' | 'profile' | 'customizer';
export type AdminTab = 'overview' | 'orders' | 'inventory' | 'customers' | 'analytics' | 'reviews' | 'users';
