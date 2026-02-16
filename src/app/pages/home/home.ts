import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { FlashSales } from '../../components/flash-sales/flash-sales';
import { HomeCategory } from '../../components/home-category/home-category';
import { BestSelling } from '../../components/best-selling/best-selling';
import { FlashSaleHero } from '../../components/flash-sale-hero/flash-sale-hero';
import { HomeFeatured } from '../../components/home-featured/home-featured';
import { HomeAdvantage } from '../../components/home-advantage/home-advantage';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    FlashSales,
    HomeCategory,
    BestSelling,
    FlashSaleHero,
    HomeFeatured,
    HomeAdvantage,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
