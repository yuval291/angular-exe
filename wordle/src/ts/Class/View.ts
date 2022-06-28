import {Game} from "./Game";
import {Cell} from "./Cell";

export class View{

    guess = document.getElementById('input-guess') as HTMLInputElement;
    btn=document.getElementById('button-ok') as HTMLButtonElement;
    private readonly inputGuess: HTMLInputElement[] = [];
    games:Game = new Game();
    cells:Cell[]=[];


    constructor() {
        for(let i=1; i<=6; i++) {
            for(let j=1; j<=5; j++) {
                this.inputGuess.push(document.getElementById("input_" + i + "_" + j) as HTMLInputElement);
            }
        }

        this.btn.addEventListener('click',ev => {
            if(!this.games.gameOver){
                this.games.addGuess(this.guess.value);
                this.renderGame(this.games)
                console.log(this.games);
            }else{
                this.games.reset();
            }
        })
    }


    renderGame(game: Game){
        let cells = game.cells;
        for(let i=0; i<cells.length; i++) {
            this.inputGuess[i].value = cells[i].content;
            if(cells[i].status=="wrong"){
                this.inputGuess[i].style.color=  "#ff0707";
            }if(cells[i].status=="exists"){
                this.inputGuess[i].style.color=  "#0ea0f1";
            }if(cells[i].status=="exact"){
                this.inputGuess[i].style.color=  "#28c913";
            }
        }
    }
}


