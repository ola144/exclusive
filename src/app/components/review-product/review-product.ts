import { Component, inject, Input, signal } from '@angular/core';
import { AdminProductService } from '../../admin/services';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../admin/models';
import { Button } from '../button/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review-product',
  imports: [FormsModule, Button],
  templateUrl: './review-product.html',
  styleUrl: './review-product.css',
})
export class ReviewProduct {
  productService: AdminProductService = inject(AdminProductService);
  toastr: ToastrService = inject(ToastrService);

  @Input() selectedProduct: IProduct | null = null;

  @Input() showReviewProductForm = signal<boolean>(false);
  loading = signal<boolean>(false);

  rating = signal<number>(0);
  reviewText = signal<string>('');

  setdRating(rating: number) {
    const currentRating = this.rating();

    if (rating === currentRating) {
      this.rating.set(rating - 1);
    } else {
      this.rating.set(rating);
    }
  }

  submitReview() {
    this.loading.set(true);

    const reviewData = {
      rating: this.rating(),
      review: this.reviewText(),
    };

    this.productService
      .addReview(
        this.selectedProduct?.$id,
        this.selectedProduct?.productName || '',
        this.selectedProduct?.productImg?.[0] || '',
        reviewData,
      )
      .then(() => {
        this.toastr.success('Review added successfully');
        this.productService.getAllReviews();
        this.productService.getAllProducts();
        this.productService.getReviewsForUser();
        this.productService.updateProductReview(this.selectedProduct?.$id || '');
        this.productService.calculateAverageRating(this.selectedProduct?.$id || '');
        this.productService.getReviewsForProduct(this.selectedProduct?.$id || '');
        this.showReviewProductForm.set(false);
        this.rating.set(0);
        this.reviewText.set('');
      })
      .catch((error) => {
        this.toastr.error(error.message || 'Failed to add review');
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
