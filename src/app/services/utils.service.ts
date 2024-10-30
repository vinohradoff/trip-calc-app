import { Injectable } from '@angular/core';
import { FlueFormula } from '../models/trip.models';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  calculateOdometr(currentValue: number, formuls: FlueFormula[]) {
    return formuls.reduce((current, f) => {
      return current + f.distance;
    }, currentValue);
  }

  calcFlueConsumption(f: FlueFormula) {
    let val = (f.distance * (43.8 + f.weight * 1.3)) / 100;
    let percent = (val / 100) * f.coefficient;
    return val + percent;
  }

  calcAddBlueConsumption(formuls: FlueFormula[]) {
    let sumFlueCons = this.sumFlueConsumbtion(formuls);

    let res = (sumFlueCons / 100) * 4;
    return res;
  }

  sumFlueConsumbtion(formuls: FlueFormula[]) {
    return formuls.reduce((val, f) => {
      return val + (f.flueConsumption || 0);
    }, 0);
  }

  calcAdditionFlue(formuls: FlueFormula[]): number {
    return formuls.reduce((sum, f) => {
      return sum + f.flueCount;
    }, 0);
  }
}
