import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripModalComponent } from './trip-modal.component';

@NgModule({
  declarations: [TripModalComponent],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TripModalComponent],
})
export class TripModalModule {}
