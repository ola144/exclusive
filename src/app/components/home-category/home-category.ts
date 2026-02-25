import { Component, inject, OnInit, signal } from '@angular/core';
import { Title } from '../title/title';
import { Router } from '@angular/router';
import { Master } from '../../services/master';
import { Category } from '../../admin/services/category';

@Component({
  selector: 'app-home-category',
  imports: [Title],
  templateUrl: './home-category.html',
  styleUrl: './home-category.css',
})
export class HomeCategory implements OnInit {
  router: Router = inject(Router);
  masterService: Master = inject(Master);
  categoryService: Category = inject(Category);

  categories = signal<any[]>([]);

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getCategory().then((res) => {
      this.categories.set(res.documents);
    });
  }

  onNavigateToCategory(category: string) {
    this.masterService.setData({
      link: `/category/${category}`,
    });
    this.router.navigateByUrl(`/category/${category}`);
  }
}
