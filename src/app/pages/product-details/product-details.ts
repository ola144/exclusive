import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { allProducts, IProduct } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '../../components/title/title';
import { Button } from '../../components/button/button';
import { Master } from '../../services/master';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, Title, Button, ProductCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  masterService: Master = inject(Master);
  router: Router = inject(Router);

  products = signal<IProduct[]>([]);

  selectedImageIndex = signal<number>(0);
  selectedColour: string | null = null;
  selectedSize = signal<string | null>(null);

  // route param as signal
  productId = toSignal(this.activeRoute.paramMap, { initialValue: null });

  foundProduct = computed<IProduct | any>(() => {
    const id = Number(this.productId()?.get('productId'));

    return this.products().find((p) => p.id === id);
  });

  relatedCategoryProducts = computed<IProduct[]>(() => {
    return this.products().filter((p) => p.category === this.foundProduct()?.category);
  });

  getRelatedProducts = computed<IProduct[]>(() => {
    return this.relatedCategoryProducts().filter((p) => p.id !== this.foundProduct()?.id);
  });

  ngOnInit() {
    this.products.set(allProducts);

    console.log(this.foundProduct());
  }

  selectImage(idx: number) {
    this.selectedImageIndex.set(idx);
  }

  prevImage() {
    if (this.selectedImageIndex() > 0) this.selectedImageIndex.set(this.selectedImageIndex() - 1);
  }

  nextImage() {
    if (this.selectedImageIndex() < this.foundProduct()?.image.length - 1)
      this.selectedImageIndex.set(this.selectedImageIndex() + 1);
  }

  selectColour(col: string) {
    this.selectedColour = col;
  }

  selectSize(size: string) {
    this.selectedSize.set(size);
  }

  increment() {
    const product = this.foundProduct();
    if (!product) return;

    this.products.update((item) =>
      item.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)),
    );

  }

  decrement() {
    if (this.foundProduct().quantity > 1) {
      const product = this.foundProduct();
      if (!product) return;

      this.products.update((item) =>
        item.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p)),
      );

      // this.product.update((p) => ({
      //   ...p,
      //   quantity: p.quantity - 1,
      // }));
    }
  }

  addToCart() {
    // console.log('Add to cart', {
    //   product: this.product,
    //   colour: this.selectedColour,
    //   size: this.selectedSize,
    // });
    alert('Added to cart');
  }

  buyNow() {
    // console.log('Buy now', { product: this.product });
    alert('Proceed to checkout (placeholder)');
  }

  toggleWishlist() {
    console.log('Wishlist toggled for', this.foundProduct()?.id);
  }

  onNavigateToProduct(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
