import { Component, inject } from '@angular/core';
import { Title } from '../title/title';
import { Router } from '@angular/router';
import { Master } from '../../services/master';

@Component({
  selector: 'app-home-category',
  imports: [Title],
  templateUrl: './home-category.html',
  styleUrl: './home-category.css',
})
export class HomeCategory {
  router: Router = inject(Router);
  masterService: Master = inject(Master);

  categories = [
    {
      category: 'phones',
      img: '/images/phone.png',
      id: 'phone',
    },
    {
      category: 'computers',
      img: '/images/computer.png',
      id: 'computer',
    },
    {
      category: 'smart watch',
      img: '/images/smartwatch.png',
      id: 'watch',
    },
    {
      category: 'camera',
      img: '/images/camera.png',
      id: 'camera',
    },
    {
      category: 'head phone',
      img: '/images/headset.png',
      id: 'headphone',
    },
    {
      category: 'gaming',
      img: '/images/gaming.png',
      id: 'gaming',
    },
    {
      category: 'wears',
      img: '/images/gaming.png',
      id: 'wear',
    },
  ];

  onNavigateToCategory(category: string) {
    this.masterService.setData({
      link: `/category/${category}`,
    });
    this.router.navigateByUrl(`/category/${category}`);
  }
}
