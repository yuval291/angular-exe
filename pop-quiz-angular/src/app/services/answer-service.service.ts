import { Injectable } from '@angular/core';
import {QUESTIONS_DB} from "../models/question-db";
import {Question} from "../models/question";
import {BehaviorSubject, Observable} from "rxjs";
import {State} from "../models/state";

@Injectable({
  providedIn: 'root'
})
export class AnswerServiceService {

  private state = this.initialState();
  private state$ = new BehaviorSubject<State>(this.state);

  private isBusy = false;
  private isBusy$ = new BehaviorSubject<boolean>(this.isBusy);

  private isQuizOver = false;
  private isQuizOver$ = new BehaviorSubject<boolean>(this.isQuizOver);

  constructor(){}


  private initialState(): State {
    return {
      currentQuestionIndex: 0,
      currentQuestion: QUESTIONS_DB[0],
      score: 0,
      summary: []
    }
  }

  async selectAnswer(answer:string){
    await this.delay(3000);
    //בודק מה האינדקס של התשובה שהמשתמש סימן
    let answerIndex = this.state.currentQuestion.answers.indexOf(answer);

    //מעדכן את הנתונים של המבחן
    QUESTIONS_DB[this.state.currentQuestionIndex]={
      ...QUESTIONS_DB[this.state.currentQuestionIndex],
      userAnswer : answerIndex
    }

    //מעדכן את הנתונים של הSTATE
    this.state = {
      ...this.state,
      currentQuestion: QUESTIONS_DB[this.state.currentQuestionIndex]
    }

    //נותן ציון של 10 נקודות אם התשובה היא נכונה
    let newScore = 0;
    if (answerIndex === this.state.currentQuestion.correctAnswer) {
      newScore = 10;
    }

    //לדחוף לSUMMARY את השאלה הנוכחית
    this.state.summary.push(this.state.currentQuestion);

    //לשנות את STATE לשאלה הבאה
    this.state = {
      currentQuestionIndex : this.state.currentQuestionIndex +1,
      currentQuestion : QUESTIONS_DB[this.state.currentQuestionIndex +1],
      score:this.state.score + newScore,
      summary: this.state.summary
    }

    this.state$.next(this.state);
  }

  private delay(millis: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, millis));
  }

  getState():Observable<State>  {
    return this.state$.asObservable();
  }

  getIsBusy(): Observable<boolean> {
    return this.isBusy$.asObservable();
  }

  getIsQuizOver(): Observable<boolean> {
    return this.isQuizOver$.asObservable();
  }

  async answerChose(answer: string) {
    this.isBusy = true;
    this.isBusy$.next(this.isBusy);
    if(!this.isQuizOver){
      await this.selectAnswer(answer);
      this.isQuizOver = !this.state.currentQuestion;
      this.isQuizOver$.next(this.isQuizOver);
    }
    this.isBusy=false;
    this.isBusy$.next(this.isBusy);
  }
}
