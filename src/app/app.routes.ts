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
import { Notification } from './pages/notification/notification';
import { adminExclusieGuard, userExclusiveGuard } from './guards/exclusive-guard';
import { Faq } from './pages/faq/faq';
import { TermsOfUse } from './pages/terms-of-use/terms-of-use';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    canActivate: [adminExclusieGuard],
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
        canActivate: [userExclusiveGuard],
      },
      {
        path: 'cart',
        component: Cart,
        canActivate: [userExclusiveGuard],
      },
      {
        path: 'wishlist',
        component: Wishlist,
        canActivate: [userExclusiveGuard],
      },
      {
        path: 'signup',
        component: Signup,
      },
      {
        path: 'account',
        component: Account,
        canActivate: [userExclusiveGuard],
      },
      {
        path: 'complete-profile',
        component: CompleteProfile,
        canActivate: [userExclusiveGuard],
      },
      {
        path: 'notifications',
        component: Notification,
        canActivate: [userExclusiveGuard],
      },
      {
        path: 'faq',
        component: Faq,
      },
      {
        path: 'terms-of-use',
        component: TermsOfUse,
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicy,
      },
      {
        path: '**',
        component: NotFoundPage,
      },
    ],
  },
];
