import Repository from "./Repository";
const GETCOURSETEACHER ="/Student/GetCourseAndTeachers";
const GETASSESSMENTQUESTIONS ="/Student/GetTeacherEvaluationQuestions";
const MARKEVALUATION ="/Student/FeedbackTeacher";
const GETTEACHERSCOURSES ="/Admin/GetAllTeachersAndCourses";
const GETTEACHERSFEEDBACK ="/Admin/GetTeacherFeedback";
const STARTNEWEVALUATION = "/Admin/AllowAssessment"
export default {
    getCourseTeacher(regno) {
      return Repository.get(`${GETCOURSETEACHER}?reg_no=${regno}`);
    },
    getAssessmentQuestions(id) {
        return Repository.get(`${GETASSESSMENTQUESTIONS}?allocationId=${id}`);
      },
      markEvaluation(list) {
        return Repository.post(`${MARKEVALUATION}`, list);
      },
      getTeachersCourses(session) {
        return Repository.get(`${GETTEACHERSCOURSES}?session=${session}`);
      },
      getTeachersFeedback(teacherId,courseCode,session) {
        return Repository.get(`${GETTEACHERSFEEDBACK}?teacherId=${teacherId}&courseCode=${courseCode}&session=${session}`);
      },
      startNewEvaluation(list) {
        return Repository.post(`${STARTNEWEVALUATION}`, list);
      },
  };