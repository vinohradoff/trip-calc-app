import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripDetail, TripFlueCalculation } from 'src/app/models/trip.models';
import { FlueCalcModalComponent } from '../flue-calc-modal/flue-calc-modal.component';
import { ToasterService } from '../toaster/toaster.service';
import { TripModalComponent } from '../trip-modal/trip-modal.component';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  @Input() trip!: TripDetail;

  constructor(
    private modalCtrl: ModalController,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {}

  async openTripModal() {
    const modal = await this.modalCtrl.create({
      component: TripModalComponent,
      componentProps: {
        modalData: {
          name: 'vasya',
          odometrCount: 1000,
          flueCount: 200,
          addBlueCount: 10,
        },
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

  async openFlueCalcModal(tripData?: TripFlueCalculation) {
    const modal = await this.modalCtrl.create({
      component: FlueCalcModalComponent,
      componentProps: { modalData: tripData },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

  deleteFlueCalc() {
    this.toaster.info('Удален расчет топлива');
  }
}
