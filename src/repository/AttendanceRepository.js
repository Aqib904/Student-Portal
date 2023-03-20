import Repository from "./Repository";
const GETTEACHERCOURSES = "/Teacher/GetCourses";
const GETSTUDENTSLIST ="/Teacher/GetStudents";
const MARKATTENDANCE = "/Teacher/MarkAttendence";
const GETSTUDENTATTENDANCELIST = "/Student/GetAttendance";
export default {
    getTeacherCourses(username) {
      return Repository.get(`${GETTEACHERCOURSES}?username=${username}`);
    },
    getStudentsList(id,section) {
        return Repository.get(`${GETSTUDENTSLIST}?id=${id}&section=${section}`);
      },
    markAttendance(list) {
        return Repository.post(`${MARKATTENDANCE}`,list);
    },
    getStudentAttendaceList(regno) {
        return Repository.get(`${GETSTUDENTATTENDANCELIST}?reg_no=${regno}`);
      },
  };