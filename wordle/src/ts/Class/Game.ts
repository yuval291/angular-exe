import {Cell} from "./Cell";

import {WORDS} from "../words";


export class Game{

    correctGuess:string="yuval";
    cells:Cell[]=[];
    gameOver:boolean=false;
    playerWon:boolean=false;
    howManyRows:number=0;


    constructor() {
        this.initCells();
        let rand = Math.floor(Math.random() * WORDS.length )+ 1;
        console.log(rand)
        this.correctGuess=WORDS[rand];
        console.log("this.correctGuess ",this.correctGuess)
    }

    initCells(){
        this.cells = [];
        for (let y=0 ; y<6 ; y++){
            for (let x=0 ; x<5 ; x++){
                this.cells.push(new Cell('empty',''));
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

    addGuess(guess:string){

        if(guess.length<=5){
            for (let x=0 ; x<5 ; x++){
                let temp = new Cell('empty','');
                if(guess.charAt(x) == this.correctGuess.charAt(x)){
                    temp.content=guess.charAt(x);
                    temp.status='exact';
                }else{
                   if( this.correctGuess.includes(guess.charAt(x))){
                       temp.content=guess.charAt(x);
                       temp.status='exists';
                   }else{
                       temp.content=guess.charAt(x);
                       temp.status='wrong';
                   }
                }
                this.cells[(this.howManyRows*5)+x]=temp;
            }
        }

        if(this.howManyRows<6) {
            this.howManyRows++;
            if(this.howManyRows === 6) {
                this.gameOver=true;
            }
        }
        this.ifWin();

    }

    // insertCube(guess: string) {
    //     const input = this.view.input;
    //     input.value = guess.charAt(0);
    // }


    ifWin() {
        let win = true;
        let start = (this.howManyRows * 5) - 5;
        console.log(start)
        console.log(this.cells[start])
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
        }else {
            if(this.gameOver){
                alert("YOU LOSE :(")
            }
        }
    }
}