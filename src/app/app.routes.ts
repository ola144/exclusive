import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Products } from './pages/products/products';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Checkout } from './pages/checkout/checkout';
import { Cart } from './pages/cart/cart';
import { Wishlist } from './pages/wishlist/wishlist';
import { Account } from './pages/account/account';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { ProductDetails } from './pages/product-details/product-details';
import { Layout } from './components/layout/layout';
import { Category } from './pages/category/category';
import { ADMIN_ROUTES } from './admin/admin.routes';
import { CompleteProfile } from './pages/complete-profile/complete-profile';

export const routes: Routes = [
  {
    path: 'admin',
    children: ADMIN_ROUTES,
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
        pathMatch: 'full',
      },
      {
        path: 'signup',
        component: Signup,
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'products',
        component: Products,
      },
      {
        path: 'product/:productId',
        component: ProductDetails,
      },
      {
        path: 'category/:category',
        component: Category,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'contact',
        component: Contact,
      },
      {
        path: 'checkout',
        component: Checkout,
      },
      {
        path: 'cart',
        component: Cart,
      },
      {
        path: 'wishlist',
        component: Wishlist,
      },
      {
        path: 'signup',
        component: Signup,
      },
      {
        path: 'account',
        component: Account,
      },
      {
        path: 'complete-profile',
        component: CompleteProfile,
      },
      {
        path: '**',
        component: NotFoundPage,
      },
    ],
  },
];
