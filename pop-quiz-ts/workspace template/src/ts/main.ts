import {QUESTIONS_DB} from "./QuestionsDB";
import {ExamRunner} from "./class/examRunner";
import {View} from "./class/view";

const exam ={questions : QUESTIONS_DB}
const examRunner = new ExamRunner(exam);
const view = new View();

view.start(examRunner);