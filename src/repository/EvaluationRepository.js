import Repository from "./Repository";
const  MARKGENERALEXAM = "/Teacher/MarkAssignmentQuiz";
const MIDFINALEXAM = "/Teacher/MarkMidFinal";
const ASSIGNMENTQUIZEVALUATION = "/Student/GetAssignmentQuizMarks";
const EXAMMARKSEVALUATION ="/Student/GetExamsMarks";
const GETSESSION ="/Student/GetMySessions";
const GETEXAMMARKS ="/Student/GetMidFinalMarks"
export default {
    markGeneralExam(list) {
        return Repository.post(`${MARKGENERALEXAM}`,list);
    },
    markMidFinal(list) {
        return Repository.post(`${MIDFINALEXAM}`,list);
    },
    AssignmentQuizEvaluation(regno) {
        return Repository.get(`${ASSIGNMENTQUIZEVALUATION}?reg_no=${regno}`);
    },
    ExamMarksEvaluation(regno) {
        return Repository.get(`${EXAMMARKSEVALUATION}?reg_no=${regno}`);
    },
    getSession(regno) {
        return Repository.get(`${GETSESSION}?reg_no=${regno}`);
    },
    getExamMarks(regno,session) {
        return Repository.get(`${GETEXAMMARKS}?reg_no=${regno}&session=${session}`);
    },
  };