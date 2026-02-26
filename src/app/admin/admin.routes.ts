import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { ProductsManagementComponent } from './pages/products-management/products-management';
import { OrdersManagementComponent } from './pages/orders-management/orders-management';
import { CustomersManagementComponent } from './pages/customers-management/customers-management';
import { AdminSettingsComponent } from './pages/admin-settings/admin-settings';
import { AdminReportsComponent } from './pages/admin-reports/admin-reports';
import { AdminNotification } from './pages/admin-notification/admin-notification';
import { Feedback } from './pages/feedback/feedback';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/admin-layout/admin-layout').then((m) => m.AdminLayoutComponent),
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'products',
        component: ProductsManagementComponent,
      },
      {
        path: 'products/add',
        component: ProductsManagementComponent,
      },
      {
        path: 'products/edit/:id',
        component: ProductsManagementComponent,
      },
      {
        path: 'orders',
        component: OrdersManagementComponent,
      },
      {
        path: 'customers',
        component: CustomersManagementComponent,
      },
      {
        path: 'reports',
        component: AdminReportsComponent,
      },
      {
        path: 'settings',
        component: AdminSettingsComponent,
      },
      {
        path: 'notifications',
        component: AdminNotification,
      },
      {
        path: 'feedbacks',
        component: Feedback,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
