export interface Bonus {
  name: string;
  value: string;
}

export interface BonusByLevel {
  [s: string]: Array<number | string>;
}
