export type Trip = {
  id?: string;
  name: string;
};

export type TripFlueCalculation = {
  flueCount: number;
  distance: number;
  weight: number;
  coefficient: number;
  coefficientOperator: TripFlueCoefficientOperator;
};

export enum TripFlueCoefficientOperator {
  PLUS = 'plus',
  MINUS = 'minus',
}
