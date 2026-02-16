import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: IProduct;
  @Input() hideWishlistBtn!: string;
  @Input() hideDetailsBtn!: string;
  @Input() hideDeleteBtn!: string;
  @Output() deleteWishListItem: EventEmitter<any> = new EventEmitter<any>();

  addToCart(product: any) {
    console.log('Added to cart:', product);
  }

  toggleWishlist(product: any) {
    console.log('Wishlist toggled:', product);
  }
}
