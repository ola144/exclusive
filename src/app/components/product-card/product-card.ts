import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../admin/models';
import { AdminProductService } from '../../admin/services';
import { Auth } from '../../services/auth';
import { ReviewProduct } from '../review-product/review-product';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink, ReviewProduct],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard implements OnInit {
  @Input() product!: IProduct;
  @Input() hideWishlistBtn!: string;
  @Input() hideDetailsBtn!: string;
  @Input() hideDeleteBtn!: string;
  @Output() deleteWishListItem: EventEmitter<any> = new EventEmitter<any>();

  showReviewForm = signal<boolean>(false);

  productService: AdminProductService = inject(AdminProductService);
  authService: Auth = inject(Auth);

  productInCart = (productId: string): boolean => {
    return this.productService.cartItems().some((item) => item.productId === productId);
  };

  productInWishlist = (productId: string): boolean => {
    return this.productService.wishlistItems().some((item) => item.productId === productId);
  };

  ngOnInit(): void {
    this.productService.initializeCart();
    this.productService.initializeWishlist();
    this.authService.isLogin();
  }

  addToCart(product: IProduct) {
    this.productService.addToCart(product);
  }

  addProductToWishList(product: IProduct) {
    this.productService.addToWishList(product);
  }

  deleteFromWishList(product: any) {
    this.deleteWishListItem.emit(product);
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  openReviewProductForm() {
    this.showReviewForm.set(true);
    console.log(this.product);
  }

  averageRating(productId: string): number {
    return this.productService.calculateAverageRating(productId);
  }
}
