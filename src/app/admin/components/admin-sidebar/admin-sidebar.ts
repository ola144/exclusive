import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth';
import { ConfirmLogoutPopup } from '../../../components/confirm-logout-popup/confirm-logout-popup';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ConfirmLogoutPopup],
  templateUrl: './admin-sidebar.html',
})
export class AdminSidebarComponent {
  authService: Auth = inject(Auth);
  router: Router = inject(Router);

  confirmLogout = signal<boolean>(false);
  expandedMenus = signal<string[]>([]);

  toggleMenu(menu: string) {
    this.expandedMenus.update((menus) => {
      if (menus.includes(menu)) {
        return menus.filter((m) => m !== menu);
      } else {
        return [...menus, menu];
      }
    });
  }
}
