import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../models/question";

@Component({
  selector: 'app-question-presenter',
  templateUrl: './question-presenter.component.html',
  styleUrls: ['./question-presenter.component.css']
})
export class QuestionPresenterComponent implements OnInit {

  //היא אמורה לקבל את השאלה מבחוץ לכן :
  @Input()
  question:Question;

  @Input()
  isBusy:boolean;

  @Output()
  answerChosen = new EventEmitter<string>();



  constructor() {
    this.question = {caption: "", answers: [], correctAnswer: -1, userAnswer: -1};
    this.isBusy = false;
  }

  onSelectAnswer(answer: string){
    this.answerChosen.emit(answer)
  }

  ngOnInit(): void {
  }

}
