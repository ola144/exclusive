import { Component, computed, inject, OnInit } from '@angular/core';
import { Title } from '../title/title';
import { Button } from '../button/button';
import { ProductCard } from '../product-card/product-card';
import { Router } from '@angular/router';
import { Master } from '../../services/master';
import { AdminProductService } from '../../admin/services/admin-product.service';
import { IProduct } from '../../admin/models';

@Component({
  selector: 'app-best-selling',
  imports: [Title, Button, ProductCard],
  templateUrl: './best-selling.html',
  styleUrl: './best-selling.css',
})
export class BestSelling implements OnInit {
  products: any;

  masterService: Master = inject(Master);
  productService: AdminProductService = inject(AdminProductService);
  router: Router = inject(Router);

  bestSelling = computed(() => {
    const items = this.productService
      .products()
      .filter((item: IProduct) => item.productStatus === true);

    return [...items] // clone array
      .sort(() => Math.random() - 0.5) // shuffle
      .slice(0, 4); // take 4
  });

  ngOnInit(): void {
    this.productService.initializeData();
  }

  onNavigateToProduct(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
