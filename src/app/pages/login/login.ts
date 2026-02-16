import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Button } from '../../components/button/button';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

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

  @ViewChild('passwordRef') passwordRef!: ElementRef<HTMLInputElement>;

  loading = signal<boolean>(false);
  passwordIcons = signal<boolean>(false);

  email: string = '';
  password: string = '';

  profile = signal<any>(null);

  onLogin() {
    debugger;
    this.loading.set(true);

    this.authService
      .login(this.email, this.password)
      .then(() => {
        debugger;

        this.authService.getProfile().then((res: any) => {
          const user = res;

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
        });

        const user = this.profile();
        console.log(user);
      })
      .catch((err) => {
        this.toastr.error(err);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  getProfile() {
    debugger;
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
