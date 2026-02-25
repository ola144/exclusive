import { Component, inject, OnInit, signal } from '@angular/core';
import { NotificationService } from '../../admin/services/notification.service';
import { NotificationCard } from '../../components/notification-card/notification-card';
import { Button } from '../../components/button/button';
import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-notification',
  imports: [NotificationCard, Button, Loader],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification implements OnInit {
  notificationService: NotificationService = inject(NotificationService);

  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.notificationService.getUserNotification();
  }

  markAllNotificationAsRead() {
    this.loading.set(true);
    this.notificationService
      .markAllUserNotificationAsRead()
      .then(() => {
        this.notificationService.getUserNotification();
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
