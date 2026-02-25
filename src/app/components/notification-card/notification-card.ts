import { Component, inject, Input, OnInit } from '@angular/core';
import { INotification } from '../../admin/models';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../admin/services/notification.service';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-notification-card',
  imports: [CommonModule],
  templateUrl: './notification-card.html',
  styleUrl: './notification-card.css',
})
export class NotificationCard implements OnInit {
  @Input() notification!: INotification;

  notificationService: NotificationService = inject(NotificationService);
  authService: Auth = inject(Auth);

  ngOnInit(): void {
    this.authService.isAdmin();
    this.authService.isUser();
  }

  markAsRead(id: string) {
    this.notificationService.markNotificationAsRead(id);
  }

  markAsUnRead(id: string) {
    this.notificationService.markNotificationAsUnRead(id);
  }

  adminMarkAsRead(id: string) {
    this.notificationService.markAdminNotificationAsRead(id);
  }

  adminMarkAsUnRead(id: string) {
    this.notificationService.markAdminNotificationAsUnRead(id);
  }

  deleteNotification(id: string) {
    this.notificationService.deleteNotification(id);
  }
}
