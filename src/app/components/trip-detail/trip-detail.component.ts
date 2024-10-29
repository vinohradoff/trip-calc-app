import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToasterType } from 'src/app/models/toaster.models';
import { TripFlueCalculation } from 'src/app/models/trip.models';
import { StorageService } from 'src/app/services/storage.service';
import { FlueCalcModalComponent } from '../flue-calc-modal/flue-calc-modal.component';
import { ToasterService } from '../toaster/toaster.service';
import { TripModalComponent } from '../trip-modal/trip-modal.component';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {}

  // data = this.storageService.fetchUsers();

  async openNewTripModal() {
    // this.storageService.debugDb();
    console.log('opened modal', { name: 'test' });

    // this.db.addTrip('test');

    const modal = await this.modalCtrl.create({
      component: TripModalComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

  async openEditTripModal() {
    // this.storageService.debugDb();
    console.log('opened modal', { name: 'test' });

    // this.db.addTrip('test');

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
    this.toaster.show('Удален расчет топлива', ToasterType.Warn);
  }
}
