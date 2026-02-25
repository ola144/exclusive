import { Injectable, signal } from '@angular/core';
import {
  account,
  DATABASE_ID,
  databases,
  STORE_DETAILS_COLLECTION_ID,
  USERS_COLLECTION_ID,
} from '../../core/appwrite.config';

@Injectable({
  providedIn: 'root',
})
export class AdminSettingService {
  storeDetails = signal<StoreDetails[]>([]);
  adminProfile = signal<any>(null);

  constructor() {
    this.getStoreDetails();
    this.getProfile();
  }

  async getStoreDetails() {
    const response: any = await databases.listDocuments(DATABASE_ID, STORE_DETAILS_COLLECTION_ID);
    this.storeDetails.set(response.documents);

    return response.documents;
  }

  async updateStoreDetails(details: any) {
    const documentId = this.storeDetails()[0].$id; // Assuming there's only one document for store details
    await databases.updateDocument(DATABASE_ID, STORE_DETAILS_COLLECTION_ID, documentId, details);
    this.getStoreDetails(); // Refresh the store details after update
  }

  async updatePassword(oldPassword: string, newPassword: string) {
    const user = await account.get();

    // Implement password update logic here
    await account.updatePassword(newPassword, oldPassword);
    await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id, {
      password: newPassword,
    });

    this.getProfile(); // Refresh profile after password update
  }

  async getProfile() {
    const user = await account.get();

    // fetch role profile
    const res = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id);
    this.adminProfile.set(res);
    return res;
  }
}

interface StoreDetails {
  $id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  currency: string;
}
