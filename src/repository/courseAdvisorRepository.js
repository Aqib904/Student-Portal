import Repository from "./Repository";
const STUDENTCOURSEADVISOR = "/Teacher/GetStudentsCourseAdvisor";
const ADDADVISORDETAIL = "/Teacher/AddCourseAdvisorDetail";
const GETADVICES = "/Student/GetAdvise"
export default {
  studentCourseAdvisor(teacher_id) {
    return Repository.get(`${STUDENTCOURSEADVISOR}?teacher_id=${teacher_id}`);
  },
  addAdvisorDetail(detail) {
    return Repository.post(`${ADDADVISORDETAIL}` ,detail);
  },
  getAdvices(reg_no) {
    return Repository.get(`${GETADVICES}?reg_no=${reg_no}`);
  },
};
