import { Component, OnInit } from '@angular/core';
import {Question} from "../../models/question";
import {QUESTIONS_DB} from "../../models/question-db";
import {AnswerServiceService} from "../../services/answer-service.service";
import {Observable} from "rxjs";
import {State} from "../../models/state";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  state$!: Observable<State>;
  isBusy$!: Observable<boolean>;
  isQuizOver$!: Observable<boolean>;

  constructor(private answerService : AnswerServiceService) {}

  ngOnInit(): void {
    this.state$ = this.answerService.getState();
    this.isBusy$ = this.answerService.getIsBusy();
    this.isQuizOver$ = this.answerService.getIsQuizOver();
  }
}

