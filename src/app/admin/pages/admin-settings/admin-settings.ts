import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../components/button/button';
import { AdminSettingService } from '../../services/admin-setting.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './admin-settings.html',
  styleUrl: './admin-settings.css',
})
export class AdminSettingsComponent implements OnInit {
  settingService: AdminSettingService = inject(AdminSettingService);
  toastr: ToastrService = inject(ToastrService);

  @ViewChild('currentPassword') currentPassword!: ElementRef<HTMLInputElement>;
  @ViewChild('newPassword') newPassword!: ElementRef<HTMLInputElement>;

  currentPasswordIcons = signal<boolean>(false);
  newPasswordIcons = signal<boolean>(false);

  loading = signal<boolean>(false);
  showUpdatePasswordForm = signal<boolean>(false);

  oldPasswordValue = signal<string>('');
  newPasswordValue = signal<string>('');

  name = signal<string>('');
  email = signal<string>('');
  phone = signal<string>('');
  address = signal<string>('');
  currency = signal<string>('');

  ngOnInit() {
    this.settingService.getStoreDetails();
    this.settingService.getProfile();

    this.oldPasswordValue.set(this.settingService.adminProfile()?.password);
  }

  updateSettings() {
    this.loading.set(true);

    const details = {
      name: this.settingService.storeDetails()[0]?.name || 'Exclusive Store',
      email: this.settingService.storeDetails()[0]?.email || 'support@exclusive.com',
      phone: this.settingService.storeDetails()[0]?.phone || '+1 800 000 0000',
      currency: this.settingService.storeDetails()[0]?.currency || 'USD ($)',
      address:
        this.settingService.storeDetails()[0]?.address ||
        '123 Main Street, New York, NY 10001, USA',
    };
    this.settingService
      .updateStoreDetails(details)
      .then(() => {
        this.toastr.success('Store details updated successfully!');
      })
      .catch((error) => {
        this.toastr.error('Failed to update store details: ' + error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  updatePassword() {
    if (!this.oldPasswordValue || !this.newPasswordValue) {
      this.toastr.error('Please fill in both current and new password fields.');
      return;
    }
    this.settingService
      .updatePassword(this.oldPasswordValue(), this.newPasswordValue())
      .then(() => {
        this.toastr.success('Password updated successfully!');
        this.showUpdatePasswordForm.set(false);
        this.oldPasswordValue.set('');
        this.newPasswordValue.set('');
      })
      .catch((error) => {
        this.toastr.error('Failed to update password: ' + error);
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
}
