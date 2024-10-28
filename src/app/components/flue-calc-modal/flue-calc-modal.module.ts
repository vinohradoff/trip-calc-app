import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FlueCalcModalComponent } from './flue-calc-modal.component';

@NgModule({
  declarations: [FlueCalcModalComponent],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FlueCalcModalComponent],
})
export class FlueCalcModalModule {}
