import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripModalComponent } from '../components/trip-modal/trip-modal.component';
import { ActiveTrip } from '../models/trip.models';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  trip: ActiveTrip | undefined;

  constructor(
    private modalCtrl: ModalController,

    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    this.getActiveTrip();
  }

  private async getActiveTrip() {
    this.trip = await this.tripDataService.getActiveTrip();
  }

  async openTripModal() {
    // this.storageService.debugDb();

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
