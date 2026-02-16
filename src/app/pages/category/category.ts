import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { allProducts, IProduct } from '../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Title } from '../../components/title/title';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-category',
  imports: [Title, ProductCard],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  activeRouted: ActivatedRoute = inject(ActivatedRoute);

  category = toSignal(this.activeRouted.paramMap);
  categoryText = signal<string | null | undefined>('');

  categoryProducts = computed<IProduct[]>(() => {
    const category = this.category()?.get('category');

    return allProducts.filter((p) => p.category === category);
  });

  ngOnInit(): void {
    const category = this.category()?.get('category');
    this.categoryText.set(category);
    console.log(this.categoryProducts());
  }
}
