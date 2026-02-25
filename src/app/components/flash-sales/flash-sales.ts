import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Button } from '../button/button';
import { CommonModule } from '@angular/common';
import { Title } from '../title/title';
import { ProductCard } from '../product-card/product-card';
import { TinySliderInstance, tns } from 'tiny-slider';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { AdminProductService } from '../../admin/services';

@Component({
  selector: 'app-flash-sales',
  imports: [Button, CommonModule, Title, ProductCard],
  templateUrl: './flash-sales.html',
  styleUrl: './flash-sales.css',
})
export class FlashSales implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('slider') slider!: ElementRef;

  masterService: Master = inject(Master);
  productService: AdminProductService = inject(AdminProductService);
  router: Router = inject(Router);

  flashSales = computed(() => {
    const items = this.productService.products();

    return [...items] // clone array
      .sort(() => Math.random() - 0.5) // shuffle
      .slice(0, 4); // take 4
  });

  title1: string = "Today's";

  products: any;

  slideInstance!: TinySliderInstance;

  // Countdown
  days = signal<number>(3);
  hours = signal<number>(23);
  minutes = signal<number>(19);
  seconds = signal<number>(56);

  private timer: any;

  ngOnInit() {
    this.productService.initializeData();
    this.startCountdown();
    this.initializeSlider();
  }

  ngAfterViewInit(): void {
    this.initializeSlider();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.slideInstance?.destroy();
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
        640: { items: 2 },
        1024: { items: 3 },
      },
    });
  }

  startCountdown() {
    this.timer = setInterval(() => {
      if (this.seconds() > 0) {
        this.seconds.set(this.seconds() - 1);
      } else {
        this.seconds.set(59);
        if (this.minutes() > 0) {
          this.minutes.set(this.minutes() - 1);
        } else {
          this.minutes.set(59);
          if (this.hours() > 0) {
            this.hours.set(this.hours() - 1);
          } else {
            this.hours.set(23);
            if (this.days() > 0) {
              this.days.set(this.days() - 1);
            }
          }
        }
      }
    }, 1000);
  }

  pauseSlider() {
    this.slideInstance?.pause();
  }

  playSlider() {
    this.slideInstance?.play();
  }

  onNavigateToProduct(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
