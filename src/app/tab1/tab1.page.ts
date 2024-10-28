import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripModalComponent } from '../components/trip-modal/trip-modal.component';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) {}

  data = this.storageService.fetchUsers();

  async openModal() {
    this.storageService.debugDb();
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
