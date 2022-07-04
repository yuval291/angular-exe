import {Exam} from "../interfaces/exam";
import {Answer} from "../interfaces/answer";
import {Question} from "../interfaces/question";

export class ExamRunner{
    answers:Answer[]=[];

    constructor(private exam:Exam) {}

    currentQuestion(){
        return this.exam.questions[this.answers.length];
    };

    examFinish(){
        if (this.answers.length == 10){
            return true;
        }
        return false;
    };

    allCurrentAnswers(){
        return this.answers;
    };

    getExem(){
        return this.exam;
    }

    currentGrade(){
        let score = 0;
        this.answers.forEach(answer => {
            if (answer.isCorrect){
                score++;
            }
        })
        return score*10;
    };

    answerNextQestion(answerIndex:number){
        let isCorrect = false;
        if (this.currentQuestion().correct == answerIndex){
            isCorrect = true;
        }
        let answer ={index: (answerIndex-1) , isCorrect: isCorrect}
        this.answers.push(answer);
    }



}