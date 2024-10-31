import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  trips = this.tripDataService.trips;

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.tripDataService.hardReload();
  }
}
