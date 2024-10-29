import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToasterType, ToastMsg } from 'src/app/models/toaster.models';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  onMessage$: Subject<ToastMsg> = new Subject();

  constructor() {}

  private show(msg: string, type: ToasterType = ToasterType.Info) {
    this.onMessage$.next({ msg });
  }

  info(msg: string) {
    this.show(msg, ToasterType.Info);
  }

  error(msg: string) {
    this.show(msg, ToasterType.Danger);
  }

  warn(msg: string) {
    this.show(msg, ToasterType.Warn);
  }
}
