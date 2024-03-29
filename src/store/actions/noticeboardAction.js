import {
  SECTIONLIST,
  SECTION_LIST_LOADING,
  ADD_NOTICE_LOADING,
  NOTICEBOARD,
  NOTIFICATION,
  NOTIFICATION_LOADING,
  TOPICS,
  STUDENTTOPICS
} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
import { toast } from "react-toastify";
var noticeboard = RepositoryFactory.get("noticeboard");
export const getSectionList = () => async (dispatch) => {
  try {
    dispatch(sectionListLoading(true));
    const { data } = await noticeboard.getSectionList();
    if (data) {
      dispatch({ type: SECTIONLIST, payload: { sectionList: data } });
      dispatch(sectionListLoading(false));
    } else {
      toast.error("Section List loaded failed");
      dispatch(sectionListLoading(false));
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
    dispatch(sectionListLoading(false));
  }
};
// export const getNoticeboard = (reg_no) => async (dispatch) => {
//   try {
//       dispatch(sectionListLoading(true))
//     const { data } = await noticeboard.getNoticeboard(reg_no)
//     if (data) {
//       dispatch({ type: NOTICEBOARD, payload: { noticeboard: data } });
//       dispatch(sectionListLoading(false))
//     } else {
//       toast.error("Noticeboard loaded failed")
//       dispatch(sectionListLoading(false))
//       throw new Error(data.error);
//     }
//   } catch (error) {
//     alert(error.message);
//     dispatch(sectionListLoading(false))
//   }
// };
export const getNoticeboard = (username) => {
  return async (dispatch) => {
    try {
      dispatch(sectionListLoading(true));
      const localStorageData = localStorage.getItem(username);
      let storedData = [];
      if (localStorageData) {
        storedData = JSON.parse(localStorageData);
      }
      const { data } = await noticeboard.getNoticeboard(username);
      const storedIds = new Set(storedData.map((item) => item.id));
      //console.log(storedData, "storedData");
      const updatedData = [...storedData];
      //console.log(updatedData, "updateData");
      //console.log(storedIds, "storedIds");
      data.forEach((item) => {
        if (!storedIds.has(item.id)) {
          updatedData.push(item);
        }
      });
      const uniqueData = Array.from(
        new Set(updatedData.map((item) => item.id))
      ).map((id) => {
        return updatedData.find((item) => item.id === id);
      });
      const finalData = [...uniqueData];
      console.log(updatedData, "Data");
      dispatch({ type: NOTICEBOARD, payload: { noticeboard: finalData } });
      dispatch(sectionListLoading(false));
    } catch (error) {
      //console.log(error);
    }
  };
};

export const pinNotice = (username, index, noticeboard) => async (dispatch) => {
  const pinnedNotice = noticeboard[index];
  //console.log(pinnedNotice,'notice>')
  const updatedNoticeboard = [
    pinnedNotice,
    ...noticeboard.filter((_, idx) => idx !== index),
  ].filter(Boolean);
  localStorage.setItem(username, JSON.stringify(updatedNoticeboard));
  dispatch(getNoticeboard(username));
};
export const addNoticeBoard = (list) => async (dispatch) => {
  try {
    dispatch(addNoticeLoading(true));
    const { data } = await noticeboard.addNoticeBoard(list);
    if (data == "Added") {
      toast.success("Notice added Successfully");
      dispatch(addNoticeLoading(false));
    } else {
      //console.log("Notice added  failed");
      dispatch(addNoticeLoading(false));
    }
  } catch (error) {
    //console.log(error.message);
    dispatch(addNoticeLoading(false));
  }
};
export const getNotification = (username) => async (dispatch) => {
  dispatch(notificationLoading(true));
  try {
    const { data } = await noticeboard.getNotification(username);
    if (data) {
      dispatch({ type: NOTIFICATION, payload: { notification: data } });
      dispatch(notificationLoading(false));
    } else {
      toast.error("Notification loaded failed");
      dispatch(notificationLoading(false));
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
    dispatch(notificationLoading(false));
  }
};
export const seenNotification = (id) => async (dispatch) => {
  try {
    const { data } = await noticeboard.seenNotification(id);
    if (data == "Seen") {
      console.log("Seen");
    } else {
      console.log("Seen failed");
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const seenNoticeboard = (reg_no) => async (dispatch) => {
  try {
    const { data } = await noticeboard.seenNoticeboard(reg_no);
    if (data == "Seen") {
      console.log("Seen");
    } else {
      console.log("Seen failed");
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const getTopics = (allocationId) => async (dispatch) => {
  try {
    const { data } = await noticeboard.getTopics(allocationId);
    if (data) {
      dispatch({ type: TOPICS, payload: { topics: data } });
    } else {
      toast.error("Topics loaded failed");
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
  }
};
export const getStudentTopics = (courseCode,reg_no) => async (dispatch) => {
  try {
    const { data } = await noticeboard.getStudentTopics(courseCode,reg_no);
    if (data) {
      dispatch({ type: STUDENTTOPICS, payload: { studenttopics: data } });
    } else {
      toast.error("Topics loaded failed");
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
  }
};
export const addTopics = (model,onSuccess) => async (dispatch) => {
  try {
    dispatch(addNoticeLoading(true));
    const { data } = await noticeboard.addTopics(model);
    if (data == "Added") {
      toast.success("Topics added Successfully");
      dispatch(addNoticeLoading(false));
      onSuccess()
    } else {
      //console.log("Notice added  failed");
      dispatch(addNoticeLoading(false));
    }
  } catch (error) {
    //console.log(error.message);
    dispatch(addNoticeLoading(false));
  }
};
export const notificationLoading = (val) => async (dispatch) => {
  dispatch({ type: NOTIFICATION_LOADING, payload: val });
};
export const sectionListLoading = (val) => async (dispatch) => {
  dispatch({ type: SECTION_LIST_LOADING, payload: val });
};
export const addNoticeLoading = (val) => async (dispatch) => {
  dispatch({ type: ADD_NOTICE_LOADING, payload: val });
};
