import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastMsg } from 'src/app/models/toaster.models';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  constructor(
    private toastController: ToastController,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.toasterService.onMessage$.subscribe((msg: ToastMsg) =>
      this.presentToast(msg.msg)
    );
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
