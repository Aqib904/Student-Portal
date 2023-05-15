import Repository from "./Repository";
const SECTIONLIST ="/Admin/GetSectionList";
const ADDNOTICE = "/Admin/AddNoticeBoard"
const VIEWNOTICEBOARD = "/Student/GetNoticeBoardInformation"
export default {
    getSectionList() {
        return Repository.get(`${SECTIONLIST}`);
    },
    addNoticeBoard(list) {
        return Repository.post(`${ADDNOTICE}`,list);
    },
    getNoticeboard(reg_no) {
        return Repository.get(`${VIEWNOTICEBOARD}?reg_no=${reg_no}`);
    },
};