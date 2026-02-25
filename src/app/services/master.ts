import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { CONTACTS_COLLECTION_ID, DATABASE_ID, databases } from '../core/appwrite.config';
import { ID } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class Master {
  messages = signal<any[]>([]);

  private _data$ = new BehaviorSubject<any>(null);
  private _search$ = new BehaviorSubject<any>(null);

  data$: Observable<any> = this._data$.asObservable();
  search$: Observable<any> = this._search$.asObservable();

  setData(data: any) {
    this._data$.next(data);
  }

  onSearch(data: any) {
    this._search$.next(data);
  }

  async sendMessage(data: any) {
    const res = await databases.createDocument(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      ID.unique(),
      data,
    );

    return res;
  }

  async getMessages() {
    const res = await databases.listDocuments(DATABASE_ID, CONTACTS_COLLECTION_ID);

    this.messages.set(res.documents);
    return res.documents;
  }
}
