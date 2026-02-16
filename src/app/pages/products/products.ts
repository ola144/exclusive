import { Component, inject } from '@angular/core';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { HomeProducts } from '../../components/home-products/home-products';

@Component({
  selector: 'app-products',
  imports: [HomeProducts],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  masterService: Master = inject(Master);
  router: Router = inject(Router);

  onNavigateHome(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
