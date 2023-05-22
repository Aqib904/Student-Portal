import Repository from "./Repository";
const STUDENTCOURSEADVISOR = "/Teacher/GetStudentsCourseAdvisor";
export default {
  studentCourseAdvisor(teacher_id) {
    return Repository.get(`${STUDENTCOURSEADVISOR}?teacher_id=${teacher_id}`);
  },
};
