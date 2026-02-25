import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '../title/title';
import { AdminProductService } from '../../admin/services';
import { IProduct } from '../../admin/models';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  cta: string;
  featured?: boolean;
  span?: string;
}

@Component({
  selector: 'app-home-featured',
  imports: [CommonModule, Title],
  templateUrl: './home-featured.html',
  styleUrl: './home-featured.css',
})
export class HomeFeatured {
  productService: AdminProductService = inject(AdminProductService);
  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  featuredProducts = computed(() => {
    const items = this.productService.products().filter((p) => p.isFeatured);

    return [...items] // clone array
      .slice(0, 4); // take 1
  });

  buyNow(data: IProduct) {
    if (this.authService.isLogin()) {
      this.productService.addToCart(data);
      this.router.navigateByUrl('/cart');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
