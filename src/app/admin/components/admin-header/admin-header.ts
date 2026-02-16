import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  templateUrl: './admin-header.html',
})
export class AdminHeaderComponent implements OnInit {
  authService: Auth = inject(Auth);

  userProfile = signal<any>(null);

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.authService.getProfile().then((res: any) => {
      this.userProfile.set(res);
    });
  }
}
