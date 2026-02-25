import { Component, inject, Input } from '@angular/core';
import { IProductReview } from '../../admin/models';
import { AdminProductService } from '../../admin/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-card',
  imports: [CommonModule],
  templateUrl: './review-card.html',
  styleUrl: './review-card.css',
})
export class ReviewCard {
  productService: AdminProductService = inject(AdminProductService);

  @Input() review!: IProductReview;
  @Input() productNameFS: string = '';
}
