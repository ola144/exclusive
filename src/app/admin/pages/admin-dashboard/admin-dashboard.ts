import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { AdminOrderService } from '../../services/admin-order.service';
import { AdminProductService } from '../../services/admin-product.service';
import { AdminCustomerService } from '../../services/admin-customer.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    public dashboardService: AdminDashboardService,
    public orderService: AdminOrderService,
    public productService: AdminProductService,
    public customerService: AdminCustomerService,
  ) {}

  ngOnInit() {
    this.dashboardService.refreshStats();
    this.orderService.getAllOrders();
    this.productService.getAllProducts();
    this.customerService.getAllCustomers();
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
}
