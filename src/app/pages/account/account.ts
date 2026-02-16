import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Button } from '../../components/button/button';
import { EditProfile } from './edit-profile/edit-profile';
import { MyOrders } from './my-orders/my-orders';
import { CommonModule } from '@angular/common';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-account',
  imports: [EditProfile, MyOrders, CommonModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account implements OnInit {
  authService: Auth = inject(Auth);
  masterService: Master = inject(Master);
  router: Router = inject(Router);

  currentTab = signal<string>('profile');
  userProfile = signal<any>(null);

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.authService.getProfile().then((res: any) => {
      this.userProfile.set(res);
    });
  }

  toggleTab(tab: string) {
    this.currentTab.set(tab);
  }

  onNavigateHome(link: string) {
    this.masterService.setData({
      link: link,
    });
    this.router.navigateByUrl(link);
  }
}
