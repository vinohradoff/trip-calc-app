import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlueFormula } from 'src/app/models/trip.models';
import { FormulaDataService } from 'src/app/services/formula-data.service';
import { TripDataService } from 'src/app/services/trip-data.service';
import { FlueCalcModalComponent } from '../flue-calc-modal/flue-calc-modal.component';
import { ToasterService } from '../toaster/toaster.service';
import { TripModalComponent } from '../trip-modal/trip-modal.component';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  @Input() trip!: any;

  constructor(
    private modalCtrl: ModalController,
    private toaster: ToasterService,
    private formulaDataService: FormulaDataService,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {}

  async openTripModal() {
    const modal = await this.modalCtrl.create({
      component: TripModalComponent,
      componentProps: {
        modalData: {
          name: 'vasya',
          odometrCount: 1000,
          flueCount: 200,
          addBlueCount: 10,
        },
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

  async openFlueCalcModal(tripData?: FlueFormula) {
    const modal = await this.modalCtrl.create({
      component: FlueCalcModalComponent,
      componentProps: { modalData: { ...tripData, tripId: this.trip.tripId } },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.tripDataService.getActiveTrip();
    }
  }

  async deleteFlueCalc(formulaId: number) {
    try {
      await this.formulaDataService.deleteFormulaById(formulaId);
      this.toaster.info('формула успешно удалена');

      this.tripDataService.getActiveTrip();
    } catch (err) {
      this.toaster.error('Ошибка при удалении формулы');
    }
  }
}
