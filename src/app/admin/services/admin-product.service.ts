import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { IProduct, IProductReview, Product } from '../models/admin.models';
import {
  account,
  BUCKET_ID,
  CART_COLLECTION_ID,
  DATABASE_ID,
  databases,
  PRODUCT_REVIEWS_COLLECTION_ID,
  PRODUCTS_COLLECTION_ID,
  storage,
  WISHLIST_COLLECTION_ID,
} from '../../core/appwrite.config';
import { ID, Query } from 'appwrite';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  // Signals
  products = signal<IProduct[]>([]);
  wishlistItems = signal<IProduct[]>([]);
  cartItems = signal<IProduct[]>([]);
  productReviews = signal<IProductReview[]>([]);
  allReviews = signal<IProductReview[]>([]);

  loading = signal<boolean>(false);

  error = signal<string | null>(null);
  searchQuery = signal('');
  selectedCategory = signal('');

  // Computed values
  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();

    return this.products().filter((product) => {
      const matchesSearch = product.productName.toLowerCase().includes(query);
      const matchesCategory = !category || product.productCategory.toLowerCase() === category;
      return matchesSearch && matchesCategory;
    });
  });

  totalProducts = computed(() => this.products().length);

  lowStockProducts = computed(() => this.products().filter((p) => p.productInStock < 10));

  constructor(private toastr: ToastrService) {
    this.initializeData();
    this.getAllReviews();
    this.getReviewsForUser();
  }

  async initializeData() {
    this.loading.set(false);

    try {
      const res: any = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID);

      this.products.set(res.documents);
    } catch (error: any) {
      this.toastr.error(error);
    } finally {
      this.loading.set(false);
    }
  }

  // Get all products
  getAllProducts() {
    return this.filteredProducts();
  }

  // Get single product
  getProductById(id: string): IProduct | undefined {
    return this.products().find((p) => p.$id === id);
  }

  // Add product
  async addProduct(data: IProduct, files: File[], productSubtotal: number) {
    const productImg: string[] = [];

    if (files && files.length > 0) {
      for (let file of files) {
        const uploaded = await storage.createFile(BUCKET_ID, ID.unique(), file);
        productImg.push(uploaded.$id);
      }
    }

    const payload = {
      ...data,
      productImg,
      productSubtotal,
    };

    await databases.createDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, ID.unique(), payload);

    this.initializeData();
  }

  getImageUrl(fileId: string): string {
    return storage.getFileView(BUCKET_ID, fileId);
  }

  // Update product
  async updateProduct(
    id: string,
    data: IProduct,
    existingImgIds: string[] | any,
    files: File[],
    productSubTotal: number,
  ) {
    // Delete old images that are not in existingImgIds
    for (let imgId of existingImgIds) {
      await storage.deleteFile(BUCKET_ID, imgId);
    }

    // Upload new images
    const uploads = files.map((file) => storage.createFile(BUCKET_ID, ID.unique(), file));

    const results = await Promise.all(uploads);
    const newImgIds = results.map((res) => res.$id);

    const payload = {
      ...data,
      productImg: [...newImgIds],
      productSubTotal,
    };

    await databases.updateDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id, payload);

    await this.initializeData();
  }

  // Delete product
  async deleteProduct(id: string | undefined, imageIds: string[] | any) {
    if (imageIds?.length) {
      for (let imgId of imageIds) {
        await storage.deleteFile(BUCKET_ID, imgId);
      }
    }
    await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id!);

    await this.initializeData();
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

  // WISHLIST MANAGEMENT
  async addToWishList(product: IProduct) {
    // Get Current User
    const user = await account.get();

    // Implementation for adding product to wishlist
    const payload = {
      ...product,
      productId: product.$id,
      userId: user.$id,
    };

    await databases
      .createDocument(DATABASE_ID, WISHLIST_COLLECTION_ID, product.$id, payload)
      .then(async () => {
        this.toastr.success('Added to wishlist');
        await this.initializeWishlist();
      })
      .catch((error) => {
        this.toastr.error(error.message || 'Failed to add to wishlist');
      });
  }

  async initializeWishlist() {
    this.loading.set(false);

    try {
      // Get Current User
      const user = await account.get();

      const res: any = await databases.listDocuments(DATABASE_ID, WISHLIST_COLLECTION_ID, [
        Query.equal('userId', user.$id),
      ]);

      this.wishlistItems.set(res.documents);
    } catch (error) {
      // this.toastr.error('Failed to fetch');
    } finally {
      this.loading.set(false);
    }
  }

  async removeFromWishlist(productId: string) {
    await databases
      .deleteDocument(DATABASE_ID, WISHLIST_COLLECTION_ID, productId)
      .then(async () => {
        this.toastr.success('Removed from wishlist');
        await this.initializeWishlist();
      })
      .catch((error) => {
        this.toastr.error(error.message || 'Failed to remove from wishlist');
      });
  }

  // CART MANAGEMENT (Optional, can be implemented similarly to wishlist)
  async addToCart(product: IProduct) {
    // Get Current User
    const user = await account.get();

    const payload = {
      ...product,
      userId: user.$id,
      productId: product.$id,
      productQty: 1, // Default quantity, can be updated later
    };

    await databases
      .createDocument(DATABASE_ID, CART_COLLECTION_ID, ID.unique(), payload)
      .then(async () => {
        this.toastr.success('Added to cart');
        await this.initializeCart();
      })
      .catch((error) => {
        this.toastr.error(error.message || 'Failed to add to cart');
      });
  }

  async initializeCart() {
    this.loading.set(true);

    try {
      // Get Current User
      const user = await account.get();

      const res: any = await databases.listDocuments(DATABASE_ID, CART_COLLECTION_ID, [
        Query.equal('userId', user.$id),
      ]);

      this.cartItems.set(res.documents);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.set(false);
    }
  }

  async removeFromCart(productId: string) {
    await databases
      .deleteDocument(DATABASE_ID, CART_COLLECTION_ID, productId)
      .then(async () => {
        this.toastr.success('Removed from cart');
        await this.initializeCart();
      })
      .catch((error) => {
        this.toastr.error(error.message || 'Failed to remove from cart');
      });
  }

  async updateCartQuantity(productId: string, quantity: number) {
    const cartItem = this.cartItems().find((item) => item.$id === productId);
    if (!cartItem) return;

    const payload = {
      ...cartItem,
      productQty: quantity,
    };

    await databases.updateDocument(DATABASE_ID, CART_COLLECTION_ID, productId, payload);
    await this.initializeCart();
  }

  // PRODUCT REVIEW MANAGEMENT
  async addReview(productId: string, productName: string, productImg: string, reviewData: any) {
    // user
    const user = await account.get();

    // Implementation for adding a review to a product
    const payload = {
      ...reviewData,
      productId,
      productName,
      productImg,
      userId: user.$id,
      userName: user.name,
    };

    await databases.createDocument(
      DATABASE_ID,
      PRODUCT_REVIEWS_COLLECTION_ID,
      ID.unique(),
      payload,
    );
  }

  async getAllReviews() {
    this.loading.set(false);

    const res = await databases
      .listDocuments(DATABASE_ID, PRODUCT_REVIEWS_COLLECTION_ID)
      .then((res: any) => {
        this.allReviews.set(res.documents);
        return res;
      })
      .catch((error) => {
        this.toastr.error(error.message || 'Failed to fetch reviews');
        return [];
      })
      .finally(() => {
        this.loading.set(false);
      });

    return res.documents;
  }

  async getReviewsForUser() {
    this.loading.set(true);

    const user = await account.get();

    const res = await databases
      .listDocuments(DATABASE_ID, PRODUCT_REVIEWS_COLLECTION_ID, [Query.equal('userId', user.$id)])
      .then((res: any) => res.documents)
      .catch((error) => {
        this.toastr.error(error.message || 'Failed to fetch reviews');
        return [];
      })
      .finally(() => {
        this.loading.set(false);
      });

    this.productReviews.set(res);
    return res;
  }

  getReviewsForProduct(productId: string) {
    return this.allReviews().filter((review) => review.productId === productId);
  }

  updateProductReview(productId: string) {
    const product = this.getProductById(productId);
    if (!product) return;

    const payload = {
      ...product,
      productReviews: product.productReviews + 1,
    };

    databases.updateDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, productId, payload);
  }

  calculateAverageRating(productId: string): number {
    const reviews = this.allReviews().filter((review) => review.productId === productId);
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.ceil(totalRating / reviews.length);
  }
}
