import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['test', Validators.required],
      odometrCount: ['', Validators.required],
      flueCount: ['flue', Validators.required],
      addBlueCount: ['', Validators.required],
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
  i = 1;
  confirm() {
    // TODO: save to db;

    this.toasterService.show('ebanasta' + this.i++);
    // return this.modalCtrl.dismiss('this.name', 'confirm');
  }
}
