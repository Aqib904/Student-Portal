import {CONTESTLIST} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
var contest = RepositoryFactory.get("contest");
export const markContest = (list) => async (dispatch) => {
    try {
      const { data } = await contest.markContest(list)
      if (data =="success") {
        alert("Contest Marked Successfully")
      } else {
        alert("Contest Marked  failed")
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
        alert("Contest load failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const contestAcceptAction = (aid) => async (dispatch) => {
    try {
      const { data } = await contest.contestAccept(aid)
      if (data =="success") {
        alert("You Accepted the student Request");
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
      const { data } = await contest.contestReject(aid)
      if (data =="success") {
        alert("You Rejected the student Request");
      } else {
        alert("Rejected failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };