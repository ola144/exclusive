import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Master {
  private _data$ = new BehaviorSubject<any>(null);

  data$: Observable<any> = this._data$.asObservable();

  setData(data: any) {
    this._data$.next(data);
  }
}
