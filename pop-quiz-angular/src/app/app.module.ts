import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import {RouterModule} from "@angular/router";
import { ExamComponent } from './component/exam/exam.component';
import { HeaderComponent } from './component/header/header.component';
import { QuestionPresenterComponent } from './component/question-presenter/question-presenter.component';
import { QuizOverComponent } from './component/quiz-over/quiz-over.component';
import { SummaryComponent } from './component/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ExamComponent,
    HeaderComponent,
    QuestionPresenterComponent,
    QuizOverComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:'', component:MainPageComponent},
      {path:"exam",component:ExamComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
