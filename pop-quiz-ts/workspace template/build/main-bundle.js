/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/QuestionsDB.ts":
/*!*******************************!*\
  !*** ./src/ts/QuestionsDB.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QUESTIONS_DB = void 0;
exports.QUESTIONS_DB = [
    {
        "caption": "When was Israel founded?",
        "answers": [
            "1733",
            "1947",
            "1948",
            "1849"
        ],
        "correct": 3
    },
    {
        "caption": "6 / (2 * (1 + 2)) = ?",
        "answers": [
            "9",
            "1",
            "6",
            "12"
        ],
        "correct": 2
    },
    {
        "caption": "There are a total of X Harry Potter books?",
        "answers": [
            "6",
            "8",
            "7",
            "9"
        ],
        "correct": 3
    },
    {
        "caption": "How many states are there in the US?",
        "answers": [
            "50",
            "51",
            "52",
            "1"
        ],
        "correct": 1
    },
    {
        "caption": "Which of these countries was NOT a part of the Soviet Union?",
        "answers": [
            "Ukraine",
            "Belarus",
            "Poland",
            "Georgia"
        ],
        "correct": 3
    },
    {
        "caption": "Which flies a green, white, and orange (in that order) tricolour flag?",
        "answers": [
            "Ireland",
            "Ivory Coast",
            "Italy",
            "Iceland"
        ],
        "correct": 3
    },
    {
        "caption": "Where was the first example of paper money used?",
        "answers": [
            "China",
            "Turkey",
            "Greece",
            "Germany"
        ],
        "correct": 3
    },
    {
        "caption": "When was World of Warcraft released?",
        "answers": [
            "2002",
            "2004",
            "1994",
            "2006"
        ],
        "correct": 2
    },
    {
        "caption": "How many seasons does the tv series LOST has?",
        "answers": [
            "6",
            "5",
            "4",
            "3"
        ],
        "correct": 1
    },
    {
        "caption": "Who if the F1 (Formula 1) driver with the most wins in record?",
        "answers": [
            "Michael Schumacher",
            "Fernando Alonso",
            "Sebastian Vettel",
            "Lewis Hamilton"
        ],
        "correct": 4
    }
];


/***/ }),

/***/ "./src/ts/class/examRunner.ts":
/*!************************************!*\
  !*** ./src/ts/class/examRunner.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExamRunner = void 0;
var ExamRunner = /** @class */ (function () {
    function ExamRunner(exam) {
        this.exam = exam;
        this.answers = [];
    }
    ExamRunner.prototype.currentQuestion = function () {
        return this.exam.questions[this.answers.length];
    };
    ;
    ExamRunner.prototype.examFinish = function () {
        if (this.answers.length == 10) {
            return true;
        }
        return false;
    };
    ;
    ExamRunner.prototype.allCurrentAnswers = function () {
        return this.answers;
    };
    ;
    ExamRunner.prototype.getExem = function () {
        return this.exam;
    };
    ExamRunner.prototype.currentGrade = function () {
        var score = 0;
        this.answers.forEach(function (answer) {
            if (answer.isCorrect) {
                score++;
            }
        });
        return score * 10;
    };
    ;
    ExamRunner.prototype.answerNextQestion = function (answerIndex) {
        var isCorrect = false;
        if (this.currentQuestion().correct == answerIndex) {
            isCorrect = true;
        }
        var answer = { index: (answerIndex - 1), isCorrect: isCorrect };
        this.answers.push(answer);
    };
    return ExamRunner;
}());
exports.ExamRunner = ExamRunner;


/***/ }),

/***/ "./src/ts/class/view.ts":
/*!******************************!*\
  !*** ./src/ts/class/view.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.View = void 0;
var View = /** @class */ (function () {
    function View() {
        this.startBtn = document.getElementById('start-btn');
        this.answerButtons = document.getElementById('answer-btn');
        this.currQuestion = document.getElementById('question');
        this.quizSummary = document.getElementById('quiz-summary');
        this.questionContainerElement = document.getElementById('question-container');
    }
    View.prototype.start = function (examRunner) {
        var _this = this;
        if (this.startBtn) {
            this.startBtn.addEventListener('click', function (ev) {
                _this.startGame();
                _this.render(examRunner);
            });
        }
    };
    View.prototype.startGame = function () {
        this.startBtn.classList.add('hide'); //להסתיר
        this.questionContainerElement.classList.remove('hide');
    };
    View.prototype.render = function (examRunner) {
        var _this = this;
        if (examRunner.examFinish()) {
            this.currQuestion.style.display = 'none';
            this.quizFinish(examRunner);
        }
        else {
            var currentQuestion_1 = examRunner.currentQuestion();
            this.currQuestion.innerText = currentQuestion_1.caption;
            this.currQuestion.className = 'cur-question';
            var qAnswers_1 = [];
            currentQuestion_1.answers.forEach(function (answer) {
                var answerBtn = document.createElement('button');
                qAnswers_1.push(answerBtn);
                answerBtn.innerText = answer;
                answerBtn.className = "answer";
                answerBtn.addEventListener('click', function () {
                    examRunner.answerNextQestion(currentQuestion_1.answers.indexOf(answer) + 1);
                    qAnswers_1.forEach(function (btn) { return btn.style.display = 'none'; });
                    qAnswers_1.length = 0;
                    _this.render(examRunner);
                });
                _this.answerButtons.appendChild(answerBtn);
            });
        }
    };
    View.prototype.quizFinish = function (examRunner) {
        var _this = this;
        this.quizSummary.classList.remove('hide');
        this.quizSummary.style.display = "inherit";
        this.quizSummary.innerText = "EXAM IS OVER! YOUR FINAL SCORE " + examRunner.currentGrade();
        examRunner.getExem().questions.forEach(function (ques) {
            var question = document.createElement('div');
            question.innerText = ques.caption;
            question.className = "summary-head";
            var ans = document.createElement('button');
            ans.className = "answer-finish";
            var answer = examRunner.allCurrentAnswers().at(examRunner.getExem().questions.indexOf(ques));
            if (answer !== undefined) {
                ans.innerText = "Your Answer: " + ques.answers[answer.index];
                if (answer.isCorrect) {
                    ans.classList.add("correct");
                }
                else {
                    ans.classList.add("wrong");
                }
            }
            var correctAns = document.createElement('button');
            correctAns.className = "answer-correct";
            correctAns.innerText = "The Correct Answer: " + ques.answers[(ques.correct - 1)];
            _this.quizSummary.appendChild(question);
            _this.quizSummary.appendChild(ans);
            _this.quizSummary.appendChild(correctAns);
        });
    };
    return View;
}());
exports.View = View;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var QuestionsDB_1 = __webpack_require__(/*! ./QuestionsDB */ "./src/ts/QuestionsDB.ts");
var examRunner_1 = __webpack_require__(/*! ./class/examRunner */ "./src/ts/class/examRunner.ts");
var view_1 = __webpack_require__(/*! ./class/view */ "./src/ts/class/view.ts");
var exam = { questions: QuestionsDB_1.QUESTIONS_DB };
var examRunner = new examRunner_1.ExamRunner(exam);
var view = new view_1.View();
view.start(examRunner);

})();

/******/ })()
;
//# sourceMappingURL=main-bundle.js.map