import { Component, inject, OnInit, signal } from '@angular/core';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { Button } from '../../components/button/button';
import { AdminSettingService } from '../../admin/services/admin-setting.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  masterService: Master = inject(Master);
  settingService: AdminSettingService = inject(AdminSettingService);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  contactForm!: FormGroup;

  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.settingService.getStoreDetails();
    this.initilizeContactForm();
  }

  initilizeContactForm() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  onNavigateHome(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }

  sendMessage() {
    this.loading.set(true);
    const formValue = this.contactForm.value;

    this.masterService
      .sendMessage(formValue)
      .then(() => {
        this.toastr.success('Contact sent successfully!');
        this.resetForm();
      })
      .catch((error) => {
        this.toastr.error(error.message);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  resetForm() {
    this.contactForm.setValue({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  }
}
