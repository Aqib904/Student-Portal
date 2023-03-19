import {CONTESTLIST} from "../types";
export const markContest = (list) => async (dispatch) => {
    try {
      const response = await fetch('https://localhost:44374/api/Student/ContestAttendance', {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(list),
      })
     const data=response.json();
      if (response.ok) {
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
      const response = await fetch(`https://localhost:44374/api/Teacher/GetContests?username=${username}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
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
      const response = await fetch(
        `https://localhost:44374/api/Teacher/AcceptContest?aid=${aid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      
      alert("You Accepted the student Request");
    } catch (error) {
      alert(error.message);
    }
  };
  export const contestRejectAction = (aid) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:44374/api/Teacher/RejectContest?aid=${aid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
     
      alert("You Rejected the student Request");
    } catch (error) {
      alert(error.message);
    }
  };