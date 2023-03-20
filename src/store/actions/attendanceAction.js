import {TEACHERCOURSES,STUDENTLIST ,CLEAR_STUDENTLIST,STUDENTATTENDANCE} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
var attendance = RepositoryFactory.get("attendance");
export const getTeacherCourses = (username) => async (dispatch) => {
    try {
      const {data} = await attendance.getTeacherCourses(username)
      if (data) {
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
      const {data} = await attendance.getStudentsList(id,section)
      if (data) {
        dispatch({ type: STUDENTLIST, payload: { studentLists: data } });
      } else {
        alert("list load failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const markAttendance = (list,history) => async (dispatch) => {
    try {
      const {data} = await attendance.markAttendance(list)
      if (data =="Attendzance Mark") {
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
      const {data} = await attendance.getStudentAttendaceList(regno)
      if (data) {
        dispatch({ type: STUDENTATTENDANCE, payload: { studentattendance: data } });
      } else {
        alert("Timetable load failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };