import { Client, Account, Databases, Storage, Functions } from 'appwrite';
import { environment } from '../../environments/environment';

const client = new Client()
  .setEndpoint(environment.appwrite.endpoint)
  .setProject(environment.appwrite.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = environment.appwrite.databaseId;
export const BUCKET_ID = environment.appwrite.bucketId;
export const PRODUCTS_COLLECTION_ID = environment.appwrite.productsCollectionId;
export const USERS_COLLECTION_ID = environment.appwrite.usersCollectionId;
export const CATEGORY_COLLECTION_ID = environment.appwrite.categoryCollectionId;
export const WISHLIST_COLLECTION_ID = environment.appwrite.wishlistCollectionId;
export const CART_COLLECTION_ID = environment.appwrite.cartsCollectionId;
export const ORDERS_COLLECTION_ID = environment.appwrite.cartsCollectionId;
export const STORE_DETAILS_COLLECTION_ID = environment.appwrite.storeDetailsCollectionId;
export const PRODUCT_REVIEWS_COLLECTION_ID = environment.appwrite.productReviewsCollectionId;
export const NOTIFICATIONS_COLLECTION_ID = environment.appwrite.notificationsCollectionId;
export const CONTACTS_COLLECTION_ID = environment.appwrite.contactsReviewsCollectionId;
