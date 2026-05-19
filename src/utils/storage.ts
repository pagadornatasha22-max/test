import { User, Product, Order, CartItem, PageView, CustomerTab, AdminTab, Review } from '../types';
import { INITIAL_USERS, INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS } from '../data/mockData';

// Storage keys
const USERS_KEY = 'mfs_users';
const CURRENT_USER_KEY = 'mfs_current_user';
const PRODUCTS_KEY = 'mfs_products';
const ORDERS_KEY = 'mfs_orders';
const CART_KEY = 'mfs_cart';
const REVIEWS_KEY = 'mfs_reviews';
const NAV_PAGE_KEY = 'mfs_nav_page';
const NAV_CUST_TAB_KEY = 'mfs_nav_cust_tab';
const NAV_ADMIN_TAB_KEY = 'mfs_nav_admin_tab';

const safeSetItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`⚠️ localStorage limit reached for key: ${key}. Keeping changes in-memory.`, e);
  }
};

export const getStoredUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) {
    safeSetItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_USERS;
  }
};

export const saveStoredUsers = (users: User[]): void => {
  safeSetItem(USERS_KEY, JSON.stringify(users));
};

export const getStoredCurrentUser = (): User | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export const saveStoredCurrentUser = (user: User | null): void => {
  if (user) {
    safeSetItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const getStoredProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  if (!data) {
    safeSetItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products: Product[]): void => {
  safeSetItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const getStoredOrders = (): Order[] => {
  const data = localStorage.getItem(ORDERS_KEY);
  if (!data) {
    safeSetItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_ORDERS;
  }
};

export const saveStoredOrders = (orders: Order[]): void => {
  safeSetItem(ORDERS_KEY, JSON.stringify(orders));
};

export const getStoredCart = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const saveStoredCart = (cart: CartItem[]): void => {
  safeSetItem(CART_KEY, JSON.stringify(cart));
};

export const getStoredReviews = (): Review[] => {
  const data = localStorage.getItem(REVIEWS_KEY);
  if (!data) {
    safeSetItem(REVIEWS_KEY, JSON.stringify(INITIAL_REVIEWS));
    return INITIAL_REVIEWS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_REVIEWS;
  }
};

export const saveStoredReviews = (reviews: Review[]): void => {
  safeSetItem(REVIEWS_KEY, JSON.stringify(reviews));
};

// Navigation Persistence
export const getStoredPageView = (defaultView: PageView): PageView => {
  const data = localStorage.getItem(NAV_PAGE_KEY);
  return (data as PageView) || defaultView;
};

export const saveStoredPageView = (view: PageView): void => {
  safeSetItem(NAV_PAGE_KEY, view);
};

export const getStoredCustomerTab = (defaultTab: CustomerTab | 'checkout'): CustomerTab | 'checkout' => {
  const data = localStorage.getItem(NAV_CUST_TAB_KEY);
  return (data as CustomerTab | 'checkout') || defaultTab;
};

export const saveStoredCustomerTab = (tab: CustomerTab | 'checkout'): void => {
  safeSetItem(NAV_CUST_TAB_KEY, tab);
};

export const getStoredAdminTab = (defaultTab: AdminTab): AdminTab => {
  const data = localStorage.getItem(NAV_ADMIN_TAB_KEY);
  return (data as AdminTab) || defaultTab;
};

export const saveStoredAdminTab = (tab: AdminTab): void => {
  safeSetItem(NAV_ADMIN_TAB_KEY, tab);
};
