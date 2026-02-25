import { Component, inject, OnInit, signal } from '@angular/core';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { Button } from '../../components/button/button';
import { AdminProductService } from '../../admin/services';
import { IProduct } from '../../admin/models';
import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-cart',
  imports: [Button, Loader],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  masterService: Master = inject(Master);
  router: Router = inject(Router);
  productService: AdminProductService = inject(AdminProductService);

  ngOnInit(): void {
    this.productService.initializeCart();
  }

  increaseQty(item: IProduct) {
    const cartItem = item;
    if (!cartItem) return;

    this.productService.cartItems.update((items: IProduct[]) =>
      items.map((p) =>
        p.$id === cartItem.$id
          ? {
              ...p,
              productQty: p.productQty + 1,
              productSubtotal: (p.productQty + 1) * p.productPrice,
            }
          : p,
      ),
    );

    this.productService.updateCartQuantity(cartItem.$id, cartItem.productQty + 1);

    this.cartTotal();
  }

  decreaseQty(item: IProduct) {
    const cartItem = item;
    if (!cartItem) return;

    if (cartItem.productQty > 1) {
      this.productService.cartItems.update((items: IProduct[]) =>
        items.map((p) =>
          p.$id === cartItem.$id
            ? {
                ...p,
                productQty: p.productQty - 1,
                productSubtotal: (p.productQty - 1) * p.productPrice,
              }
            : p,
        ),
      );

      this.productService.updateCartQuantity(cartItem.$id, cartItem.productQty - 1);
      this.cartTotal();
    }
  }

  cartTotal(): number {
    const total = this.productService
      .cartItems()
      .reduce((accumulator, element) => accumulator + (element.productSubtotal ?? 0), 0);
    return total;
  }

  deleteCartItem(item: IProduct) {
    this.productService.removeFromCart(item.$id);
  }

  onNavigateHome(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
