import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3Page } from './tab3.page';

import { TripDetailModule } from '../components/trip-detail/trip-detail.module';
import { Tab3PageRoutingModule } from './tab3-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    TripDetailModule,
  ],
  declarations: [Tab3Page],
})
export class Tab3PageModule {}
