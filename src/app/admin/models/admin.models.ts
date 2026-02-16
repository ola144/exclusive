// Admin User Model
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super-admin' | 'admin' | 'manager';
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

// Product Model
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  stock: number;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Order Model
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

// Order Item
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

// Address
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

// Customer Model
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: Address;
  phoneNumber: string;
  totalOrders: number;
  totalSpent: number;
  $createdAt: Date;
  lastOrderDate?: Date;
  isActive: boolean;
}

// Category Model
export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  productCount: number;
  createdAt: Date;
  isActive: boolean;
}

// Dashboard Stats
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  lowStockProducts: number;
  thisMonthRevenue: number;
  monthlyGrowth: number;
}
