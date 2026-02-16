import { Component, inject, OnInit } from '@angular/core';
import { Title } from '../title/title';
import { products } from '../../models';
import { Button } from '../button/button';
import { ProductCard } from '../product-card/product-card';
import { Router } from '@angular/router';
import { Master } from '../../services/master';

@Component({
  selector: 'app-best-selling',
  imports: [Title, Button, ProductCard],
  templateUrl: './best-selling.html',
  styleUrl: './best-selling.css',
})
export class BestSelling implements OnInit {
  products: any;

  masterService: Master = inject(Master);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.products = products;
  }

  onNavigateToProduct(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
