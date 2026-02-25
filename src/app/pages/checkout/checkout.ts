import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../components/button/button';
import { AdminProductService } from '../../admin/services';
import { Auth } from '../../services/auth';
import { OrderService } from '../../services/order';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

declare var PaystackPop: any;

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, Button, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  productService: AdminProductService = inject(AdminProductService);
  authService: Auth = inject(Auth);
  orderService: OrderService = inject(OrderService);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);

  // Form signals
  customerName = signal('');
  customerAddress = signal('');
  customerPhone = signal('');
  paymentMethod = signal<'bank' | 'cash'>('bank');

  saveInfo = signal(false);
  isPlacingOrder = signal(false);

  ngOnInit(): void {
    this.productService.initializeCart();
    this.authService.getProfile().then(() => {
      const profile = this.authService.userProfile();
      if (profile) {
        this.customerName.set(profile.name);
        this.customerAddress.set(profile.address);
        this.customerPhone.set(profile.phoneNumber);
      }
    });
  }

  cartTotal(): number {
    const total = this.productService
      .cartItems()
      .reduce((accumulator, element) => accumulator + (element.productSubtotal ?? 0), 0);
    return total;
  }

  async placeOrder(): Promise<void> {
    // Validation
    if (!this.customerName().trim()) {
      this.toastr.error('Please enter your name', 'Validation Error');
      return;
    }

    if (!this.customerAddress().trim()) {
      this.toastr.error('Please enter your address', 'Validation Error');
      return;
    }

    if (!this.customerPhone().trim()) {
      this.toastr.error('Please enter your phone number', 'Validation Error');
      return;
    }

    if (this.productService.cartItems().length === 0) {
      this.toastr.error('Your cart is empty', 'Error');
      return;
    }

    if (!this.paymentMethod()) {
      this.toastr.error('Please select a payment method', 'Validation Error');
      return;
    }

    this.isPlacingOrder.set(true);

    const orderData = {
      customerName: this.customerName(),
      customerPhone: this.customerPhone(),
      customerAddress: this.customerAddress(),
      cartItems: this.productService.cartItems(),
      paymentMethod: this.paymentMethod(),
    };

    try {
      const order = await this.orderService.placeOrder(
        orderData.customerName,
        orderData.customerPhone,
        orderData.customerAddress,
        orderData.cartItems,
        orderData.paymentMethod,
      );

      if (order) {
        // Update user profile if save info is checked
        if (this.saveInfo() && this.authService.userProfile()) {
          await this.authService.updateProfile(
            this.authService.userProfile().$id,
            this.authService.userProfile().password,
            this.customerName(),
            this.customerPhone(),
            this.customerAddress(),
            this.authService.userProfile().avatar || '',
            this.authService.userProfile().password,
          );
        }
      }

      if (this.paymentMethod() === 'bank') {
        this.initializePaystackPayment(order);
      } else {
        this.toastr.success(
          'Order placed successfully! Please prepare cash on delivery.',
          'Success',
        );
      }

      // Clear cart from UI
      this.productService.cartItems.set([]);

      // Redirect to order success order page
      setTimeout(() => {
        this.router.navigate(['/account'], { fragment: 'order' });
      }, 2000);
    } catch (error) {
      console.error('Order placement error:', error);
      this.toastr.error('Failed to place order. Please try again.', 'Error');
    } finally {
      this.isPlacingOrder.set(false);
    }
  }

  onPaymentMethodChange(value: string): void {
    this.paymentMethod.set(value as 'bank' | 'cash');
  }

  onSaveInfoChange(checked: boolean): void {
    this.saveInfo.set(checked);
  }

  initializePaystackPayment(order: any) {
    const handler = PaystackPop.setup({
      key: 'pk_test_c075b3f482a9a757a8c83aa8868ba5852fc9a255', // Replace with your Paystack public key
      email: order.customerEmail,
      amount: order.total * 100, // Paystack expects amount in kobo
      currency: 'NGN',
      ref: order.orderNumber, // Unique reference for the transaction
      callback: (response: any) => {
        // Handle successful payment here
        this.orderService.updatePaymentStatus(order.$id, 'paid');
        this.toastr.success('Payment successful!', 'Success');
        this.router.navigate(['/account'], { fragment: 'order' });
      },
      onClose: () => {
        // Handle payment cancellation here
        this.toastr.info('Payment cancelled.', 'Info');
      },
    });

    handler.openIframe();
  }
}
