import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminCustomerService } from '../../services/admin-customer.service';
import { Customer } from '../../models/admin.models';
import { Button } from '../../../components/button/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './customers-management.html',
})
export class CustomersManagementComponent implements OnInit {
  toastr: ToastrService = inject(ToastrService);

  public searchTerm = '';
  public selectedCustomer: Customer | null = null;

  confirmDeleteCustomer = signal<boolean>(false);
  loading = signal<boolean>(false);

  userId = signal<string>('');

  constructor(public customerService: AdminCustomerService) {}

  ngOnInit() {
    this.customerService.getAllCustomers();

    console.log(this.customerService.getAllCustomers());
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

  toggleCustomerStatus() {
    if (this.selectedCustomer) {
      this.customerService.toggleCustomerStatus(this.selectedCustomer.id);
      this.selectedCustomer.isActive = !this.selectedCustomer.isActive;
    }
  }
}
