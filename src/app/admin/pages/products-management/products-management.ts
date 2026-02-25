import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminProductService } from '../../services/admin-product.service';
import { IProduct, Product } from '../../models/admin.models';
import { Button } from '../../../components/button/button';
import { Category } from '../../services/category';
import { ToastrService } from 'ngx-toastr';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Loader } from '../../../components/loader/loader';

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, Loader],
  templateUrl: 'products-management.html',
})
export class ProductsManagementComponent implements OnInit {
  categoryService: Category = inject(Category);
  toastr: ToastrService = inject(ToastrService);
  imageCompress: NgxImageCompressService = inject(NgxImageCompressService);

  public showAddForm = false;
  public editingProduct: IProduct | null = null;
  public deletingProduct: IProduct | null = null;
  public searchTerm = '';
  public selectedCategory = '';

  showAddCategoryForm = signal<boolean>(false);
  confirmDeleteProduct = signal<boolean>(false);
  loading = signal<boolean>(false);

  categories = signal<any[]>([]);
  imagePreview = signal<string>('');

  categoryName: string = '';

  public formData: IProduct = {
    productName: '',
    productDesc: '',
    productPrice: 0,
    productDiscount: 0,
    productStatus: true,
    productRating: 0,
    productReviews: 0,
    productCategory: '',
    productQty: 1,
    productInStock: 0,
    isFeatured: false,
  };

  selectedImgFiles: File[] = [];
  imagePreviews: File[] = [];

  constructor(public productService: AdminProductService) {}

  ngOnInit() {
    this.productService.getAllProducts();
    this.getAllCategory();
  }

  onFiles(event: any) {
    const files: any = Array.from(event.target.files);

    this.selectedImgFiles = files;

    this.imagePreviews = files.map((file: any) => URL.createObjectURL(file));
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
    this.loading.set(true);
    this.productService
      .addProduct(
        this.formData,
        this.selectedImgFiles,
        this.formData.productPrice * this.formData.productQty,
      )
      .then(() => {
        this.toastr.success('Product Added Successfully');
        this.productService.getAllProducts();
        this.closeForm();
      })
      .catch((error) => {
        this.toastr.error(error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  updateProduct() {
    if (!this.editingProduct?.$id) {
      this.toastr.error('Product ID is missing');
      return;
    }
    this.loading.set(true);
    this.productService
      .updateProduct(
        this.editingProduct.$id,
        this.formData,
        this.editingProduct?.productImg,
        this.selectedImgFiles,
        this.formData.productPrice * this.formData.productQty,
      )
      .then(() => {
        this.toastr.success('Product Updated Successfully');
        this.productService.getAllProducts();
        this.closeForm();
      })
      .catch((error) => {
        this.toastr.error(error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  editProduct(product: IProduct) {
    this.editingProduct = product;
    this.formData = { ...product };
    this.showAddForm = true;
  }

  openDeleteConfirm(product: IProduct) {
    this.deletingProduct = product;
    this.confirmDeleteProduct.set(true);
  }

  deleteProduct() {
    if (!this.deletingProduct?.$id) {
      this.toastr.error('Product ID is missing');
      return;
    }

    this.loading.set(true);
    this.productService
      .deleteProduct(this.deletingProduct.$id, this.deletingProduct?.productImg)
      .then(() => {
        this.toastr.success('Product Deleted Successfully');
        this.productService.getAllProducts();
        this.confirmDeleteProduct.set(false);
      })
      .catch((error) => {
        this.toastr.error(error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  closeForm() {
    this.showAddForm = false;
    this.editingProduct = null;
    this.formData = {
      productName: '',
      productDesc: '',
      productPrice: 0,
      productDiscount: 0,
      productCategory: '',
      productInStock: 0,
      productStatus: true,
      productQty: 0,
      productRating: 0,
      productReviews: 0,
      productSubtotal: 0,
      isFeatured: false,
    };
    this.selectedImgFiles = [];
    this.imagePreviews = [];
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
      ...products.map((p) => [
        p.$id,
        p.productName,
        p.productCategory,
        p.productPrice,
        p.productInStock,
        p.productDiscount || '',
      ]),
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
