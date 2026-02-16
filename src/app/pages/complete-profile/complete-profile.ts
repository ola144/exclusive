import { Component, inject, OnInit, signal } from '@angular/core';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Button } from '../../components/button/button';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complete-profile',
  imports: [Button, FormsModule],
  templateUrl: './complete-profile.html',
  providers: [NgxImageCompressService],
  styleUrl: './complete-profile.css',
})
export class CompleteProfile implements OnInit {
  masterService: Master = inject(Master);
  authService: Auth = inject(Auth);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);
  imageComress: NgxImageCompressService = inject(NgxImageCompressService);

  userProfile = signal<any>(null);
  imagePreview = signal<string>('');

  address: string = '';

  loading = signal<boolean>(false);
  localData = signal<any>(null);

  ngOnInit(): void {
    this.getProfile();

    const localData = localStorage.getItem('exclusiveUser');
    if (localData !== null) this.localData.set(JSON.parse(localData));
  }

  compress() {
    const MAX_MEGABYTE = 2;

    this.imageComress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE)
      .then((result: string) => {
        this.imagePreview.set(result);
        // console.log(this.imagePreview());
      })
      .catch((error) => {
        this.toastr.error(error);
      });
  }

  saveChanges() {
    this.loading.set(true);
    this.authService
      .completeProfile(this.userProfile().$id, this.imagePreview(), this.address)
      .then(() => {
        this.toastr.success('Profile Updated Successfully!');
        if (this.authService.isAdmin()) {
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.router.navigateByUrl('/');
        }
      })
      .catch((error) => {
        this.toastr.error(error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  getProfile() {
    this.authService.getProfile().then((res: any) => {
      this.userProfile.set(res);
      console.log(res);
    });
  }

  onNavigateHome(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
