// import {Card} from "./Card";
//
// export class Game{
//
//     cards: Array<Array<Card>>;
//     id: string;
//
//     constructor() {
//         this.cards=[];
//         this.id = "BOARD"+(Math.random()*100000)+performance.now().toString();
//     }
//
//     render(){
//         let obj = `<div class = 'board' id='${this.id}'></div>`;
//         return obj;
//     }
//
//     init(){
//         let game = document.getElementById(this.id) as HTMLDivElement;
//         for (let y=0 ; y<6 ; y++){
//             for (let x=0 ; x<5 ; x++){
//                 let c = new Card();
//                 game.insertAdjacentHTML('beforeend',c.render())
//             }
//         }
//     }
//
//     afterRender(){
//         let x = document.getElementById(this.id);
//     }
//
//     gameOver:boolean=false;
//     playerWon:boolean=false;
//     howManyRows:number=0;
//
//     reset(){
//
//     }
//
//     addGuess(guess:string){
//
//     }
//
// }