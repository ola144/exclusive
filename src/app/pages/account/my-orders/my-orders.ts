import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../services/order';
import { IOrder } from '../../../models';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Order } from '../../../admin/models';
import { AdminOrderService } from '../../../admin/services';
import { Loader } from '../../../components/loader/loader';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, Loader],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders implements OnInit {
  orderService: OrderService = inject(OrderService);
  adminOrderService: AdminOrderService = inject(AdminOrderService);
  toastr: ToastrService = inject(ToastrService);

  selectedOrder: IOrder | null = null;

  orderList = signal<IOrder[]>([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.getUserOrders();

    // Listen for real-time updates to orders
    this.orderService.data$.subscribe(() => {
      // Handle any updates needed when orders change
      this.getUserOrders(); // Refresh orders when data changes
    });
  }

  getUserOrders() {
    this.loading.set(true);
    this.orderService
      .getUserOrders()
      .then((orders) => {
        this.orderList.set(orders);
      })
      .catch((error) => {
        this.toastr.error('Failed to load orders', 'Error');
      })
      .finally(() => this.loading.set(false));
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  getPaymentColor(status: string): string {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-orange-100 text-orange-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  cancelOrder(orderId: string | undefined) {
    if (!orderId) return;
    const order = this.adminOrderService.getOrderById(orderId);
    if (!order) return;

    this.adminOrderService
      .updateOrderStatus(orderId, order, 'cancelled', order.customerId)
      .then(() => {
        this.getUserOrders();
      });
  }

  printOrder() {
    window.print();
  }
}
