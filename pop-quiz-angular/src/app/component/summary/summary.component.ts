import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/question";
import {Observable} from "rxjs";
import {State} from "../../models/state";
import {AnswerServiceService} from "../../services/answer-service.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  state$!: Observable<State>

  constructor(private answerService : AnswerServiceService) {

  }

  ngOnInit(): void {
    this.state$ = this.answerService.getState();
  }

}
