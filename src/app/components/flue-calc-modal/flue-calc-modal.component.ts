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
      flueCount: [0],
      distance: ['', Validators.required],
      weight: ['', Validators.required],
      coefficient: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.modalData) {
      this.pathValueWithProps();
    }
  }

  private pathValueWithProps() {
    this.form.patchValue({
      flueCount: this.modalData.flueCount,
      distance: this.modalData.distance,
      weight: this.modalData.weight,
      coefficient: this.modalData.coefficient,
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.form.invalid) {
      return this.toasterService.warn('Invalid form');
    }

    let value: FlueFormula = this.form.value;
    value.flueCount = value.flueCount || 0;

    if (this.modalData?.formulaId) {
      this.updateFormula(value);
    } else {
      this.addNewFormula(value);
    }
  }

  async addNewFormula(value: FlueFormula) {
    try {
      let res = await this.formulaDataService.addFormula({
        ...value,
        tripId: this.modalData.tripId,
      });
      this.modalCtrl.dismiss(res, 'confirm');
    } catch (err) {
      console.error(err);
      this.toasterService.error('Error to save formula');
    }
  }

  async updateFormula(value: FlueFormula) {
    try {
      let res = await this.formulaDataService.updateFormulaById(
        this.modalData.formulaId,
        value
      );
      this.modalCtrl.dismiss(res, 'confirm');
    } catch (err) {
      console.error(err);
      this.toasterService.error('Error to update formula');
    }
  }
}
