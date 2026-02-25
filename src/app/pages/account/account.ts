import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Button } from '../../components/button/button';
import { EditProfile } from './edit-profile/edit-profile';
import { MyOrders } from './my-orders/my-orders';
import { CommonModule } from '@angular/common';
import { Master } from '../../services/master';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { MyReviews } from './my-reviews/my-reviews';

@Component({
  selector: 'app-account',
  imports: [EditProfile, MyOrders, CommonModule, MyReviews],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account implements OnInit {
  authService: Auth = inject(Auth);
  masterService: Master = inject(Master);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  currentTab = signal<string>('profile');

  ngOnInit(): void {
    this.authService.getProfile();

    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.currentTab.set(fragment);
      }
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
