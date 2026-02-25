export const environment = {
  production: false,

  // Appwrite Config
  appwrite: {
    endpoint: 'https://fra.cloud.appwrite.io/v1',
    projectId: '698e467000150abb9d79',
    databaseId: '698e476e00361a888378',
    usersCollectionId: 'users',
    productsCollectionId: 'products',
    ordersCollectionId: 'orders',
    cartsCollectionId: 'cart',
    categoryCollectionId: 'categories',
    wishlistCollectionId: 'wishlist',
    storeDetailsCollectionId: 'storedetails',
    notificationsCollectionId: 'notfications',
    productReviewsCollectionId: 'productreviews',
    contactsReviewsCollectionId: 'contacts',
    bucketId: '698eec5f00053273ec96',
  },

  // Firebase Config
  firebase: {
    apiKey: 'd7ab352e763c1efdd773aee11c4561b367e7cd39',
    authDomain: 'exclusive.firebaseapp.com',
    projectId: 'exclusive-37d26',
    storageBucket: 'exclusive-37d26.appspot.com',
    databaseUrl: 'https://exclusive-37d26-default-rtdb.firebaseio.com/',
    ordersCollectionId: 'orders',
  },
};
