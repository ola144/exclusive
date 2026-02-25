import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { account, DATABASE_ID, databases, USERS_COLLECTION_ID } from '../../core/appwrite.config';
import { AdminOrderService } from './admin-order.service';

@Injectable({
  providedIn: 'root',
})
export class AdminCustomerService {
  // Signals
  customers = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searchQuery = signal('');

  // Computed values
  filteredCustomers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.customers().filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phoneNumber.includes(query),
    );
  });

  totalCustomers = computed(() => this.customers().length);

  activeCustomers = computed(() => this.customers().filter((c) => c.totalOrder > 0).length);

  totalCustomerSpent = computed(() =>
    this.orderService.orders().reduce((sum, c) => sum + c.total, 0),
  );

  averageOrderValue = computed(() => {
    const total = this.orderService.orders().reduce((sum, c) => sum + c.total, 0);
    const totalOrders = this.customers().reduce((sum, c) => sum + c.totalOrder, 0);
    return totalOrders > 0 ? total / totalOrders : 0;
  });

  constructor(private orderService: AdminOrderService) {
    this.loadCustomer();
  }

  async loadCustomer() {
    const res: any = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID);

    this.customers.set(res.documents);
  }

  // Get all customers
  getAllCustomers() {
    return this.filteredCustomers();
  }

  // Delete customer
  async deleteCustomer(id: string) {
    return (
      await databases.deleteDocument(DATABASE_ID, USERS_COLLECTION_ID, id),
      this.getAllCustomers()
    );
  }

  // Toggle customer active status
  toggleCustomerStatus(id: string) {
    this.customers.update((customers) =>
      customers.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)),
    );
  }

  // Set search query
  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  // Get customer statistics
  getCustomerStats() {
    return {
      total: this.totalCustomers(),
      active: this.activeCustomers(),
      totalSpent: this.totalCustomerSpent(),
      averageOrderValue: this.averageOrderValue(),
    };
  }
}
