import { Component, ElementRef, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth';
import { ConfirmLogoutPopup } from '../../../components/confirm-logout-popup/confirm-logout-popup';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ConfirmLogoutPopup],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebarComponent implements OnInit {
  @ViewChild('sidebar') sidebar!: ElementRef<HTMLElement>;

  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  confirmLogout = signal<boolean>(false);
  sidebarIsPinned = signal<boolean>(false);
  expandedMenus = signal<string[]>([]);

  ngOnInit(): void {
    const localPin = localStorage.getItem('sidebarPin');

    if (localPin !== null) {
      this.sidebarIsPinned.set(JSON.parse(localPin));

      if (this.sidebarIsPinned()) {
        this.sidebar?.nativeElement?.classList.add('full-sidebar');
      } else {
        this.sidebar?.nativeElement?.classList.remove('full-sidebar');
      }
    }
  }

  toggleMenu(menu: string) {
    this.expandedMenus.update((menus) => {
      if (menus.includes(menu)) {
        return menus.filter((m) => m !== menu);
      } else {
        return [...menus, menu];
      }
    });
  }

  showFullSidebar() {
    this.sidebar.nativeElement.classList.add('full-sidebar');
  }

  hideFullSidebar() {
    this.sidebar.nativeElement.classList.remove('full-sidebar');

    if (this.sidebarIsPinned()) {
      this.sidebar.nativeElement.classList.add('full-sidebar');
    } else {
      this.sidebar.nativeElement.classList.remove('full-sidebar');
    }
  }

  togglePinSidebar() {
    if (this.sidebarIsPinned()) {
      this.sidebarIsPinned.set(false);
      localStorage.setItem('sidebarPin', JSON.stringify(this.sidebarIsPinned()));

      const localPin = localStorage.getItem('sidebarPin');

      if (localPin !== null) {
        this.sidebarIsPinned.set(JSON.parse(localPin));
        this.sidebar.nativeElement.classList.remove('full-sidebar');
      }
    } else {
      this.sidebarIsPinned.set(true);
      localStorage.setItem('sidebarPin', JSON.stringify(this.sidebarIsPinned()));

      const localPin = localStorage.getItem('sidebarPin');

      if (localPin !== null) {
        this.sidebarIsPinned.set(JSON.parse(localPin));
        this.sidebar.nativeElement.classList.add('full-sidebar');
      }
    }
  }
}
