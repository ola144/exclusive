import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../services/auth';
import { NotificationService } from '../../services/notification.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  templateUrl: './admin-header.html',
  imports: [RouterLink],
})
export class AdminHeaderComponent implements OnInit {
  authService: Auth = inject(Auth);
  notificationService: NotificationService = inject(NotificationService);

  unreadNotication = computed(() => {
    return this.notificationService.allNotification().filter((n) => !n.adminIsRead);
  });

  ngOnInit() {
    this.authService.getProfile();
    this.notificationService.getAllNotifications();
  }
}
