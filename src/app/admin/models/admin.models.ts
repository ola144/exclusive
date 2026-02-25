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

export interface IProduct {
  $id?: string | any;
  productId?: string | any;
  productName: string;
  productDesc: string;
  productImg?: string[] | any[];
  productPrice: number;
  productDiscount: number;
  productStatus: boolean;
  productRating: number;
  productReviews: number;
  productCategory: string;
  productQty: number;
  productSubtotal?: number;
  productInStock: number;
  isFeatured: boolean;
}

export interface IProductReview {
  $id?: string | any;
  productId: string;
  productImg: string;
  userId: string;
  userName: string;
  productName: string;
  rating: number;
  review: string;
  $createdAt: Date;
}

export interface INotification {
  $id: string;
  userId: string;
  title: string;
  userMessage: string;
  adminMessage: string;
  type: string;
  userIsRead: boolean;
  adminIsRead: boolean;
  orderId: string;
  $createdAt: string;
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
  $id: string;
  name: string;
  email: string;
  phone: string;
  address?: Address;
  phoneNumber: string;
  totalOrder: number;
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
  // thisMonthOrders: number;
}
