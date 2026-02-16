import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { Product } from '../models/admin.models';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  // Signals
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searchQuery = signal('');
  selectedCategory = signal('');

  // Computed values
  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();

    return this.products().filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      const matchesCategory = !category || product.category === category;
      return matchesSearch && matchesCategory;
    });
  });

  totalProducts = computed(() => this.products().length);
  lowStockProducts = computed(() => this.products().filter((p) => p.stock < 10));

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Gaming Headset',
        description: 'High-quality gaming headset with surround sound',
        price: 79.99,
        originalPrice: 99.99,
        discount: 20,
        category: 'Electronics',
        stock: 45,
        image: 'https://via.placeholder.com/300x300?text=Gaming+Headset',
        rating: 4.5,
        reviews: 128,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
      {
        id: '2',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision control',
        price: 29.99,
        originalPrice: 39.99,
        discount: 25,
        category: 'Electronics',
        stock: 120,
        image: 'https://via.placeholder.com/300x300?text=Wireless+Mouse',
        rating: 4.3,
        reviews: 89,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
      {
        id: '3',
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with hot-swap switches',
        price: 129.99,
        originalPrice: 159.99,
        discount: 19,
        category: 'Electronics',
        stock: 8,
        image: 'https://via.placeholder.com/300x300?text=Mechanical+Keyboard',
        rating: 4.7,
        reviews: 156,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
    ];
    this.products.set(mockProducts);
  }

  loadProducts() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 500);
  }

  // Get all products
  getAllProducts() {
    return this.filteredProducts();
  }

  // Get single product
  getProductById(id: string): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

  // Add product
  addProduct(product: Omit<Product, 'id'>) {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    this.products.update((products) => [...products, newProduct]);
    return newProduct;
  }

  // Update product
  updateProduct(id: string, updates: Partial<Product>) {
    this.products.update((products) =>
      products.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p)),
    );
  }

  // Delete product
  deleteProduct(id: string) {
    this.products.update((products) => products.filter((p) => p.id !== id));
  }

  // Set search query
  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  // Set category filter
  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  // Get low stock products
  getLowStockProducts() {
    return this.lowStockProducts();
  }
}
