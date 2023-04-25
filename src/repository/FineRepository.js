import Repository from "./Repository";
const FINELIST ="/Admin/GetFineList";
const STUDENTSLIST = "/Admin/GetStudents"
export default {
    getFineList() {
        return Repository.get(`${FINELIST}`);
    },
    getStudentsList() {
        return Repository.get(`${STUDENTSLIST}`);
    },
};