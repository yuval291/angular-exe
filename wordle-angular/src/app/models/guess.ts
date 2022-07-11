import {Celll} from "./celll";

export interface Guess {
  readonly cells: Celll[];
  readonly isCorrect: boolean;
  readonly isFilled: boolean;
}
