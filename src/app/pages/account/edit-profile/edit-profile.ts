import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Button } from '../../../components/button/button';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  imports: [Button, FormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile implements OnInit {
  authService: Auth = inject(Auth);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);
  imageCompress: NgxImageCompressService = inject(NgxImageCompressService);

  password: string = '';
  name: string = '';
  address: string = '';
  phoneNumber: string = '';
  oldPassword: string = '';

  currentPasswordIcons = signal<boolean>(false);
  newPasswordIcons = signal<boolean>(false);
  confirmNewPasswordIcons = signal<boolean>(false);

  imagePreview = signal<string>('');
  loading = signal<boolean>(false);

  @ViewChild('currentPassword') currentPassword!: ElementRef<HTMLInputElement>;
  @ViewChild('newPassword') newPassword!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmNewPassword') confirmNewPassword!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.name = this.authService.userProfile()?.name;
    this.address = this.authService.userProfile()?.address;
    this.phoneNumber = this.authService.userProfile()?.phoneNumber;
    this.oldPassword = this.authService.userProfile()?.password;
    this.imagePreview.set(this.authService.userProfile()?.avatar);
  }

  compress() {
    const MAX_MEGABYTE = 2;

    this.imageCompress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE)
      .then((result: string) => {
        this.imagePreview.set(result);
        // console.log(this.imagePreview());
      })
      .catch((error) => {
        this.toastr.error(error);
      });
  }

  updateProfile() {
    this.loading.set(true);
    this.authService
      .updateProfile(
        this.authService.userProfile()?.$id,
        this.password,
        this.name,
        this.phoneNumber,
        this.address,
        this.imagePreview(),
        this.oldPassword,
      )
      .then(() => {
        this.toastr.success('Profile Updated Successfully!');
      })
      .catch((error) => {
        this.toastr.error(error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  toggleShowCurrentPassword() {
    if (this.currentPassword.nativeElement.type === 'password') {
      this.currentPassword.nativeElement.type = 'text';
      this.currentPasswordIcons.set(true);
    } else {
      this.currentPassword.nativeElement.type = 'password';
      this.currentPasswordIcons.set(false);
    }
  }

  toggleShowNewPassword() {
    if (this.newPassword.nativeElement.type === 'password') {
      this.newPassword.nativeElement.type = 'text';
      this.newPasswordIcons.set(true);
    } else {
      this.newPassword.nativeElement.type = 'password';
      this.newPasswordIcons.set(false);
    }
  }

  toggleShowConfirmNewPassword() {
    if (this.confirmNewPassword.nativeElement.type === 'password') {
      this.confirmNewPassword.nativeElement.type = 'text';
      this.confirmNewPasswordIcons.set(true);
    } else {
      this.confirmNewPassword.nativeElement.type = 'password';
      this.confirmNewPasswordIcons.set(false);
    }
  }
}
