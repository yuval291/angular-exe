import {Component, ViewChild} from '@angular/core';
import { Cell } from './models/cell';
import {WORDS} from "./words/words";
import {Board} from "./models/board";
import {GameService} from "./service/game.service";
// import {GameService} from "./service/game.service";

const WORD_LENGTH = 5;

const NUM_TRIES = 6;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  guessWord:string='';
  board: Board;
  isBusy: boolean;


  constructor(private gameService: GameService) {
    this.board = this.gameService.getState();
    this.isBusy = false;
  }

  enterGuessWord(value: string) {
    this.guessWord=value;
  }

  async guessButton() {
    this.isBusy = true;
    this.board = await this.gameService.addGuess(this.guessWord);

    if(this.gameOver() && this.gameService.isWinner){
      alert("YOU WIN :)")
      this.board=this.gameService.reset();
    }else if(this.gameOver()){
      alert("YOU LOSE :(+")
      this.board=this.gameService.reset();
    }
    this.isBusy = false;
  }


  private gameOver() {
    return this.board.gameOver;
  }
}

