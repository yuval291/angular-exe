import {Celll} from "./celll";

export interface Board {
  readonly cells: Celll[];
  readonly howManyRows: number;
  readonly correctGuess: string;
  readonly gameOver: boolean;
}
