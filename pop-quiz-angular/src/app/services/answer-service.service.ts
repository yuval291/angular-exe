import { Injectable } from '@angular/core';
import {QUESTIONS_DB} from "../models/question-db";
import {Question} from "../models/question";

@Injectable({
  providedIn: 'root'
})
export class AnswerServiceService {

  currentQuestion: Question;
  currentQuestionIndex: number;

  constructor() {
    this.currentQuestionIndex = 0;
    this.currentQuestion = QUESTIONS_DB[this.currentQuestionIndex];
  }

  async selectAnswer(answer:string){
    await this.delay(3000);
    //בודק מה האינדקס של התשובה שהמשתמש סימן
    let answerIndex = this.currentQuestion.answers.indexOf(answer)
    this.currentQuestion.userAnswer=answerIndex;
    //לעדכן את השדות
    this.currentQuestionIndex++;
    this.currentQuestion=QUESTIONS_DB[this.currentQuestionIndex];
  }

  private delay(millis: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, millis));
  }

  getCurrentQuestion() {
    return this.currentQuestion;
  }
}
