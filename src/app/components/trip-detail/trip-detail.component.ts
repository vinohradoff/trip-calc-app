import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FlueFormula, TripDetail } from 'src/app/models/trip.models';
import { FormulaDataService } from 'src/app/services/formula-data.service';
import { TripDataService } from 'src/app/services/trip-data.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FlueCalcModalComponent } from '../flue-calc-modal/flue-calc-modal.component';
import { ToasterService } from '../toaster/toaster.service';
import { TripModalComponent } from '../trip-modal/trip-modal.component';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit, OnChanges {
  @Input() trip!: TripDetail;
  currentOdometr!: number;
  addBlueConsumption!: number;
  flueSumConsumbption!: number;
  additionFlue!: number;

  constructor(
    private modalCtrl: ModalController,
    private toaster: ToasterService,
    private formulaDataService: FormulaDataService,
    private tripDataService: TripDataService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.calculateFormuls();
      this.fillInParams();
    }
  }

  private fillInParams() {
    this.currentOdometr = this.utilsService.calculateOdometr(
      this.trip.odometrCount,
      this.trip.formuls
    );
    this.addBlueConsumption = this.utilsService.calcAddBlueConsumption(
      this.trip.formuls
    );
    this.flueSumConsumbption = this.utilsService.sumFlueConsumbtion(
      this.trip.formuls
    );
    this.additionFlue = this.utilsService.calcAdditionFlue(this.trip.formuls);
  }

  private calculateFormuls() {
    this.trip.formuls = this.trip.formuls.map((f) => {
      return {
        ...f,
        flueConsumption: this.utilsService.calcFlueConsumption(f),
      };
    });
  }

  async openTripModal() {
    let trip = this.trip || {};

    const modal = await this.modalCtrl.create({
      component: TripModalComponent,
      componentProps: {
        modalData: {
          tripId: trip.tripId,
          label: trip.label,
          odometrCount: trip.odometrCount,
          flueCount: trip.flueCount,
          addBlueCount: trip.addBlueCount,
        },
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log('update');
      this.trip = {
        ...this.trip,
        ...data,
      };
    }
  }

  async deleteTrip() {
    try {
      await this.tripDataService.deleteTrip(this.trip.tripId);
      await this.tripDataService.hardReload();
      this.toaster.info('Поездка успешно удалена');
    } catch (err) {
      console.error(err);
    }
  }

  async openFlueCalcModal(flueFormula?: FlueFormula) {
    let formula = flueFormula || {};

    const modal = await this.modalCtrl.create({
      component: FlueCalcModalComponent,
      componentProps: { modalData: { ...formula, tripId: this.trip.tripId } },
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

  async finishTrip() {
    try {
      await this.tripDataService.finishTrip(this.trip.tripId);
      this.toaster.error('Поездка завершина');
      await this.tripDataService.hardReload();
    } catch (err) {
      console.error(err);
    }
  }
}
