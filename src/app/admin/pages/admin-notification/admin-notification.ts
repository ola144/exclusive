import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from '../../../components/button/button';
import { NotificationService } from '../../services/notification.service';
import { NotificationCard } from '../../../components/notification-card/notification-card';
import { Loader } from '../../../components/loader/loader';

@Component({
  selector: 'app-admin-notification',
  imports: [Button, NotificationCard, Loader],
  templateUrl: './admin-notification.html',
  styleUrl: './admin-notification.css',
})
export class AdminNotification implements OnInit {
  notificationService: NotificationService = inject(NotificationService);

  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.notificationService.getAllNotifications();
  }

  markAllNotificationAsRead() {
    this.loading.set(true);
    this.notificationService
      .markAdminAllNotificationAsRead()
      .then(() => {
        this.notificationService.getAllNotifications();
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
