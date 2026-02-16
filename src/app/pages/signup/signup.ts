import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Button } from '../../components/button/button';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { email, form, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [Button, RouterLink, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  authService: Auth = inject(Auth);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  @ViewChild('passwordRef') passwordRef!: ElementRef<HTMLInputElement>;

  loading = signal<boolean>(false);
  passwordIcons = signal<boolean>(false);

  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  avatar: string = '';
  address: string = '';
  role: 'user' | 'admin' = 'user';

  // signupForm = form(this.signupModel, (schema) => {
  //   required(schema.name, {message: 'Name is required!'});
  //   required(schema.email, {message: 'Email is required!'});
  //   email(schema.email, {message: 'Please provide a valid email!'});
  //   required(schema.password, {message: 'Password is required!'});
  // })

  onSignup() {
    this.loading.set(true);

    this.authService
      .register(
        this.email,
        this.password,
        this.name,
        this.phoneNumber,
        this.address,
        this.avatar,
        this.role,
      )
      .then(() => {
        this.toastr.success('Registered Successfully!');
        this.router.navigateByUrl('/login');
      })
      .catch((err) => {
        this.toastr.error(err);
      })
      .finally(() => {
        this.loading.set(false);
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
