import Repository from "./Repository";
const SECTIONLIST ="/Admin/GetSectionList";
const ADDNOTICE = "/Admin/AddNoticeBoard"
const VIEWNOTICEBOARD = "/Student/GetNoticeBoardInformation"
const GETNOTIFICATION = "/Notification/GetNotificatons"
const SEENNOTIFICATION = "/Notification/SeenNotification"
const SEENNOTICEBOARD = "/Student/SeenNoticeboard"
const GETTOPICS = "/Teacher/GetMyCourseWeeklyTopics"
const GETSTUDENTTOPICS = "/Student/GetMyCourseWeeklyTopics"
const addTopics ="/Teacher/AddNewWeekTopics"
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
    seenNoticeboard(reg_no) {
        return Repository.post(`${SEENNOTICEBOARD}?reg_no=${reg_no}`);
    },
    getTopics(aid) {
        return Repository.get(`${GETTOPICS}?aid=${aid}`);
    },
    getStudentTopics(courseCode,reg_no) {
        return Repository.get(`${GETSTUDENTTOPICS}?reg_no=${reg_no}&course_code=${courseCode}`);
    },
    addTopics(model) {
        return Repository.post(`${addTopics}`,model);
    },
};