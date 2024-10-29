import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Tab1Page } from './tab1.page';

import { FlueCalcModalModule } from '../components/flue-calc-modal/flue-calc-modal.module';
import { TripDetailModule } from '../components/trip-detail/trip-detail.module';
import { TripModalModule } from '../components/trip-modal/trip-modal.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    Tab1PageRoutingModule,
    TripModalModule,
    FlueCalcModalModule,
    TripDetailModule,
  ],
  declarations: [Tab1Page],
})
export class Tab1PageModule {}
