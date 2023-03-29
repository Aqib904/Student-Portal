import Repository from "./Repository";
const GETTEACHERCOURSES = "/Teacher/GetCourses";
const GETSTUDENTSLIST = "/Teacher/GetStudents";
const MARKATTENDANCE = "/Teacher/MarkAttendance";
const GETSTUDENTATTENDANCELIST = "/Student/GetAttendance";
// const GETABSENTSLIST = "/Student/GetAbsentList";
export default {
  getTeacherCourses(username) {
    return Repository.get(`${GETTEACHERCOURSES}?username=${username}`);
  },
  getStudentsList(id, section) {
    return Repository.get(`${GETSTUDENTSLIST}?id=${id}&section=${section}`);
  },
  markAttendance(formData) {
    return Repository.post(`${MARKATTENDANCE}`, formData);
  },
  getStudentAttendaceList(regno) {
    return Repository.get(`${GETSTUDENTATTENDANCELIST}?reg_no=${regno}`);
  },
  // getAbsentsList(enrollmentId) {
  //   return Repository.get(`${GETABSENTSLIST}?eid=${enrollmentId}`);
  // },
};
