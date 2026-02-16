import { Component, inject, OnInit, signal } from '@angular/core';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { Button } from '../../components/button/button';
import { cartItems, IProduct } from '../../models';

@Component({
  selector: 'app-cart',
  imports: [Button],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  masterService: Master = inject(Master);
  router: Router = inject(Router);

  cartItems = signal<IProduct[]>([]);

  ngOnInit(): void {
    this.cartItems.set(cartItems);
  }

  increaseQty(item: IProduct) {
    const cartItem = item;
    if (!cartItem) return;

    this.cartItems.update((items: IProduct[]) =>
      items.map((p) =>
        p.id === cartItem.id
          ? {
              ...p,
              quantity: p.quantity + 1,
              subtotal: (p.quantity + 1) * p.price,
            }
          : p,
      ),
    );

    this.cartTotal();
  }

  decreaseQty(item: IProduct) {
    const cartItem = item;
    if (!cartItem) return;

    if (cartItem.quantity > 1) {
      this.cartItems.update((items: IProduct[]) =>
        items.map((p) =>
          p.id === cartItem.id
            ? {
                ...p,
                quantity: p.quantity - 1,
                subtotal: (p.quantity - 1) * p.price,
              }
            : p,
        ),
      );

      this.cartTotal();
    }
  }

  cartTotal(): number {
    const total = this.cartItems().reduce(
      (accumulator, element) => accumulator + (element.subtotal ?? 0),
      0,
    );
    return total;
  }

  deleteCartItem(item: IProduct) {
    this.cartItems.update((items) => items.filter((i) => i.id !== item.id));
  }

  onNavigateHome(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
