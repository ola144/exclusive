import { Injectable, inject, signal } from '@angular/core';
import {
  ref,
  push,
  set,
  get,
  child,
  query,
  orderByChild,
  equalTo,
  update,
  remove,
  onValue,
  DatabaseReference,
} from 'firebase/database';
import { auth, rtdb, DB_PATHS } from '../core/firebase.config';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IProduct } from '../admin/models';
import { IOrder, OrderItem } from '../models';
import {
  account,
  CART_COLLECTION_ID,
  DATABASE_ID,
  databases,
  NOTIFICATIONS_COLLECTION_ID,
  USERS_COLLECTION_ID,
} from '../core/appwrite.config';
import { Auth } from './auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { ID } from 'appwrite';
import { AdminProductService } from '../admin/services';
import { NotificationService } from '../admin/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private toastr = inject(ToastrService);
  private router = inject(Router);

  orders = signal<IOrder[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Use Observable to listen for real-time updates to orders
  private _data$ = new BehaviorSubject<boolean>(false);

  data$: Observable<boolean> = this._data$.asObservable();

  constructor(
    private authService: Auth,
    private productService: AdminProductService,
    private notificationService: NotificationService,
  ) {}

  async placeOrder(
    customerName: string,
    customerPhone: string,
    customerAddress: string,
    cartItems: IProduct[],
    paymentMethod: 'bank' | 'cash',
  ): Promise<IOrder | null> {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Get current user
      const user = await account.get();

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Generate order number
      const orderNumber = `ORD-${Date.now()}`;

      // Transform cart items to order items
      const orderItems: OrderItem[] = cartItems.map((item) => ({
        productId: item.$id,
        productName: item.productName,
        productImg: item.productImg?.[0] || '',
        quantity: item.productQty || 1,
        price: item.productPrice,
        category: item.productCategory,
        subtotal: item.productSubtotal || item.productPrice * (item.productQty || 1),
      }));

      // Calculate totals
      const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
      const shipping = 0; // Free shipping
      const total = subtotal + shipping;

      // Create order document
      const orderData: Omit<IOrder, '$id'> = {
        orderNumber,
        customerId: user.$id,
        customerName,
        customerEmail: user.email || '',
        customerPhone,
        customerAddress,
        subtotal,
        shipping,
        total,
        paymentMethod,
        orderStatus: 'pending',
        paymentStatus: 'pending',
        items: orderItems,
      };

      // Add order to Realtime Database
      const ordersRef = ref(rtdb, DB_PATHS.ORDERS);
      const newOrderRef = push(ordersRef);

      await set(newOrderRef, {
        ...orderData,
        orderId: newOrderRef.key,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await databases.createDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, ID.unique(), {
        userId: user.$id,
        title: 'Order Placed',
        userMessage: 'Your order has placed successfully.',
        adminMessage: `${user.name} has placed new order.`,
        type: 'order',
        userIsRead: false,
        adminIsRead: false,
        orderId: newOrderRef.key,
      });

      this.notificationService.getAllNotifications();
      this.notificationService.getUserNotification();

      await this.updateProfile(user.$id, this.authService.userProfile().totalOrder + 1 || 0);

      // Clear cart from database after successful order
      try {
        const clearCart = this.productService.cartItems().map((item) => {
          databases.deleteDocument(DATABASE_ID, CART_COLLECTION_ID, item.$id);
        });

        await Promise.all(clearCart);
      } catch (error) {}

      this.toastr.success(`Order placed successfully! Order Number: ${orderNumber}`, 'Success');

      return {
        $id: newOrderRef.key || '',
        ...orderData,
      } as IOrder;
    } catch (error: any) {
      console.error('Order placement error:', error);
      const errorMessage = error?.message || 'Failed to place order';
      this.error.set(errorMessage);
      this.toastr.error(errorMessage, 'Error');
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  async updatePaymentStatus(orderId: string, status: string) {
    const orderRef = ref(rtdb, `${DB_PATHS.ORDERS}/${orderId}`);
    await update(orderRef, { paymentStatus: status }).then(() => {
      this.getUserOrders(); // Refresh orders after update
      this._data$.next(true); // Emit event to notify listeners of data change
    });
  }

  private async clearCart(userId: string): Promise<void> {
    // Delete cart document for the user
    try {
      databases.deleteDocument(DATABASE_ID, CART_COLLECTION_ID, userId);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }

  async getUserOrders(): Promise<IOrder[]> {
    try {
      const user = await account.get();

      if (!user) {
        this.toastr.error('User not authenticated', 'Error');
        return [];
      }

      // Get all orders
      const ordersRef = ref(rtdb, DB_PATHS.ORDERS);
      const ordersSnapshot = await get(ordersRef);

      if (!ordersSnapshot.exists()) {
        return [];
      }

      const orders: IOrder[] = [];
      const ordersData = ordersSnapshot.val();

      // Sort by createdAt descending
      orders.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });

      for (const key in ordersData) {
        const orderData = ordersData[key];
        if (orderData.customerId === user.$id) {
          orders.push({
            $id: key,
            ...orderData,
          } as IOrder);
        }
      }
      return orders;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      this.toastr.error('Failed to fetch user orders', 'Error');
      return [];
    }
  }

  async updateProfile(documentId: string, totalOrder: number) {
    return await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, documentId, {
      totalOrder: totalOrder + 1,
    });
  }
}
