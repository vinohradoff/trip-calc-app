import { Component, OnInit, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripDetail } from '../models/trip.models';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  trip: WritableSignal<TripDetail> = this.tripDataService.trip;

  constructor(
    private route: ActivatedRoute,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    this.tripDataService.getTripById(Number(tripId));
  }
}
