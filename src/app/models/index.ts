export interface OrderItem {
  userId?: string;
  productId: string;
  productName: string;
  productImg: string;
  quantity: number;
  price: number;
  category: string;
  subtotal: number;
}

export interface IOrder {
  $id?: string;
  orderId?: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items?: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'bank' | 'cash';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid';
  createdAt?: string;
}
