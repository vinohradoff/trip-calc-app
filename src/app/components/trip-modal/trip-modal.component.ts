import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { TripDetail } from 'src/app/models/trip.models';
import { TripDataService } from 'src/app/services/trip-data.service';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html',
  styleUrls: ['./trip-modal.component.scss'],
})
export class TripModalComponent implements OnInit {
  form: FormGroup;
  modalData!: TripDetail;

  constructor(
    private modalCtrl: ModalController,
    private toasterService: ToasterService,
    private tripDataService: TripDataService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      label: ['', Validators.required],
      odometrCount: ['', Validators.required],
      flueCount: ['', Validators.required],
      addBlueCount: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.modalData) {
      this.form.patchValue(this.modalData);
    }
    console.log(this.modalData);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.form.invalid) {
      return this.toasterService.warn('Invalid form');
    }

    if (this.modalData?.tripId) {
      this.updateTrip();
    } else {
      this.createNewTrip();
    }
  }

  private async updateTrip() {
    let value = this.form.value;
    console.log('value update', value);
    try {
      await this.tripDataService.updateTripById(this.modalData.tripId, value);
      this.modalCtrl.dismiss(value, 'confirm');
    } catch (err) {
      console.error(err);
      this.toasterService.error('Error to save trip');
    }
  }

  private async createNewTrip() {
    let value = this.form.value;

    try {
      let res = await this.tripDataService.createTrip(value);
      this.modalCtrl.dismiss(res, 'confirm');
    } catch (err) {
      console.error(err);
      this.toasterService.error('Error to save trip');
    }
  }
}
