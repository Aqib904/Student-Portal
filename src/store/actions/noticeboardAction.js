import {SECTIONLIST,SECTION_LIST_LOADING,ADD_NOTICE_LOADING} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
import { toast } from "react-toastify";
var noticeboard = RepositoryFactory.get("noticeboard");
export const getSectionList = () => async (dispatch) => {
    try {
        dispatch(sectionListLoading(true))
      const { data } = await noticeboard.getSectionList()
      if (data) {
        dispatch({ type: SECTIONLIST, payload: { sectionList: data } });
        dispatch(sectionListLoading(false))
      } else {
        toast.error("Section List loaded failed")
        dispatch(sectionListLoading(false))
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
      dispatch(sectionListLoading(false))
    }
  };
  export const addNoticeBoard = (list) => async (dispatch) => {
    try {
      dispatch(addNoticeLoading(true))
      const {data} = await noticeboard.addNoticeBoard(list)
      if (data == "Added") {
        toast.success("Notice added Successfully");
        dispatch(addNoticeLoading(false))
      } else {
        console.log("Notice added  failed")
        dispatch(addNoticeLoading(false))
      }
    } catch (error) {
      console.log(error.message);
      dispatch(addNoticeLoading(false))
    }
  };
  export const sectionListLoading = (val) => async (dispatch) => {
    dispatch({ type: SECTION_LIST_LOADING, payload: val });
  };
  export const addNoticeLoading = (val) => async (dispatch) => {
    dispatch({ type: ADD_NOTICE_LOADING, payload: val });
  };