import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TripFlueCalculation } from 'src/app/models/trip.models';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-flue-calc-modal',
  templateUrl: './flue-calc-modal.component.html',
  styleUrls: ['./flue-calc-modal.component.scss'],
})
export class FlueCalcModalComponent implements OnInit {
  form: FormGroup;
  modalData?: TripFlueCalculation;

  constructor(
    private modalCtrl: ModalController,
    private toasterService: ToasterService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      flueCount: [''],
      distance: ['', Validators.required],
      weight: ['', Validators.required],
      coefficient: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.modalData) {
      this.pathValueWithProps();
    }
    // TODO: preset value with the last trip
  }

  private pathValueWithProps() {
    this.form.patchValue(this.modalData as TripFlueCalculation);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    // TODO: save to db;
    // return this.modalCtrl.dismiss('this.name', 'confirm');
  }
}
