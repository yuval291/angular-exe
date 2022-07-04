import {ExamRunner} from "./examRunner";
import {EventEmitter} from "events";


export class View  {

    private startBtn : HTMLButtonElement;
    private answerButtons : HTMLDivElement;
    private currQuestion : HTMLDivElement;
    private quizSummary: HTMLDivElement;
    private questionContainerElement : HTMLButtonElement;

    constructor() {
        this.startBtn =  document.getElementById('start-btn') as HTMLButtonElement;
        this.answerButtons = document.getElementById('answer-btn') as HTMLDivElement;
        this.currQuestion = document.getElementById('question') as HTMLDivElement;
        this.quizSummary = document.getElementById('quiz-summary') as HTMLDivElement;
        this.questionContainerElement = document.getElementById('question-container')  as HTMLButtonElement
    }

    start(examRunner: ExamRunner){
        if (this.startBtn) {
            this.startBtn.addEventListener('click', ev => {
                this.startGame();
                this.render(examRunner);
            });
        }
    }

    startGame() {
        this.startBtn.classList.add('hide');//להסתיר
        this.questionContainerElement.classList.remove('hide');
    }

    render(examRunner: ExamRunner){
        if (examRunner.examFinish()){
            this.currQuestion.style.display = 'none';
            this.quizFinish(examRunner);

        }else {
            let currentQuestion = examRunner.currentQuestion();
            this.currQuestion.innerText = currentQuestion.caption;
            this.currQuestion.className='cur-question'
            const qAnswers:  HTMLButtonElement[] = [];
            currentQuestion.answers.forEach(answer => {
                const answerBtn =document.createElement('button');
                qAnswers.push(answerBtn);
                answerBtn.innerText = answer;
                answerBtn.className = "answer";
                answerBtn.addEventListener('click' , () => {
                    examRunner.answerNextQestion(currentQuestion.answers.indexOf(answer)+1);
                    qAnswers.forEach(btn => btn.style.display = 'none');
                    qAnswers.length = 0;
                    this.render(examRunner);
                })
                this.answerButtons.appendChild(answerBtn);
            })
        }
    }

    private quizFinish(examRunner: ExamRunner) {
        this.quizSummary.classList.remove('hide');
        this.quizSummary.style.display = "inherit";
        this.quizSummary.innerText = "EXAM IS OVER! YOUR FINAL SCORE " + examRunner.currentGrade();

        examRunner.getExem().questions.forEach(ques => {
            const question = document.createElement('div');
            question.innerText = ques.caption;
            question.className = "summary-head";

            const ans = document.createElement('button');
            ans.className = "answer-finish";

            let answer = examRunner.allCurrentAnswers().at(examRunner.getExem().questions.indexOf(ques));
            if(answer !== undefined){
                ans.innerText ="Your Answer: " + ques.answers[answer.index];

                if (answer.isCorrect) {
                    ans.classList.add("correct");
                } else {
                    ans.classList.add("wrong");
                }
            }
            const correctAns = document.createElement('button');
            correctAns.className = "answer-correct";
            correctAns.innerText = "The Correct Answer: " + ques.answers[(ques.correct-1)];

            this.quizSummary.appendChild(question);
            this.quizSummary.appendChild(ans);
            this.quizSummary.appendChild(correctAns);
        })

    }
}