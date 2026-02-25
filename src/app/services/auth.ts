import { inject, Injectable, signal } from '@angular/core';
import { account, DATABASE_ID, databases, USERS_COLLECTION_ID } from '../core/appwrite.config';
import { ID } from 'appwrite';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  user = signal<any>(null);
  userProfile = signal<any>(null);

  loading = signal(false);

  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);

  async register(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    address: string,
    avatar: string,
    role: 'user' | 'admin' = 'user',
  ) {
    this.loading.set(true);
    // Create Apprite account
    const newAccount = await account.create(ID.unique(), email, password, name);

    // Create profile document with role
    await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      newAccount.$id, // use same id as account
      {
        name,
        email,
        password,
        phoneNumber,
        avatar,
        address,
        role,
      },
    );
  }

  async login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);

    const user = await account.get();
    this.user.set(user);

    // fetch role profile
    const profile = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id);

    localStorage.setItem('exclusiveUser', JSON.stringify(profile));

    this.userProfile.set(profile);
    this.isLogin();
    await this.getProfile();
  }

  async getProfile() {
    const user = await account.get();

    // fetch role profile
    const res = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id);
    this.userProfile.set(res);
  }

  async logout() {
    await account.deleteSession('current');
    this.user.set(null);
    this.userProfile.set(null);
    localStorage.removeItem('exclusiveUser');
    this.isLogin();
  }

  // Complete Profile
  async completeProfile(documentId: string, avatar: string, address: string) {
    return await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, documentId, {
      avatar: avatar,
      address: address,
    });
  }

  async updateProfile(
    documentId: string,
    password: string,
    name: string,
    phoneNumber: string,
    address: string,
    avatar: string,
    oldPassword: string,
  ) {
    return (
      await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, documentId, {
        password: password,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        avatar: avatar,
      }),
      await account.updatePassword(password, oldPassword)
    );
  }

  // Role Helpers
  isAdmin() {
    const localData = localStorage.getItem('exclusiveUser');
    if (localData != null) return JSON.parse(localData)?.role === 'admin';
    return false;
  }

  isUser() {
    const localData = localStorage.getItem('exclusiveUser');
    if (localData != null) return JSON.parse(localData)?.role === 'user';
    return false;
  }

  isLogin() {
    return !!localStorage.getItem('exclusiveUser');
  }
}
