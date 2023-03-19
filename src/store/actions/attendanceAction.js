import {TEACHERCOURSES,STUDENTLIST ,CLEAR_STUDENTLIST,STUDENTATTENDANCE} from "../types";
export const getTeacherCourses = (username) => async (dispatch) => {
    try {
      const response = await fetch(`https://localhost:44374/api/Teacher/GetCourses?username=${username}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: TEACHERCOURSES, payload: { teachercourses: data } });
      } else {
        alert("Timetable load failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getStudentsList = (id,section) => async (dispatch) => {
    try {
      const response = await fetch(`https://localhost:44374/api/Teacher/GetStudents?id=${id}&section=${section}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: STUDENTLIST, payload: { studentLists: data } });
      } else {
        alert("Timetable load failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const markAttendance = (list,history) => async (dispatch) => {
    try {
      const response = await fetch('https://localhost:44374/api/Teacher/MarkAttendence', {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(list),
      })
     const data=response.json();
      if (response.ok) {
        alert("Attendance Marked Successfully")
        dispatch(ClearStudentList())
        history.push("/teacher/dashboard")
      } else {
        alert("Attendance Marked  failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const ClearStudentList = () => async (dispatch) => {
    dispatch({ type: CLEAR_STUDENTLIST, payload: [] });
  };
  export const getStudentAttendaceList = (regno) => async (dispatch) => {
    try {
      const response = await fetch(`https://localhost:44374/api/Student/GetAttendance?reg_no=${regno}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: STUDENTATTENDANCE, payload: { studentattendance: data } });
      } else {
        alert("Timetable load failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };