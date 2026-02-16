import { Component, inject, signal } from '@angular/core';
import { Button } from '../button/button';
import { Master } from '../../services/master';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [Button],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  masterService: Master = inject(Master);
  router: Router = inject(Router);

  brands = signal<any[]>([
    {
      id: 1,
      logo: '/images/versace.png',
      name: 'versace',
    },
    {
      id: 2,
      logo: '/images/zara.png',
      name: 'zara',
    },
    {
      id: 3,
      logo: '/images/gucci.png',
      name: 'gucci',
    },
    {
      id: 4,
      logo: '/images/prada.png',
      name: 'parada',
    },
    {
      id: 5,
      logo: '/images/calvin.png',
      name: 'calvin',
    },
  ]);

  onNavigateToProduct(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
