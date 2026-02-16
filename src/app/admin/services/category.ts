import { Injectable } from '@angular/core';
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
  async addCategory(categoryName: string, categoryImg: string) {
    await databases.createDocument(DATABASE_ID, CATEGORY_COLLECTION_ID, ID.unique(), {
      categoryName: categoryName,
      categoryImg: categoryImg,
    });
  }

  async getCategory() {
    return await databases.listDocuments(DATABASE_ID, CATEGORY_COLLECTION_ID);
  }
}
