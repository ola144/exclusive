import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Title } from '../title/title';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { AdminProductService } from '../../admin/services';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-home-products',
  imports: [ProductCard, Title, Loader],
  templateUrl: './home-products.html',
  styleUrl: './home-products.css',
})
export class HomeProducts implements OnInit {
  products = signal<any>([]);

  masterService: Master = inject(Master);
  productService: AdminProductService = inject(AdminProductService);
  router: Router = inject(Router);

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
