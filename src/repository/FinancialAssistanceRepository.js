import Repository from "./Repository";
const FINANCIALASSISTANCEREQUEST = "/Admin/GetFinancialAssistanceRequests";
const FINANCIALASSISTANCEIMAGES = "/Admin/GetFinancialAssistanceImages"
const ACCEPTREQUEST = "/Admin/AcceptFinancialAssistanceRequest"
const REJECTREQUEST = "/Admin/RejectFinancialAssistanceRequest"
export default {
    getFinancialAssistanceRequests() {
    return Repository.get(`${FINANCIALASSISTANCEREQUEST}`);
  },
  getFinancialAssistanceImages(id) {
    return Repository.get(`${FINANCIALASSISTANCEIMAGES}?id=${id}`);
  },
  requestAccept(id) {
    return Repository.post(`${ACCEPTREQUEST}?id=${id}`);
  },
  requestReject(id,remarks) {
    return Repository.post(`${REJECTREQUEST}?id=${id}&remarks=${remarks}`);
  },
};