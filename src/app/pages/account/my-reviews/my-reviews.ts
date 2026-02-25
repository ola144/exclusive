import { Component, inject, OnInit } from '@angular/core';
import { AdminProductService } from '../../../admin/services';
import { CommonModule } from '@angular/common';
import { ReviewCard } from '../../../components/review-card/review-card';
import { Loader } from '../../../components/loader/loader';

@Component({
  selector: 'app-my-reviews',
  imports: [CommonModule, ReviewCard, Loader],
  templateUrl: './my-reviews.html',
  styleUrl: './my-reviews.css',
})
export class MyReviews implements OnInit {
  productService: AdminProductService = inject(AdminProductService);

  ngOnInit(): void {
    this.productService.getReviewsForUser();
  }
}
