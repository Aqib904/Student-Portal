import Repository from "./Repository";
const LOGIN = "/Login/LoginUser";
const GETENROLLMENTSTATUS = "/Student/GetEnrollmentStatus";
const GETUSER ="/Login/GetUser"
export default {
  login(username, password) {
    return Repository.get(`${LOGIN}/?username=${username}&password=${password}`);
  },
  getEnrollmentStatus(reg_no) {
    return Repository.get(`${GETENROLLMENTSTATUS}?reg_no=${reg_no}`);
  },
  GetUser(username, role) {
    return Repository.get(`${GETUSER}/?username=${username}&role=${role}`);
  },
};