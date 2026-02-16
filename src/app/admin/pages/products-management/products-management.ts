import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminProductService } from '../../services/admin-product.service';
import { Product } from '../../models/admin.models';
import { Button } from '../../../components/button/button';
import { Category } from '../../services/category';
import { ToastrService } from 'ngx-toastr';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: 'products-management.html',
})
export class ProductsManagementComponent implements OnInit {
  categoryService: Category = inject(Category);
  toastr: ToastrService = inject(ToastrService);
  imageCompress: NgxImageCompressService = inject(NgxImageCompressService);

  public showAddForm = false;
  public editingProduct: Product | null = null;
  public searchTerm = '';
  public selectedCategory = '';

  showAddCategoryForm = signal<boolean>(false);
  loading = signal<boolean>(false);

  categories = signal<any[]>([]);
  imagePreview = signal<string>('');

  categoryName: string = '';

  public formData: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    discount: 0,
    category: '',
    stock: 0,
    image: '',
    isActive: true,
  };

  constructor(public productService: AdminProductService) {}

  ngOnInit() {
    this.productService.getAllProducts();
    this.getAllCategory();
  }

  compressImg() {
    const MAX_BYTE = 2;

    this.imageCompress
      .uploadAndGetImageWithMaxSize(MAX_BYTE)
      .then((res: string) => {
        this.imagePreview.set(res);
      })
      .catch((error) => {
        this.toastr.error(error);
      });
  }

  addCategory() {
    this.loading.set(true);

    this.categoryService
      .addCategory(this.categoryName, this.imagePreview())
      .then(() => {
        this.toastr.success('Category Added Successfully');
        this.getAllCategory();
        this.showAddCategoryForm.set(false);
        this.categoryName = '';
        this.imagePreview.set('');
      })
      .catch((error) => {
        this.toastr.error(error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  getAllCategory() {
    this.categoryService
      .getCategory()
      .then((res: any) => {
        this.categories.set(res.documents);
        console.log(this.categories());
      })
      .catch((error) => this.toastr.error(error));
  }

  saveProduct() {
    if (!this.formData.name || !this.formData.price || !this.formData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, this.formData as Product);
    } else {
      this.productService.addProduct(this.formData as Omit<Product, 'id'>);
    }

    this.closeForm();
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.formData = { ...product };
    this.showAddForm = true;
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
    }
  }

  closeForm() {
    this.showAddForm = false;
    this.editingProduct = null;
    this.formData = {
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      discount: 0,
      category: '',
      stock: 0,
      image: '',
      isActive: true,
    };
  }

  getStockColor(stock: number): string {
    if (stock < 5) return 'text-red-600 font-bold';
    if (stock < 20) return 'text-orange-600 font-bold';
    return 'text-green-600 font-bold';
  }

  exportToCSV() {
    const products = this.productService.getAllProducts();
    const csv = [
      ['ID', 'Name', 'Category', 'Price', 'Stock', 'Discount'],
      ...products.map((p) => [p.id, p.name, p.category, p.price, p.stock, p.discount || '']),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
  }
}
