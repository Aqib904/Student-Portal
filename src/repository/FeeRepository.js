import Repository from "./Repository";
const FEEDETAIL ="/Student/GetFeeDetail";
const GENERATECHALLAN = "/Student/GenerateChallan"
const GETCHALLAN = "/Student/GetChallan"
export default {
    getFeeDetail(regno) {
        return Repository.get(`${FEEDETAIL}?reg_no=${regno}`);
    },
    generateChallan(model) {
        return Repository.post(`${GENERATECHALLAN}`,JSON.stringify(model));
    },
    getChallan(regno) {
        return Repository.get(`${GETCHALLAN}?regNo=${regno}`);
    },
  };