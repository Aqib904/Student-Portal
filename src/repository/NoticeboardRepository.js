import Repository from "./Repository";
const SECTIONLIST ="/Admin/GetSectionList";
const ADDNOTICE = "/Admin/AddNoticeBoard"
export default {
    getSectionList() {
        return Repository.get(`${SECTIONLIST}`);
    },
    addNoticeBoard(list) {
        return Repository.post(`${ADDNOTICE}`,list);
    },
};