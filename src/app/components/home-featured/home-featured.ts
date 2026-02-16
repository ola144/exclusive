import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '../title/title';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  cta: string;
  featured?: boolean;
  span?: string;
}

@Component({
  selector: 'app-home-featured',
  imports: [CommonModule, Title],
  templateUrl: './home-featured.html',
  styleUrl: './home-featured.css',
})
export class HomeFeatured {
  products: Product[] = [
    {
      id: 1,
      name: 'PlayStation 5',
      category: 'Featured',
      image: 'images/playstation.png',
      description: 'Experience the ultimate version of the PS5 gaming with out elite.',
      cta: 'Shop Now',
      featured: true,
      span: 'col-span-1 row-span-2',
    },
    {
      id: 2,
      name: "Women's Collections",
      category: 'Featured',
      image: 'images/women-collection.png',
      description: 'Featured women collections that give you another vibe.',
      cta: 'Shop Now',
      span: 'col-span-1',
    },
    {
      id: 3,
      name: 'Speakers',
      category: 'Featured',
      image: '/images/speakers.png',
      description: 'Amazon wireless speakers for you.',
      cta: 'Shop Now',
      span: 'col-span-1',
    },
    {
      id: 4,
      name: 'Perfume',
      category: 'Featured',
      image: 'images/perfume.png',
      description: 'GUCCI INTENSE OUD EDP',
      cta: 'Shop Now',
      span: 'col-span-1',
    },
  ];
}
