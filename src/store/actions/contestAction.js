import {CONTESTLIST,CONTESTDAYS,MARK_CONTEST_LOADING,ACCEPT_CONTEST_LOADING,REJECT_CONTEST_LOADING} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
import { toast } from "react-toastify";
var contest = RepositoryFactory.get("contest");
export const markContest = (list) => async (dispatch) => {
    try {
      dispatch(markContestLoading(true))
      const { data } = await contest.markContest(list)
      if (data =="success") {
        toast.success("Contest Marked Successfully")
        dispatch(markContestLoading(false))
      } else {
        toast.error("Contest Marked  failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getContestList = (username) => async (dispatch) => {
    try {
      const { data } = await contest.getContestList(username)
      if (data) {
        dispatch({ type: CONTESTLIST, payload: { contestList: data } });
      } else {
        toast.error("Contest load failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getContestSetting = (username) => async (dispatch) => {
    console.log(username)
    try {
      // const { data } = await contest.getContestSetting(username)
      const response = await fetch(
        `https://localhost:44374/api/Teacher/GetContestSetting?teacherId=${username}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: CONTESTDAYS, payload: { contestDays: data } });
      } else {
        alert("Contest Days load failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const setContestSetting = (username,days) => async (dispatch) => {
    try {
      // const { data } = await contest.getContestSetting(username)
      const response = await fetch(
        `https://localhost:44374/api/Teacher/SetContestSetting?teacherId=${username}&days=${days}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        toast.success("Contest Setting Update")
      } else {
        alert("Contest Setting failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const contestAcceptAction = (aid) => async (dispatch) => {
    try {
      dispatch(acceptContestLoading(true))
      const { data } = await contest.contestAccept(aid)
      if (data =="success") {
        toast.success("You Accepted the student Request");
        dispatch(acceptContestLoading(false))
      } else {
        alert("Accept failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const contestRejectAction = (aid) => async (dispatch) => {
    try {
      dispatch(rejectContestLoading(true))
      const { data } = await contest.contestReject(aid)
      if (data =="success") {
        toast.success("You Rejected the student Request");
        dispatch(rejectContestLoading(false))
      } else {
        toast.error("Rejected failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const markContestLoading = (val) => async (dispatch) => {
    dispatch({ type: MARK_CONTEST_LOADING, payload: val });
  };
  export const acceptContestLoading = (val) => async (dispatch) => {
    dispatch({ type: ACCEPT_CONTEST_LOADING, payload: val });
  };
  export const rejectContestLoading = (val) => async (dispatch) => {
    dispatch({ type: REJECT_CONTEST_LOADING, payload: val });
  };