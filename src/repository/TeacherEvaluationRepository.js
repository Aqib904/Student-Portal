import Repository from "./Repository";
const GETEVALUATINGTEACHER ="/Teacher/GetEvaluatingTeachersCourses"
const GETQUESTIONS = "/Teacher/GetPeerEvaluationQuestions"
const EVALUATEPEERTEACHER = "/Teacher/EvaluatePeerTeacher"
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
  };