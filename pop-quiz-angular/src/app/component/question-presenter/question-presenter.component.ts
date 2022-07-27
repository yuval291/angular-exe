import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../models/question";
import {Observable} from "rxjs";
import {State} from "../../models/state";
import {AnswerServiceService} from "../../services/answer-service.service";

@Component({
  selector: 'app-question-presenter',
  templateUrl: './question-presenter.component.html',
  styleUrls: ['./question-presenter.component.css']
})
export class QuestionPresenterComponent implements OnInit {

  state$!: Observable<State>;
  isBusy$!: Observable<boolean>;

  constructor(private answerService : AnswerServiceService) {}

  SelectAnswer(answer: string){
    this.answerService.answerChose(answer).then();
  }

  ngOnInit(): void {
    this.state$ = this.answerService.getState();
    this.isBusy$ = this.answerService.getIsBusy();
  }

}
