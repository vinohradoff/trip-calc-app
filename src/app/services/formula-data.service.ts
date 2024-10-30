import { Injectable } from '@angular/core';
import { FlueFormula } from '../models/trip.models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FormulaDataService {
  constructor(private storageService: StorageService) {}

  async addFormula(data: FlueFormula) {
    const sql = `INSERT INTO formuls (tripId, flueCount, distance, weight, coefficient) VALUES (?, ?, ?, ?, ?);`;

    let value = [
      data.tripId,
      data.flueCount,
      data.distance,
      data.weight,
      data.coefficient,
    ];

    return this.storageService.run(sql, value);
  }

  async updateFormulaById(formulaId: number, data: FlueFormula) {
    let statement = `UPDATE formuls SET 
        distance = ${data.distance},
        weight = ${data.weight},
        flueCount = ${data.flueCount},
        coefficient = ${data.coefficient}
        WHERE formulaId = ${formulaId}`;

    console.log(statement);

    return this.storageService.run(statement);
  }

  async fetchFormulasByTripId(tripId: number) {
    const sql = `SELECT * FROM formuls WHERE tripId = ${tripId}`;

    return this.storageService.query(sql);
  }

  async deleteFormulaById(formulaId: number) {
    const sql = `DELETE FROM formuls WHERE formulaId=${formulaId}`;
    return this.storageService.run(sql);
  }

  async deleteFormulaByTripId(tripId: number) {
    const sql = `DELETE FROM formuls WHERE tripId=${tripId}`;
    return this.storageService.run(sql);
  }
}
