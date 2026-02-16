import { Component, inject, Input, signal } from '@angular/core';
import { Button } from '../button/button';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-logout-popup',
  imports: [Button],
  templateUrl: './confirm-logout-popup.html',
  styleUrl: './confirm-logout-popup.css',
})
export class ConfirmLogoutPopup {
  authService: Auth = inject(Auth);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  loading = signal<boolean>(false);
  @Input() confirmLogout = signal<boolean>(false);
  @Input() mobileNav = signal<boolean>(false);

  logout() {
    this.loading.set(true);
    this.authService
      .logout()
      .then(() => {
        this.confirmLogout.set(false);
        this.mobileNav.set(false);
        this.router.navigateByUrl('/login');
      })
      .catch((err) => {
        this.toastr.error(err);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
