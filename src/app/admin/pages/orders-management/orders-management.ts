import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminOrderService } from '../../services/admin-order.service';
import { Order } from '../../models/admin.models';
import { Button } from '../../../components/button/button';
import { IOrder } from '../../../models';
import { Loader } from '../../../components/loader/loader';

@Component({
  selector: 'app-orders-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, Loader],
  templateUrl: './orders-management.html',
})
export class OrdersManagementComponent implements OnInit {
  public searchTerm = '';
  public selectedStatus = '';
  public selectedOrder: IOrder | null = null;

  constructor(public orderService: AdminOrderService) {}

  ngOnInit() {
    this.orderService.getAllOrders();
    this.orderService.initializeOrderData();
  }

  updateOrderStatus(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (this.selectedOrder) {
      this.orderService.updateOrderStatus(
        this.selectedOrder.$id,
        this.selectedOrder,
        value as Order['status'],
        this.selectedOrder.customerId,
      );
      this.selectedOrder = { ...this.selectedOrder, orderStatus: value as Order['status'] };
    }
  }

  updatePaymentStatus(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (this.selectedOrder) {
      this.orderService.updatePaymentStatus(
        this.selectedOrder.$id,
        value as IOrder['paymentStatus'],
        this.selectedOrder,
        this.selectedOrder.customerId,
      );
      this.selectedOrder = {
        ...this.selectedOrder,
        paymentStatus: value as IOrder['paymentStatus'],
      };
    }
  }

  updateStatus(orderId: string | undefined) {
    if (!orderId) return;
    const order = this.orderService.getOrderById(orderId);
    if (!order) return;

    const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(order.orderStatus);
    if (currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1];
      this.orderService.updateOrderStatus(orderId, order, nextStatus, order.customerId);
    }
  }

  printOrder() {
    window.print();
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

  exportToCSV() {
    const orders = this.orderService.getAllOrders();
    const csv = [
      ['Order ID', 'Customer', 'Amount', 'Status', 'Payment Status', 'Date'],
      ...orders.map((o) => [
        o.orderNumber,
        o.customerName,
        o.total,
        o.orderStatus,
        o.paymentStatus,
        o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
  }
}
