import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  ActiveTrip,
  FlueFormula,
  Trip,
  TripDetail,
} from '../models/trip.models';
import { FormulaDataService } from './formula-data.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  constructor(
    private storageService: StorageService,
    private formulaDataService: FormulaDataService
  ) {}
  // trips: WritableSignal<TripDetail[] | undefined> = signal(undefined);
  activeTrip: WritableSignal<ActiveTrip | undefined> = signal(undefined);
  trips: TripDetail[] | undefined = undefined;

  async createTrip(data: Trip) {
    const sql = `INSERT INTO trips (label, flueCount, addBlueCount, odometrCount, startDate) VALUES (?, ?, ?, ?, ?);`;

    let value = [
      data.label,
      data.flueCount,
      data.addBlueCount,
      data.odometrCount,
      Date.now(),
    ];

    return this.storageService.run(sql, value);
  }

  async fetchTrips() {
    if (!this.trips) {
      const sql = 'SELECT * FROM trips;';
      const res = (await this.storageService.query(sql)).values as TripDetail[];
      this.trips = res;
    }

    return this.trips;
  }

  async getActiveTrip() {
    if (!this.trips) {
      await this.fetchTrips();
    }

    let trip = this.trips?.filter((trip) => !trip.endDate)[0];

    if (trip) {
      let formuls = (
        await this.formulaDataService.fetchFormulasByTripId(trip.tripId)
      ).values as FlueFormula[];

      this.activeTrip.set({
        ...trip,
        active: true,
        formuls,
      });
    }

    return undefined;
  }
}
