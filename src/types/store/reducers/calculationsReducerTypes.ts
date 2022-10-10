export interface InitialCalcState {
  balance: number;
  amounts: {
    income: number[];
    expense: number[];
  }
  howManyMonths: number;
  results: Month[];
}

export interface Month {
  month: string;
  netWorth: number;
  difference: number;
}

export interface CalcPayload {
  balance: InitialCalcState["balance"];
  amounts: InitialCalcState["amounts"];
  howManyMonths: InitialCalcState["howManyMonths"];
}