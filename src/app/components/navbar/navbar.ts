import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Master } from '../../services/master';
import { Subscription } from 'rxjs';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { ConfirmLogoutPopup } from '../confirm-logout-popup/confirm-logout-popup';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, NgClass, ConfirmLogoutPopup],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  @ViewChild('navbar') navbar: ElementRef | undefined;
  @ViewChild('mobileNavbar') mobileNavbar: ElementRef | undefined;

  router: Router = inject(Router);
  masterService: Master = inject(Master);
  authService: Auth = inject(Auth);
  toastr: ToastrService = inject(ToastrService);

  showMobileNav = signal<boolean>(false);
  showAccountPopUp = signal<boolean>(false);
  loading = signal<boolean>(false);

  sub!: Subscription;

  currentRoute = signal<string>('');
  confirmLogout = signal<boolean>(false);

  ngOnInit(): void {
    this.currentRoute.set(this.router.url);

    console.log(this.currentRoute());

    this.sub = this.masterService.data$.subscribe((value) => {
      this.currentRoute.set(value?.link);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 0) {
      this.navbar?.nativeElement.classList.add('scroll-nav');
    } else {
      this.navbar?.nativeElement.classList.remove('scroll-nav');
    }

    if (window.scrollY > 0) {
      this.mobileNavbar?.nativeElement.classList.add('scroll-nav');
    } else {
      this.mobileNavbar?.nativeElement.classList.remove('scroll-nav');
    }
  }

  toggleMobileNav() {
    this.showMobileNav.set(!this.showMobileNav());
  }

  toggleAccountPopUp() {
    this.showAccountPopUp.set(!this.showAccountPopUp());
  }

  onNavigate(link: string) {
    this.currentRoute.set(link);
    this.router.navigateByUrl(link);
  }

  onNavigateToAccount(link: string) {
    this.router.navigateByUrl(link);
    this.currentRoute.set('/account');
  }

  onNavigateToAccountOnMobile(link: string) {
    this.router.navigateByUrl(link);
    this.showMobileNav.set(false);
  }

  logout() {
    this.loading.set(true);
    this.authService
      .logout()
      .then(() => {
        this.router.navigateByUrl('/login');
        this.showAccountPopUp.set(false);
        this.showMobileNav.set(false);
      })
      .catch((err) => {
        this.toastr.error(err);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
