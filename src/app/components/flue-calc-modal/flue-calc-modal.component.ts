import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FlueFormula } from 'src/app/models/trip.models';
import { FormulaDataService } from 'src/app/services/formula-data.service';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-flue-calc-modal',
  templateUrl: './flue-calc-modal.component.html',
  styleUrls: ['./flue-calc-modal.component.scss'],
})
export class FlueCalcModalComponent implements OnInit {
  form: FormGroup;
  modalData!: FlueFormula;

  constructor(
    private modalCtrl: ModalController,
    private toasterService: ToasterService,
    private fb: FormBuilder,
    private formulaDataService: FormulaDataService
  ) {
    this.form = this.fb.group({
      flueCount: [20],
      distance: [200, Validators.required],
      weight: [2, Validators.required],
      coefficient: [1.5, Validators.required],
    });
  }

  ngOnInit() {
    if (this.modalData) {
      this.pathValueWithProps();
    }
  }

  private pathValueWithProps() {
    this.form.patchValue(this.modalData as FlueFormula);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.form.invalid) {
      return this.toasterService.warn('Invalid form');
    }

    this.addNewFormula();

    // TODO: save to db;
    // return this.modalCtrl.dismiss('this.name', 'confirm');
  }

  async addNewFormula() {
    let value = this.form.value;

    try {
      let res = await this.formulaDataService.addFormula({
        ...value,
        tripId: this.modalData.tripId,
      });
      this.modalCtrl.dismiss(res, 'confirm');
    } catch (err) {
      console.error(err);
      this.toasterService.error('Error to save trip');
    }
  }
}
