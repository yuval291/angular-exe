import {Board} from "../models/board";
import {Injectable} from "@angular/core";
import {Cell} from "../models/cell";
import {Celll} from "../models/celll";
import {WORDS} from "../words/words";

const WORD_LENGTH = 5;
const NUM_TRIES = 6;

@Injectable({
  providedIn: 'root'
})
export class GameService{
  board: Board;
  isWinner: boolean;

  constructor() {
    this.board=this.initBoard();
      this.isWinner = false;
  }

  private initBoard() {
    let newBoard: Board = {
      cells: this.initCells(),
      howManyRows:0,
      correctGuess:this.setWord(),
      gameOver:false
    }
    return newBoard;
  }


  private initCells(): Cell[] {
    let cell: Celll[] = [];
    for (let y=0 ; y<NUM_TRIES ; y++){
      for (let x=0 ; x<WORD_LENGTH ; x++){
        cell.push({content: '', status: "empty"});
      }
    }
    return cell;
  }

  getState() {
    return this.board;
  }

  private setWord(){
    let rand = Math.floor(Math.random() * WORDS.length )+ 1;
    let correctGuess = WORDS[rand];
    console.log(correctGuess)

    return correctGuess;
  }

  private async delay(millis: number) {
    return new Promise<void>(resolve => setTimeout(resolve, millis));
  }

  async addGuess(guessWord: string): Promise<Board> {
    await this.delay(3000);
    let temp: Cell;
    for (let x=0 ; x<5 ; x++){
      temp = new Cell('empty','');
      if(guessWord.charAt(x) == this.board.correctGuess.charAt(x)){
         temp.content=guessWord.charAt(x);
         temp.status= "exact";
      }else{
        if( this.board.correctGuess.includes(guessWord.charAt(x))){
          temp.content=guessWord.charAt(x);
          temp.status="exist";
        }else{
          temp.content=guessWord.charAt(x);
          temp.status="wrong";
        }
      }
      this.board.cells[(this.board.howManyRows*5)+x]=temp;
    }

    let board: Board = {
      cells: this.board.cells,
      howManyRows:this.board.howManyRows + 1,
      correctGuess:this.board.correctGuess,
      gameOver:this.ifWin(guessWord)
    }

    this.board = board;
    return board;
  }

  ifWin(guessWord: string) {
    let start = (this.board.howManyRows * 5) - 5;

    if(this.board.correctGuess === guessWord)
    {
      this.isWinner = true;
      return true;
    }else if(this.board.howManyRows === 5){
      return true;
    }

    return false;
  }

  reset() {
    this.board = this.initBoard();
    this.isWinner = false;
    return this.board;
  }
}
