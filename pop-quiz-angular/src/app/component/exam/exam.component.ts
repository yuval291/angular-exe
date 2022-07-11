import { Component, OnInit } from '@angular/core';
import {Question} from "../../models/question";
import {QUESTIONS_DB} from "../../models/question-db";
import {AnswerServiceService} from "../../services/answer-service.service";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {

  currentQuestion: Question;
  isQuizOver: boolean;
  summary: Question[];
  isBusy:boolean;

  constructor(private answerService : AnswerServiceService) {
    this.isQuizOver = false;
    this.currentQuestion = answerService.getCurrentQuestion();
    this.summary = [];
    this.isBusy = false;
  }

  async selectAnswer(answer:string){
    this.isBusy=true;
    if(!this.isQuizOver){
      await this.answerService.selectAnswer(answer);
      this.summary.push(this.currentQuestion);
      this.currentQuestion=this.answerService.currentQuestion;
    }
    this.isQuizOver = !(this.currentQuestion);
    this.isBusy=false;
  }

  getIsBusy(){
    return this.isBusy;
  }
}

