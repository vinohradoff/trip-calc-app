import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RoundPipe } from 'src/app/pipes/round.pipe';
import { TripDetailComponent } from './trip-detail.component';

@NgModule({
  declarations: [TripDetailComponent],
  imports: [IonicModule, CommonModule, RoundPipe],
  exports: [TripDetailComponent],
})
export class TripDetailModule {}
