import { Component, inject, OnInit, signal } from '@angular/core';
import { allProducts } from '../../models';
import { ProductCard } from '../product-card/product-card';
import { Title } from '../title/title';
import { Master } from '../../services/master';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-products',
  imports: [ProductCard, Title],
  templateUrl: './home-products.html',
  styleUrl: './home-products.css',
})
export class HomeProducts implements OnInit {
  products = signal<any>([]);

  masterService: Master = inject(Master);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.products.set(allProducts);
  }

  onNavigateToProduct(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
