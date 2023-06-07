import Repository from "./Repository";
const SECTIONLIST ="/Admin/GetSectionList";
const ADDNOTICE = "/Admin/AddNoticeBoard"
const VIEWNOTICEBOARD = "/Student/GetNoticeBoardInformation"
const GETNOTIFICATION = "/Notification/GetNotificatons"
const SEENNOTIFICATION = "/Notification/SeenNotification"
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
    getNotification(username) {
        return Repository.get(`${GETNOTIFICATION}?username=${username}`);
    },
    seenNotification(id) {
        return Repository.post(`${SEENNOTIFICATION}?id=${id}`);
    },
};