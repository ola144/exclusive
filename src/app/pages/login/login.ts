import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Button } from '../../components/button/button';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AdminProductService } from '../../admin/services';
import { NotificationService } from '../../admin/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [Button, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService: Auth = inject(Auth);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);
  productService: AdminProductService = inject(AdminProductService);
  notificationService: NotificationService = inject(NotificationService);

  @ViewChild('passwordRef') passwordRef!: ElementRef<HTMLInputElement>;

  loading = signal<boolean>(false);
  passwordIcons = signal<boolean>(false);

  email: string = '';
  password: string = '';

  profile = signal<any>(null);

  onLogin() {
    this.loading.set(true);

    this.authService
      .login(this.email, this.password)
      .then(() => {
        const user = this.authService.userProfile();

        if (!user.address || !user.avatar) {
          this.router.navigateByUrl('/complete-profile');
          this.toastr.success('Login successfully!');
        } else {
          if (this.authService.isAdmin()) {
            this.router.navigateByUrl('/admin/dashboard');
            this.toastr.success('Login successfully!');
          } else {
            this.router.navigateByUrl('/');
            this.toastr.success('Login successfully!');
          }
        }
        this.productService.initializeCart();
        this.productService.initializeWishlist();
        this.authService.getProfile();
        this.notificationService.getAllNotifications();
        this.notificationService.getUserNotification();
      })
      .catch((err) => {
        this.toastr.error(err);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  getProfile() {
    this.authService.getProfile().then((res) => {
      this.profile.set(res);
    });
  }

  togglePassword() {
    if (this.passwordRef.nativeElement.type === 'password') {
      this.passwordRef.nativeElement.type = 'text';
      this.passwordIcons.set(true);
    } else {
      this.passwordRef.nativeElement.type = 'password';
      this.passwordIcons.set(false);
    }
  }
}
