import Repository from "./Repository";
const FINELIST ="/Admin/GetFineList";
const STUDENTSLIST = "/Admin/GetStudents"
const ADDFINE = "/Admin/AddFine"
const FINEACCEPT = "/Admin/ApproveFine"
const FINEREJECT = "/Admin/RejectFine"
const STUDENTFINE ="/Student/GetFine"
export default {
    getFineList() {
        return Repository.get(`${FINELIST}`);
    },
    getStudentsList() {
        return Repository.get(`${STUDENTSLIST}`);
    },
    addFine(list) {
        return Repository.post(`${ADDFINE}`,list);
    },
    fineAccept(id) {
        return Repository.post(`${FINEACCEPT}?id=${id}`);
    },
    fineReject(id,reason) {
        return Repository.post(`${FINEREJECT}?id=${id}&remarks=${reason}`);
    },
    getStudentFine(reg_no) {
        return Repository.get(`${STUDENTFINE}?reg_no=${reg_no}`);
    },
};