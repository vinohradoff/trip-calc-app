import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToasterComponent } from './toaster.component';

@NgModule({
  declarations: [ToasterComponent],
  exports: [ToasterComponent],
  imports: [CommonModule],
})
export class ToasterModule {}
