import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlueCalcModalComponent } from '../components/flue-calc-modal/flue-calc-modal.component';
import { TripModalComponent } from '../components/trip-modal/trip-modal.component';
import {
  TripFlueCalculation,
  TripFlueCoefficientOperator,
} from '../models/trip.models';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  flueCalcData: TripFlueCalculation = {
    flueCount: 100,
    distance: 12,
    weight: 12,
    coefficient: 1.5,
    coefficientOperator: TripFlueCoefficientOperator.MINUS,
  };

  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) {
    this.openFlueCalcModal();
  }

  // data = this.storageService.fetchUsers();

  async openNewTripModal() {
    // this.storageService.debugDb();
    console.log('opened modal', { name: 'test' });

    // this.db.addTrip('test');

    const modal = await this.modalCtrl.create({
      component: TripModalComponent,
      componentProps: { modalData: { name: 'vasya' } },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

  async openFlueCalcModal() {
    const modal = await this.modalCtrl.create({
      component: FlueCalcModalComponent,
      componentProps: { modalData: this.flueCalcData },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

  async openAddBlueCalcModal() {
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
}
