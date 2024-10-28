import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToasterType, ToastMsg } from 'src/app/models/toaster.models';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  onMessage$: Subject<ToastMsg> = new Subject();

  constructor() {}

  show(msg: string, type: ToasterType = ToasterType.Info) {
    this.onMessage$.next({ msg });
  }
}
