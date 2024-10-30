import { Component, OnInit, WritableSignal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripModalComponent } from '../components/trip-modal/trip-modal.component';
import { TripDetail } from '../models/trip.models';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  trip: WritableSignal<TripDetail> = this.tripDataService.activeTrip;

  constructor(
    private modalCtrl: ModalController,

    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    this.getActiveTrip();
  }

  private async getActiveTrip() {
    this.tripDataService.getActiveTrip();
    console.log('this.trip', this.trip);
  }

  async openTripModal() {
    // this.storageService.debugDb();

    const modal = await this.modalCtrl.create({
      component: TripModalComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      await this.tripDataService.hardReload();
    }
  }
}
