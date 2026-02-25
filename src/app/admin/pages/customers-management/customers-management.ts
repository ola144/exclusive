import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminCustomerService } from '../../services/admin-customer.service';
import { Customer } from '../../models/admin.models';
import { Button } from '../../../components/button/button';
import { ToastrService } from 'ngx-toastr';
import { AdminOrderService } from '../../services';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-customers-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './customers-management.html',
})
export class CustomersManagementComponent implements OnInit {
  toastr: ToastrService = inject(ToastrService);
  orderService: AdminOrderService = inject(AdminOrderService);
  authService: Auth = inject(Auth);

  public searchTerm = '';
  public selectedCustomer: Customer | null = null;

  filteredOrder(selectedCustId: string) {
    return this.orderService.getAllOrders().filter((order) => order.customerId === selectedCustId);
  }

  customerTotalSpent(selectedCustId: string) {
    const orders = this.orderService
      .getAllOrders()
      .filter((order) => order.customerId === selectedCustId);

    return orders.reduce((sum, order) => sum + order.total, 0);
  }

  customerIsActive = computed(() => (this.selectedCustomer?.totalOrder ?? 0) > 0);

  confirmDeleteCustomer = signal<boolean>(false);
  loading = signal<boolean>(false);

  userId = signal<string>('');

  constructor(public customerService: AdminCustomerService) {}

  ngOnInit() {
    this.customerService.getAllCustomers();
    this.orderService.getAllOrders();
    this.orderService.initializeOrderData();
  }

  showConfirmDelete(id: string) {
    this.userId.set(id);
    this.confirmDeleteCustomer.set(true);
    console.log(this.userId());
  }

  deleteCustomer() {
    this.loading.set(true);
    this.customerService
      .deleteCustomer(this.userId())
      .then(() => {
        this.customerService.getAllCustomers();
        this.toastr.success('Customer deleted successfully!');
        this.confirmDeleteCustomer.set(false);
      })
      .catch((error) => {
        this.toastr.error(error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  viewCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    this.filteredOrder(customer.$id);
    this.customerTotalSpent(customer.$id);
  }

  toggleCustomerStatus() {
    if (this.selectedCustomer) {
      this.customerService.toggleCustomerStatus(this.selectedCustomer.$id);
      this.selectedCustomer.isActive = !this.selectedCustomer.isActive;
    }
  }
}
