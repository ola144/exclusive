import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { Button } from '../button/button';

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

  private timerSubscription: Subscription | null = null;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startCountdown() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.seconds() > 0) {
        this.seconds.update(s => s - 1);
      } else if (this.minutes() > 0) {
        this.minutes.update(m => m - 1);
        this.seconds.set(59);
      } else if (this.hours() > 0) {
        this.hours.update(h => h - 1);
        this.minutes.set(59);
        this.seconds.set(59);
      } else if (this.days() > 0) {
        this.days.update(d => d - 1);
        this.hours.set(23);
        this.minutes.set(59);
        this.seconds.set(59);
      }
    });
  }

  formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }

  onBuyNow() {
    // Navigate to products or add to cart
    console.log('Buy Now clicked');
  }
}
