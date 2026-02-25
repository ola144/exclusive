import { Injectable, signal } from '@angular/core';
import {
  account,
  CATEGORY_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from '../../core/appwrite.config';
import { ID } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class Category {
  categories = signal<any[]>([]);

  async addCategory(categoryName: string, categoryImg: string) {
    await databases.createDocument(DATABASE_ID, CATEGORY_COLLECTION_ID, ID.unique(), {
      categoryName: categoryName,
      categoryImg: categoryImg,
    });
  }

  async getCategory() {
    const res: any = await databases.listDocuments(DATABASE_ID, CATEGORY_COLLECTION_ID);

    this.categories.set(res.documents);
    return res.documents;
  }
}
