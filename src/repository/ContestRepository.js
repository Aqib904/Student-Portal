import Repository from "./Repository";
const MARKCONTEST ="/Student/ContestAttendance";
const GETCONTESTLIST ="/Teacher/GetContests";
const CONTESTACCEPT ="/Teacher/AcceptContest";
const CONTESTREJECT ="/Teacher/RejectContest";
const CONTESTDAYS ="/Teacher/GetContestSetting"
export default {
    markContest(list) {
      return Repository.post(`${MARKCONTEST}` ,list);
    },
    getContestList(username) {
        return Repository.get(`${GETCONTESTLIST}?username=${username}`);
      },
    contestAccept(aid) {
        return Repository.post(`${CONTESTACCEPT}?aid=${aid}`);
    },
    contestReject(aid) {
        return Repository.post(`${CONTESTREJECT}?aid=${aid}`);
    },
    getContestSetting(username) {
        return Repository.get(`${CONTESTDAYS}?teacherId=${username}`);
      },
    
  };