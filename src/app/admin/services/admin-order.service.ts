import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { Order, OrderItem } from '../models/admin.models';

@Injectable({
  providedIn: 'root',
})
export class AdminOrderService {
  // Signals
  orders = signal<Order[]>([]);
  loading = signal(false);
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
      const matchesStatus = !status || order.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  totalOrders = computed(() => this.orders().length);
  pendingOrders = computed(() => this.orders().filter((o) => o.status === 'pending').length);
  totalRevenue = computed(() => this.orders().reduce((sum, order) => sum + order.totalAmount, 0));
  processingOrders = computed(() => this.orders().filter((o) => o.status === 'processing').length);
  shippedOrders = computed(() => this.orders().filter((o) => o.status === 'shipped').length);
  deliveredOrders = computed(() => this.orders().filter((o) => o.status === 'delivered').length);

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'ORD-001',
        customerId: 'C1',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        items: [
          {
            productId: '1',
            productName: 'Gaming Headset',
            quantity: 1,
            price: 79.99,
            subtotal: 79.99,
          },
        ],
        totalAmount: 79.99,
        status: 'delivered',
        paymentStatus: 'paid',
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA',
          phone: '555-0123',
        },
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-05'),
      },
      {
        id: '2',
        orderNumber: 'ORD-002',
        customerId: 'C2',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        items: [
          {
            productId: '2',
            productName: 'Wireless Mouse',
            quantity: 2,
            price: 29.99,
            subtotal: 59.98,
          },
        ],
        totalAmount: 59.98,
        status: 'processing',
        paymentStatus: 'paid',
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90001',
          country: 'USA',
          phone: '555-0456',
        },
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-11'),
      },
      {
        id: '3',
        orderNumber: 'ORD-003',
        customerId: 'C3',
        customerName: 'Bob Johnson',
        customerEmail: 'bob@example.com',
        items: [
          {
            productId: '3',
            productName: 'Mechanical Keyboard',
            quantity: 1,
            price: 129.99,
            subtotal: 129.99,
          },
        ],
        totalAmount: 129.99,
        status: 'pending',
        paymentStatus: 'pending',
        shippingAddress: {
          street: '789 Pine Rd',
          city: 'Chicago',
          state: 'IL',
          postalCode: '60601',
          country: 'USA',
          phone: '555-0789',
        },
        createdAt: new Date('2024-02-12'),
        updatedAt: new Date('2024-02-12'),
      },
    ];
    this.orders.set(mockOrders);
  }

  loadOrders() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 500);
  }

  // Get all orders
  getAllOrders() {
    return this.filteredOrders();
  }

  // Get single order
  getOrderById(id: string): Order | undefined {
    return this.orders().find((o) => o.id === id);
  }

  // Update order status
  updateOrderStatus(id: string, status: Order['status']) {
    this.orders.update((orders) =>
      orders.map((o) => (o.id === id ? { ...o, status, updatedAt: new Date() } : o)),
    );
  }

  // Update payment status
  updatePaymentStatus(id: string, paymentStatus: Order['paymentStatus']) {
    this.orders.update((orders) =>
      orders.map((o) => (o.id === id ? { ...o, paymentStatus, updatedAt: new Date() } : o)),
    );
  }

  // Add order
  addOrder(order: Omit<Order, 'id'>) {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
    };
    this.orders.update((orders) => [newOrder, ...orders]);
    return newOrder;
  }

  // Cancel order
  cancelOrder(id: string) {
    this.updateOrderStatus(id, 'cancelled');
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
  getOrdersByStatus(status: Order['status']) {
    return this.orders().filter((o) => o.status === status);
  }

  // Get revenue summary
  getRevenueSummary() {
    return {
      totalRevenue: this.totalRevenue(),
      paid: this.orders()
        .filter((o) => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + o.totalAmount, 0),
      pending: this.orders()
        .filter((o) => o.paymentStatus === 'pending')
        .reduce((sum, o) => sum + o.totalAmount, 0),
    };
  }
}
