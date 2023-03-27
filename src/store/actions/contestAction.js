import {CONTESTLIST,CONTESTDAYS} from "../types";
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
        alert("Contest Setting Update")
      } else {
        alert("Contest Setting failed")
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