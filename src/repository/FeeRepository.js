import Repository from "./Repository";
const FEEDETAIL ="/Student/GetFeeDetail";
export default {
    getFeeDetail(regno) {
        return Repository.get(`${FEEDETAIL}?reg_no=${regno}`);
    },
  };