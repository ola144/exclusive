import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Title } from '../../components/title/title';
import { ProductCard } from '../../components/product-card/product-card';
import { AdminProductService } from '../../admin/services';
import { IProduct } from '../../admin/models';
import { Master } from '../../services/master';

@Component({
  selector: 'app-category',
  imports: [Title, ProductCard],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  productService: AdminProductService = inject(AdminProductService);
  activeRouted: ActivatedRoute = inject(ActivatedRoute);
  masterServ: Master = inject(Master);

  category = toSignal(this.activeRouted.paramMap);
  categoryText = signal<string | null | undefined>('');

  categoryProducts = computed<IProduct[]>(() => {
    const category = this.category()?.get('category');

    return this.productService
      .products()
      .filter((p) => p.productCategory.toLowerCase() === category);
  });

  ngOnInit(): void {
    const category = this.category()?.get('category');
    this.categoryText.set(category);

    this.categoryProducts();

    this.masterServ.search$.subscribe((res) => {
      this.categoryText.set(res.category);
    });
  }
}
