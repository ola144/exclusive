import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { Title } from '../../components/title/title';
import { Button } from '../../components/button/button';
import { AdminProductService } from '../../admin/services';
import { IProduct } from '../../admin/models';
import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCard, Title, Button, Loader],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
  productService: AdminProductService = inject(AdminProductService);

  products = signal<IProduct[]>([]);

  justForYou = computed(() => {
    const items = this.productService.products();

    return [...items] // clone array
      .sort(() => Math.random() - 0.5) // shuffle
      .slice(0, 4); // take 4
  });

  ngOnInit(): void {
    // this.wishList.set(wishList);
    // this.products.set(allProducts);
    this.productService.initializeWishlist();
  }

  deleteWishListItem(item: IProduct) {
    this.productService.removeFromWishlist(item.$id);
  }
}
