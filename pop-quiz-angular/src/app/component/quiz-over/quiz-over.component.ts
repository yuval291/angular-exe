import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {State} from "../../models/state";
import {AnswerServiceService} from "../../services/answer-service.service";

@Component({
  selector: 'app-quiz-over',
  templateUrl: './quiz-over.component.html',
  styleUrls: ['./quiz-over.component.css']
})
export class QuizOverComponent implements OnInit {

  state$!: Observable<State>;

  constructor(private answerService : AnswerServiceService) { }

  ngOnInit(): void {
    this.state$ = this.answerService.getState();
  }

}
