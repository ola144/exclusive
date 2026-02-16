import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { DashboardStats } from '../models/admin.models';
import { AdminOrderService } from './admin-order.service';
import { AdminProductService } from './admin-product.service';
import { AdminCustomerService } from './admin-customer.service';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  // Signals
  stats = signal<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    thisMonthRevenue: 0,
    monthlyGrowth: 0,
  });
  loading = signal(false);

  constructor(
    private orderService: AdminOrderService,
    private productService: AdminProductService,
    private customerService: AdminCustomerService
  ) {
    this.loadStats();
  }

  private loadStats() {
    this.loading.set(true);
    setTimeout(() => {
      this.stats.set({
        totalOrders: this.orderService.totalOrders(),
        totalRevenue: this.orderService.totalRevenue(),
        totalCustomers: this.customerService.totalCustomers(),
        totalProducts: this.productService.totalProducts(),
        pendingOrders: this.orderService.pendingOrders(),
        lowStockProducts: this.productService.lowStockProducts().length,
        thisMonthRevenue: this.calculateThisMonthRevenue(),
        monthlyGrowth: 12.5, // Mock value
      });
      this.loading.set(false);
    }, 500);
  }

  private calculateThisMonthRevenue(): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return this.orderService
      .getAllOrders()
      .filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getMonth() === currentMonth &&
          orderDate.getFullYear() === currentYear &&
          order.paymentStatus === 'paid'
        );
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);
  }

  // Get all stats
  getStats() {
    this.loadStats();
    return this.stats();
  }

  // Refresh stats
  refreshStats() {
    this.loadStats();
  }

  // Get recent orders
  getRecentOrders(limit: number = 5) {
    return this.orderService
      .getAllOrders()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  }

  // Get low stock products
  getLowStockProducts(limit: number = 5) {
    return this.productService.getLowStockProducts().slice(0, limit);
  }

  // Get top customers
  getTopCustomers(limit: number = 5) {
    return this.customerService
      .getAllCustomers()
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, limit);
  }
}
