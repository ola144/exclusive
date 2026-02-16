import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('698e467000150abb9d79');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = '698e476e00361a888378';
export const PRODUCTS_COLLECTION_ID = 'products';
export const USERS_COLLECTION_ID = 'users';
export const CATEGORY_COLLECTION_ID = 'categories';
export const BUCKET_ID = '698eec5f00053273ec96';
