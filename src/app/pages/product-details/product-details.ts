import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '../../components/title/title';
import { Button } from '../../components/button/button';
import { Master } from '../../services/master';
import { ProductCard } from '../../components/product-card/product-card';
import { IProduct } from '../../admin/models';
import { AdminProductService } from '../../admin/services';
import { Auth } from '../../services/auth';
import { ReviewProduct } from '../../components/review-product/review-product';
import { TinySliderInstance, tns } from 'tiny-slider';
import { ReviewCard } from '../../components/review-card/review-card';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, Title, Button, ProductCard, ReviewProduct, ReviewCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit, AfterViewInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  masterService: Master = inject(Master);
  productService: AdminProductService = inject(AdminProductService);
  router: Router = inject(Router);
  authService: Auth = inject(Auth);

  @ViewChild('slider') slider!: ElementRef;
  slideInstance!: TinySliderInstance;

  products = signal<IProduct[]>([]);

  selectedImageIndex = signal<number>(0);
  selectedColour: string | null = null;
  selectedSize = signal<string | null>(null);

  showReviewForm: WritableSignal<boolean> = signal(false);

  // route param as signal
  productId = toSignal(this.activeRoute.paramMap, { initialValue: null });

  foundProduct = computed<IProduct | any>(() => {
    const id = this.productId()?.get('productId');

    return this.productService.getAllProducts().find((p) => p.$id === id);
  });

  imageUrls = computed(() => {
    const product = this.foundProduct();
    if (!product?.productImg) return [];

    return product.productImg.map((id: string) => this.productService.getImageUrl(id));
  });

  relatedCategoryProducts = computed<IProduct[]>(() => {
    return this.products().filter(
      (p) => p.productCategory === this.foundProduct()?.productCategory,
    );
  });

  getRelatedProducts = computed<IProduct[]>(() => {
    return this.relatedCategoryProducts().filter((p) => p.$id !== this.foundProduct()?.$id);
  });

  productInCart = (productId: string): boolean => {
    return this.productService.cartItems().some((item) => item.productId === productId);
  };

  ngOnInit() {
    this.products.set(this.productService.getAllProducts());

    this.authService.isLogin();
    this.productService.initializeCart();
    this.initializeSlider();
  }

  ngAfterViewInit(): void {
    this.initializeSlider();
  }

  selectImage(idx: number) {
    this.selectedImageIndex.set(idx);
  }

  prevImage() {
    if (this.selectedImageIndex() > 0) this.selectedImageIndex.set(this.selectedImageIndex() - 1);
  }

  nextImage() {
    const images = this.productService.getImageUrl(this.foundProduct()?.productImg);
    if (this.selectedImageIndex() < images.length - 1) {
      this.selectedImageIndex.set(this.selectedImageIndex() + 1);
    }
  }

  selectColour(col: string) {
    this.selectedColour = col;
  }

  selectSize(size: string) {
    this.selectedSize.set(size);
  }

  buyNow() {
    this.productService.addToCart(this.foundProduct());
    this.router.navigateByUrl('/cart');
  }

  toggleWishlist() {
    this.productService.addToWishList(this.foundProduct());
  }

  onNavigateToProduct(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  openReviewProductForm() {
    this.showReviewForm.set(true);
  }

  averageRating(productId: string): number {
    return this.productService.calculateAverageRating(productId);
  }

  initializeSlider() {
    this.slideInstance = tns({
      container: this.slider?.nativeElement,
      items: 3,
      gutter: 10,
      slideBy: 1,
      autoplay: false,
      autoplayTimeout: 3000,
      autoplayButtonOutput: false,

      controls: true, // arrows
      controlsText: ['←', '→'],

      nav: true, // 👈 pagination dots
      navPosition: 'bottom',

      mouseDrag: true,
      touch: true,

      loop: true,

      responsive: {
        0: { items: 1 },
        800: { items: 2 },
        1024: { items: 3 },
      },
    });
  }

  // roundedRating = computed(() => {
  //   const avgRating = this.averageRating(this.foundProduct()?.$id);
  //   return Math.ceil(avgRating);
  // });
}
