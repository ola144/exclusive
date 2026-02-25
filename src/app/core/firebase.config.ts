import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { environment } from '../../environments/environment';

// Firebase configuration - Update with your Firebase project credentials
const firebaseConfig = {
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  projectId: environment.firebase.projectId,
  storageBucket: environment.firebase.storageBucket,
  databaseURL: environment.firebase.databaseUrl,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const rtdb = getDatabase(app); // Realtime Database instead of Firestore
export const storage = getStorage(app);

// Realtime Database path names
export const DB_PATHS = {
  ORDERS: environment.firebase.ordersCollectionId,
} as const;

// Helper function to get image URL from Firebase Storage
export const getImageUrlFromStorage = (filePath: string) => {
  // Format: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{encoded_path}?alt=media
  return `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${encodeURIComponent(filePath)}?alt=media`;
};

export default app;
