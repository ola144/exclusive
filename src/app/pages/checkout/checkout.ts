import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { cartItems, IProduct } from '../../models';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, Button],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  cartItems = signal<IProduct[]>([]);

  ngOnInit(): void {
    this.cartItems.set(cartItems);
  }

  cartTotal(): number {
    const total = this.cartItems().reduce(
      (accumulator, element) => accumulator + (element.subtotal ?? 0),
      0,
    );
    return total;
  }
}
