import Repository from "./Repository";
const FEEDETAIL ="/Student/GetFeeDetail";
const GENERATECHALLAN = "/Student/GenerateChallan"
const GETCHALLAN = "/Student/GetChallan"
const GETFEESTATUS = "/Student/GetFeeStatus"
const GETSTUDENTS = "/Admin/GetFeeStudents"
const APPROVESTATUS = "/Admin/ApproveFee"
const REJECTSTATUS = "/Admin/RejectFee"
const REQUESTINSTALLMENTS = "/Student/InstallmentRequest"
const ALLINSTALLMENTSREQUESTS = "/Admin/GetInstallmentRequests"
const REJECTINSTALLMENT = "/Student/RejectInstallmentRequest"
const APPROVEINSTALLMENT = "/Student/AcceptInstallmentRequest"
export default {
    getFeeDetail(regno) {
        return Repository.get(`${FEEDETAIL}?reg_no=${regno}`);
    },
    getInstallmentRequests() {
        return Repository.get(`${ALLINSTALLMENTSREQUESTS}`);
    },
    generateChallan(model) {
        return Repository.post(`${GENERATECHALLAN}`,JSON.stringify(model));
    },
    requestInstallments(model) {
        return Repository.post(`${REQUESTINSTALLMENTS}`,JSON.stringify(model));
    },
    getChallan(regno) {
        return Repository.get(`${GETCHALLAN}?regNo=${regno}`);
    },
    getFeeStatus(regno) {
        return Repository.get(`${GETFEESTATUS}?reg_no=${regno}`);
    },
    getStudent() {
        return Repository.get(`${GETSTUDENTS}`);
    },
    approveFeeStatus(challanId) {
        return Repository.post(`${APPROVESTATUS}?challanId=${challanId}`);
    },
    rejectFeeStatus(challanId,reason) {
        return Repository.post(`${REJECTSTATUS}?challanId=${challanId}&remarks=${reason}`);
    },
    approveInstallment(Id) {
        return Repository.post(`${APPROVEINSTALLMENT}?id=${Id}`);
    },
    rejectInstallment(Id) {
        return Repository.post(`${REJECTINSTALLMENT}?id=${Id}`);
    },
  };