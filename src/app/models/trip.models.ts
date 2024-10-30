export type Trip = {
  label: string;
  flueCount: number;
  addBlueCount: number;
  odometrCount: number;
  startDate: number;
};

export type TripDetail = Trip & {
  tripId: number;
  endDate: number;
  formuls: FlueFormula[];
};

export type ActiveTrip = TripDetail & {
  active?: boolean;
};

export enum TripFlueCoefficientOperator {
  PLUS = 'plus',
  MINUS = 'minus',
}

export type FlueFormula = {
  formulaId: number;
  tripId: number;
  flueCount: number;
  distance: number;
  weight: number;
  coefficient: number;
  flueConsumption: number;
};

// export type TripAddBlueCalculation = {
//   flueCount: number;
//   distance: number;
//   weight: number;
//   coefficient: number;
//   // coefficientOperator: TripFlueCoefficientOperator;
// };
