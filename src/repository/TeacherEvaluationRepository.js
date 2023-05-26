import Repository from "./Repository";
const GETEVALUATINGTEACHER ="/Teacher/GetEvaluatingTeachersCourses"
const GETQUESTIONS = "/Teacher/GetPeerEvaluationQuestions"
const EVALUATEPEERTEACHER = "/Teacher/EvaluatePeerTeacher"
const GETPEEREVALUATION = "/Student/GetPeerTeacherEvaluation"
export default {
    getEvaluatingTeacher(username) {
        return Repository.get(`${GETEVALUATINGTEACHER}?teacher_id=${username}`);
      },
      getTeacherQuestions() {
        return Repository.get(`${GETQUESTIONS}`);
      },
      evaluatePeerTeacher(list) {
        return Repository.post(`${EVALUATEPEERTEACHER}`, list);
      },
      getPeerEvaluation(reg_no) {
        return Repository.get(`${GETPEEREVALUATION}?reg_no=${reg_no}`);
      },
  };