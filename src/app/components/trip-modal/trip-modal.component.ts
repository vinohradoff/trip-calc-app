import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { TripDataService } from 'src/app/services/trip-data.service';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html',
  styleUrls: ['./trip-modal.component.scss'],
})
export class TripModalComponent implements OnInit {
  form: FormGroup;
  modalData: any;

  constructor(
    private modalCtrl: ModalController,
    private toasterService: ToasterService,
    private tripDataService: TripDataService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      label: ['kiev-odessa', Validators.required],
      odometrCount: [20000, Validators.required],
      flueCount: [55, Validators.required],
      addBlueCount: [4, Validators.required],
    });
  }

  ngOnInit() {
    if (this.modalData) {
      this.form.patchValue(this.modalData);
    }
    console.log(this.modalData);
    // TODO: preset value with the last trip
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.modalData) {
      // TODO: edit
    } else {
      this.createNewTrip();
    }
  }

  private async createNewTrip() {
    if (this.form.invalid) {
      return this.toasterService.warn('Invalid form');
    }

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
