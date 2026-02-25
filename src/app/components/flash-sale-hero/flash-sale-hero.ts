import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { Button } from '../button/button';
import { AdminProductService } from '../../admin/services';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-flash-sale-hero',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './flash-sale-hero.html',
  styleUrls: ['./flash-sale-hero.css'],
})
export class FlashSaleHero implements OnInit, OnDestroy {
  // Countdown
  days = signal<number>(3);
  hours = signal<number>(23);
  minutes = signal<number>(19);
  seconds = signal<number>(56);

  productService: AdminProductService = inject(AdminProductService);
  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  private timerSubscription: Subscription | null = null;

  flashSales = computed(() => {
    const items = this.productService.products().filter((p) => p.isFeatured);

    return [...items] // clone array
      .sort(() => Math.random() - 0.5) // shuffle
      .slice(0, 1); // take 1
  });

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  buyNow() {
    if (this.authService.isLogin()) {
      this.productService.addToCart(this.flashSales()[0]);
      this.router.navigateByUrl('/cart');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  startCountdown() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.seconds() > 0) {
        this.seconds.update((s) => s - 1);
      } else if (this.minutes() > 0) {
        this.minutes.update((m) => m - 1);
        this.seconds.set(59);
      } else if (this.hours() > 0) {
        this.hours.update((h) => h - 1);
        this.minutes.set(59);
        this.seconds.set(59);
      } else if (this.days() > 0) {
        this.days.update((d) => d - 1);
        this.hours.set(23);
        this.minutes.set(59);
        this.seconds.set(59);
      }
    });
  }

  formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
