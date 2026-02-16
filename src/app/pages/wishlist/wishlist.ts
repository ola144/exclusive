import { Component, computed, OnInit, signal } from '@angular/core';
import { allProducts, IProduct, wishList } from '../../models';
import { ProductCard } from '../../components/product-card/product-card';
import { Title } from '../../components/title/title';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCard, Title, Button],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
  wishList = signal<IProduct[]>([]);
  products = signal<IProduct[]>([]);

  justForYou = computed(() => {
    const items = this.products();

    return [...items] // clone array
      .sort(() => Math.random() - 0.5) // shuffle
      .slice(0, 4); // take 4
  });

  ngOnInit(): void {
    this.wishList.set(wishList);
    this.products.set(allProducts);
  }

  deleteWishListItem(item: IProduct) {
    this.wishList.update((items) => items.filter((i) => i.id !== item.id));
  }
}
