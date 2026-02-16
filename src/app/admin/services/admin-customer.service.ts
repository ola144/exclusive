import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { account, DATABASE_ID, databases, USERS_COLLECTION_ID } from '../../core/appwrite.config';

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

  activeCustomers = computed(() => this.customers().filter((c) => c.isActive).length);

  totalCustomerSpent = computed(() => this.customers().reduce((sum, c) => sum + c.totalSpent, 0));

  averageOrderValue = computed(() => {
    const total = this.customers().reduce((sum, c) => sum + c.totalSpent, 0);
    const totalOrders = this.customers().reduce((sum, c) => sum + c.totalOrders, 0);
    return totalOrders > 0 ? total / totalOrders : 0;
  });

  constructor() {
    this.loadCustomer();
  }

  async loadCustomer() {
    const res: any = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID);

    // const mockCustomers: Customer[] = [
    //   {
    //     id: '1',
    //     name: 'John Doe',
    //     email: 'john@example.com',
    //     phone: '555-0123',
    //     address: {
    //       street: '123 Main St',
    //       city: 'New York',
    //       state: 'NY',
    //       postalCode: '10001',
    //       country: 'USA',
    //       phone: '555-0123',
    //     },
    //     totalOrders: 5,
    //     totalSpent: 349.95,
    //     createdAt: new Date('2024-01-15'),
    //     lastOrderDate: new Date('2024-02-10'),
    //     isActive: true,
    //   },
    //   {
    //     id: '2',
    //     name: 'Jane Smith',
    //     email: 'jane@example.com',
    //     phone: '555-0456',
    //     address: {
    //       street: '456 Oak Ave',
    //       city: 'Los Angeles',
    //       state: 'CA',
    //       postalCode: '90001',
    //       country: 'USA',
    //       phone: '555-0456',
    //     },
    //     totalOrders: 12,
    //     totalSpent: 899.88,
    //     createdAt: new Date('2023-11-20'),
    //     lastOrderDate: new Date('2024-02-10'),
    //     isActive: true,
    //   },
    //   {
    //     id: '3',
    //     name: 'Bob Johnson',
    //     email: 'bob@example.com',
    //     phone: '555-0789',
    //     totalOrders: 3,
    //     totalSpent: 199.97,
    //     createdAt: new Date('2024-02-01'),
    //     lastOrderDate: new Date('2024-02-12'),
    //     isActive: true,
    //   },
    //   {
    //     id: '4',
    //     name: 'Alice Williams',
    //     email: 'alice@example.com',
    //     phone: '555-0321',
    //     totalOrders: 0,
    //     totalSpent: 0,
    //     createdAt: new Date('2024-02-05'),
    //     isActive: false,
    //   },
    // ];
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
