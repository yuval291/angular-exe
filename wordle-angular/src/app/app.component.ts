import {Component, ViewChild} from '@angular/core';
import {Cell} from "./class/Cell";
import {WORDS} from "./Words/Words";

const WORD_LENGTH = 5;

const NUM_TRIES = 6;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('input') input: string ='';
  cells:Cell[]=[];
  correctGuess:string='';
  guessWord:string='';
  howManyRows:number=0;
  gameOver: boolean = false;
  playerWon: boolean = false;
  temp: Cell =new Cell('empty','');


  constructor() {
    this.initCells();
    this.setGuess();
  }

  private initCells() {
    for (let y=0 ; y<NUM_TRIES ; y++){
      for (let x=0 ; x<WORD_LENGTH ; x++){
        this.cells.push(new Cell('empty',''));
      }
    }
  }

  private setGuess(){
    let rand = Math.floor(Math.random() * WORDS.length )+ 1;
    this.correctGuess=WORDS[rand];
    console.log(this.correctGuess)
  }

  enterGuessWord(value: string) {
    this.guessWord=value;
  }

  guessButton() {

    for (let x=0 ; x<5 ; x++){
      this.temp = new Cell('empty','');

      if(this.guessWord.charAt(x) == this.correctGuess.charAt(x)){
        this.temp.content=this.guessWord.charAt(x);
        this.temp.status= "exact";

      }else{
        if( this.correctGuess.includes(this.guessWord.charAt(x))){
          this.temp.content=this.guessWord.charAt(x);
          this.temp.status="exist";

        }else{
          this.temp.content=this.guessWord.charAt(x);
          this.temp.status="wrong";

        }
      }
      this.cells[(this.howManyRows*5)+x]=this.temp;
    }

    if(this.howManyRows<6) {
      this.howManyRows++;
      if(this.howManyRows === 6) {
        this.gameOver=true;
      }
    }
    this.ifWin();
  }

  ifWin() {
    let win = true;
    let start = (this.howManyRows * 5) - 5;

    for (let x=0 ; x<5 ; x++)
    {
      if(this.cells[start].status != 'exact'){
        win = false
      }
      start++;
    }

    if(win){
      alert("YOU WIN :)")
      this.gameOver=true;
      this.playerWon=true;
      this.reset();
    }else {
      if(this.gameOver){
        alert("YOU LOSE :(")
        this.reset();
      }
    }
  }

  reset(){
    this.cells=[];
    this.gameOver = false;
    this.playerWon = false;
    this.howManyRows=0;
    this.initCells();
  }

}

