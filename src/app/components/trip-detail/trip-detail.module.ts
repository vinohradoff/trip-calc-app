import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripDetailComponent } from './trip-detail.component';

@NgModule({
  declarations: [TripDetailComponent],
  imports: [IonicModule, CommonModule],
  exports: [TripDetailComponent],
})
export class TripDetailModule {}
