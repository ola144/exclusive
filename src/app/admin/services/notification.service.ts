import { inject, Injectable, signal } from '@angular/core';
import { INotification } from '../models';
import {
  account,
  DATABASE_ID,
  databases,
  NOTIFICATIONS_COLLECTION_ID,
} from '../../core/appwrite.config';
import { Query } from 'appwrite';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  toastr: ToastrService = inject(ToastrService);

  allNotification = signal<INotification[]>([]);
  userNotification = signal<INotification[]>([]);

  loading = signal<boolean>(false);

  constructor() {
    this.getAllNotifications();
    this.getUserNotification();
  }

  async getAllNotifications() {
    this.loading.set(true);
    try {
      const res: any = await databases.listDocuments(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID);

      this.allNotification.set(res.documents);
      return res.documents;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.set(false);
    }
  }

  async getUserNotification() {
    this.loading.set(true);

    try {
      const user = await account.get();

      const res: any = await databases.listDocuments(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, [
        Query.equal('userId', user.$id),
      ]);

      this.userNotification.set(res.documents);
      return res.documents;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.set(false);
    }
  }

  //   USER
  async markNotificationAsRead(id: string) {
    const payload = {
      userIsRead: true,
    };

    await databases
      .updateDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, id, payload)
      .then(() => {
        this.toastr.success('Notification marked as read.');
        this.getAllNotifications();
        this.getUserNotification();
      })
      .catch((error) => {
        this.toastr.error(error.messge);
      });
  }

  async markAllUserNotificationAsRead() {
    const payload = {
      userIsRead: true,
    };

    try {
      const updates = this.userNotification().map((n) =>
        databases.updateDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, n.$id, payload),
      );

      await Promise.all(updates);

      // update signal locally
      this.userNotification.update((notifications) =>
        notifications.map((n) => ({ ...n, userIsRead: true })),
      );

      this.toastr.success('All notifications marked as read.');
      this.getUserNotification();
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  //   ADMIN
  async markAdminNotificationAsRead(id: string) {
    const payload = {
      adminIsRead: true,
    };

    await databases
      .updateDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, id, payload)
      .then(() => {
        this.toastr.success('Notification marked as read.');
        this.getAllNotifications();
        this.getUserNotification();
      })
      .catch((error) => {
        this.toastr.error(error.messge);
      });
  }

  async markAdminNotificationAsUnRead(id: string) {
    const payload = {
      adminIsRead: false,
    };

    await databases
      .updateDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, id, payload)
      .then(() => {
        this.toastr.success('Notification marked as unread.');
        this.getAllNotifications();
        this.getUserNotification();
      })
      .catch((error) => {
        this.toastr.error(error.messge);
      });
  }

  async markAdminAllNotificationAsRead() {
    const payload = {
      adminIsRead: true,
    };

    try {
      const updates = this.allNotification().map((n) =>
        databases.updateDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, n.$id, payload),
      );

      await Promise.all(updates);

      // update signal locally
      this.allNotification.update((notifications) =>
        notifications.map((n) => ({ ...n, adminIsRead: true })),
      );

      this.toastr.success('All notifications marked as read.');
      this.getAllNotifications();
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  //   USER
  async markAllNotificationAsRead() {
    const payload = {
      userIsRead: true,
    };

    try {
      const updates = this.userNotification().map((n) =>
        databases.updateDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, n.$id, payload),
      );

      await Promise.all(updates);

      // update signal locally
      this.userNotification.update((notifications) =>
        notifications.map((n) => ({ ...n, userIsRead: true })),
      );

      this.toastr.success('All notifications marked as read.');
      this.getUserNotification();
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  //   USER
  async markNotificationAsUnRead(id: string) {
    const payload = {
      userIsRead: false,
    };

    await databases
      .updateDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, id, payload)
      .then(() => {
        this.toastr.success('Notification marked as unread.');
        this.getAllNotifications();
        this.getUserNotification();
      })
      .catch((error) => {
        this.toastr.error(error.messge);
      });
  }

  async deleteNotification(id: string) {
    await databases
      .deleteDocument(DATABASE_ID, NOTIFICATIONS_COLLECTION_ID, id)
      .then(() => {
        this.toastr.success('Notification deleted.');
        this.getAllNotifications();
        this.getUserNotification();
      })
      .catch((error) => {
        this.toastr.error(error.messge);
      });
  }
}
