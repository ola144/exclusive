import { inject, Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { Order, OrderItem } from '../models/admin.models';
import { IOrder } from '../../models';
import { DB_PATHS, rtdb } from '../../core/firebase.config';
import { get, ref, update } from '@firebase/database';
import { ToastrService } from 'ngx-toastr';
import { DATABASE_ID, databases, NOTIFICATIONS_COLLECTION_ID } from '../../core/appwrite.config';
import { ID } from 'appwrite';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AdminOrderService {
  toastr: ToastrService = inject(ToastrService);

  // Signals
  orders = signal<IOrder[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  selectedStatus = signal<string>('');
  searchQuery = signal('');

  // Computed values
  filteredOrders = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const status = this.selectedStatus();

    return this.orders().filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query);
      const matchesStatus = !status || order.orderStatus === status;
      return matchesSearch && matchesStatus;
    });
  });

  totalOrders = computed(() => this.orders().length);
  pendingOrders = computed(() => this.orders().filter((o) => o.orderStatus === 'pending').length);
  totalRevenue = computed(() => this.orders().reduce((sum, order) => sum + order.total, 0));
  processingOrders = computed(
    () => this.orders().filter((o) => o.orderStatus === 'processing').length,
  );
  shippedOrders = computed(() => this.orders().filter((o) => o.orderStatus === 'shipped').length);
  deliveredOrders = computed(
    () => this.orders().filter((o) => o.orderStatus === 'delivered').length,
  );

  constructor(private notification: NotificationService) {
    this.initializeOrderData();
  }

  async initializeOrderData() {
    this.loading.set(true);
    try {
      // Get all orders
      const ordersRef = ref(rtdb, DB_PATHS.ORDERS);
      const ordersSnapshot = await get(ordersRef);

      if (!ordersSnapshot.exists()) {
        return [];
      }

      const ordersData = ordersSnapshot.val();

      this.orders.set(ordersData);

      // convert ordersData from object to array if needed
      if (typeof ordersData === 'object' && !Array.isArray(ordersData)) {
        const ordersArray = Object.keys(ordersData).map((key) => ({
          ...ordersData[key],
          $id: key,
        }));
        this.orders.set(ordersArray);
        return ordersArray;
      }
      return ordersData;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      this.toastr.error('Failed to fetch user orders', 'Error');
      return [];
    } finally {
      this.loading.set(false);
    }
  }

  // Get all orders
  getAllOrders() {
    return this.filteredOrders();
  }

  // Get single order
  getOrderById(id: string): IOrder | undefined {
    return this.orders().find((o) => o.$id === id);
  }

  // Update order status
  async updateOrderStatus(
    orderId: string | undefined,
    order: IOrder,
    status: IOrder['orderStatus'],
    userId: string,
  ): Promise<void> {
    try {
      if (!orderId) {
        this.toastr.error('Order ID is undefined');
        return;
      }
      const orderRef = ref(rtdb, `${DB_PATHS.ORDERS}/${orderId}`);
      await update(orderRef, {
        orderStatus: status,
        updatedAt: new Date().toISOString(),
      });

      const productName = order.items?.map((item) => item.productName);

      await databases.createDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, ID.unique(), {
        userId: userId,
        title: 'Order Status Updated',
        userMessage: `Your order status of ${productName}, is now ${status}.`,
        adminMessage: `You've updated the status of ${order.customerName} order to ${status}`,
        type: 'order',
        userIsRead: false,
        adminIsRead: false,
        orderId: orderId,
      });

      this.notification.getAllNotifications();
      this.notification.getUserNotification();

      this.initializeOrderData();
      this.toastr.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      this.toastr.error('Failed to update order status');
    }
  }

  // Update payment status
  async updatePaymentStatus(
    id: string | undefined,
    paymentStatus: IOrder['paymentStatus'],
    order: IOrder,
    userId: string,
  ) {
    try {
      if (!id) {
        this.toastr.error('Order ID is undefined');
        return;
      }
      const orderRef = ref(rtdb, `${DB_PATHS.ORDERS}/${id}`);
      await update(orderRef, {
        paymentStatus,
        updatedAt: new Date().toISOString(),
      });

      const productName = order.items?.map((item) => item.productName);

      await databases.createDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, ID.unique(), {
        userId: userId,
        title: 'Order Payment Status Updated',
        message: ``,
        userMessage: `Your order payment status of ${productName}, is now ${paymentStatus}.`,
        adminMessage: `You've updated the payment of status of  of ${order.customerName} order.`,
        type: 'order',
        userIsRead: false,
        adminIsRead: false,
        orderId: id,
      });

      this.notification.getAllNotifications();
      this.notification.getUserNotification();

      this.initializeOrderData();
      this.toastr.success(`Payment status updated to ${paymentStatus}`);
    } catch (error) {
      console.error('Error updating payment status:', error);
      this.toastr.error('Failed to update payment status');
    }
  }

  // Cancel order
  async cancelOrder(orderId: string | undefined, order: IOrder): Promise<void> {
    if (!orderId) {
      this.toastr.error('Order ID is undefined');
      return;
    }
    try {
      const orderRef = ref(rtdb, `${DB_PATHS.ORDERS}/${orderId}`);
      await update(orderRef, {
        orderStatus: 'cancelled',
        updatedAt: new Date().toISOString(),
      });

      const productName = order.items?.map((item) => item.productName);

      await databases.createDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, ID.unique(), {
        userId: order.customerId,
        title: 'Order Status Updated',
        userMessage: `You've cancelled the of ${productName}.`,
        adminMessage: `${order.customerName} cancelled his/her order of ${productName}.`,
        type: 'order',
        userIsRead: false,
        adminIsRead: false,
        orderId: orderId,
      });

      this.toastr.success('Order cancelled successfully');
    } catch (error) {
      console.error('Error cancelling order:', error);
      this.toastr.error('Failed to cancel order');
    }
  }

  // Set status filter
  setStatusFilter(status: string) {
    this.selectedStatus.set(status);
  }

  // Set search query
  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  // Get orders by status
  getOrdersByStatus(status: IOrder['orderStatus']) {
    return this.orders().filter((o) => o.orderStatus === status);
  }

  // Get revenue summary
  getRevenueSummary() {
    return {
      totalRevenue: this.totalRevenue(),
      paid: this.orders()
        .filter((o) => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + o.total, 0),
      pending: this.orders()
        .filter((o) => o.paymentStatus === 'pending')
        .reduce((sum, o) => sum + o.total, 0),
    };
  }
}
