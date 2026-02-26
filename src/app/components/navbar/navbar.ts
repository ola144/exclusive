import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  computed,
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
import { AdminProductService } from '../../admin/services';
import { NotificationService } from '../../admin/services/notification.service';
import { FormsModule } from '@angular/forms';
import { Category } from '../../admin/services/category';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, NgClass, ConfirmLogoutPopup, FormsModule],
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
  productService: AdminProductService = inject(AdminProductService);
  notificationService: NotificationService = inject(NotificationService);
  categoryServ: Category = inject(Category);

  showMobileNav = signal<boolean>(false);
  showAccountPopUp = signal<boolean>(false);
  loading = signal<boolean>(false);

  sub!: Subscription;

  currentRoute = signal<string>('');
  confirmLogout = signal<boolean>(false);
  userProfile = signal<any>(null);

  unreadNotication = computed(() => {
    return this.notificationService.userNotification().filter((n) => !n.userIsRead);
  });

  filterText = signal<string>('');

  ngOnInit(): void {
    this.currentRoute.set(this.router.url);

    this.sub = this.masterService.data$.subscribe((value) => {
      this.currentRoute.set(value?.link);
    });

    this.productService.initializeWishlist();
    this.productService.initializeCart();
    this.authService.getProfile();
    this.authService.isLogin();
    this.notificationService.getUserNotification();
    this.categoryServ.getCategory();

    this.filterText.set('');
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

  onSearch() {
    return this.categoryServ
      .categories()
      .filter((c) => c.categoryName.toLowerCase().includes(this.filterText().toLowerCase()));
  }

  onNavigateToCategory(category: string) {
    this.masterService.setData({
      link: `/category/${category}`,
    });
    this.router.navigateByUrl(`/category/${category}`);
    this.masterService.onSearch({
      category: category,
    });

    this.filterText.set('');
  }

  getUserProfile() {
    this.authService
      .getProfile()
      .then((profile) => {
        this.userProfile.set(profile);
      })
      .catch((err) => {
        this.toastr.error('Failed to fetch user profile');
      });
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

  onNavigateToMyOrder(link: string) {
    this.router.navigate([link], { fragment: 'order' });
    this.currentRoute.set('/account');

    if (this.showMobileNav()) {
      this.showMobileNav.set(false);
    }
  }

  onNavigateToMyReview(link: string) {
    this.router.navigate([link], { fragment: 'review' });
    this.currentRoute.set('/account');

    if (this.showMobileNav()) {
      this.showMobileNav.set(false);
    }
  }

  onNavigateToAccountOnMobile(link: string) {
    this.router.navigateByUrl(link);
    this.showMobileNav.set(false);
  }

  onNavigateHomeOnMobile(link: string) {
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
