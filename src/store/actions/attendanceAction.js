import {
  TEACHERCOURSES,
  STUDENTLIST,
  CLEAR_STUDENTLIST,
  STUDENTATTENDANCE,
  ABSENTSLIST,
  ATTENDANCE_PERCENTAGE_LOADING,
} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
var attendance = RepositoryFactory.get("attendance");
export const getTeacherCourses = (username) => async (dispatch) => {
  try {
    const { data } = await attendance.getTeacherCourses(username);
    if (data) {
      dispatch({ type: TEACHERCOURSES, payload: { teachercourses: data } });
    } else {
      alert("Timetable load failed");
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
  }
};
export const getStudentsList = (id, section) => async (dispatch) => {
  try {
    const { data } = await attendance.getStudentsList(id, section);
    if (data) {
      dispatch({ type: STUDENTLIST, payload: { studentLists: data } });
    } else {
      alert("list load failed");
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
  }
};
export const getAbsentsList = (enrollmentId) => async (dispatch) => {
  console.log(enrollmentId,'enrollmentIdAction');
  try {
    const response = await fetch(`https://localhost:44374/api/Student/GetAbsentList?eid=${enrollmentId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: ABSENTSLIST, payload: { absentLists: data } });
    } else {
      alert("list load failed");
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
  }
};
export const markAttendance =
  (list, allocationId, fileList, history) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("attendances", JSON.stringify(list));
      formData.append("allocationId", allocationId);
      fileList.forEach((item) => {       
          formData.append(`${item.name}`, item.originFileObj);
      });
      console.log("FormData:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const response = await fetch(
        "https://localhost:44374/api/Teacher/MarkAttendance",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        alert("Attendance Marked Successfully");
        dispatch(ClearStudentList());
        history.push("/teacher/dashboard");
      } else {
        alert("Attendance Marked  failed");
      }
    } catch (error) {
      alert(error.message);
    }
    // try {
    //   const formData = new FormData();
    //   formData.append("attendances", JSON.stringify(list));
    //   formData.append("allocationId", allocationId);
    //   formData.append("dateTime", dateTime);
    //   fileList.map((item)=>{
    //     console.log(item.originFileObj,'originFileObj')
    //     return(
    //       formData.append("gallery", item.originFileObj)
    //     )
    //   })
    //   const {data} = await attendance.markAttendance(formData)
    //   if (data =="Attendzance Mark") {
    //     alert("Attendance Marked Successfully")
    //     dispatch(ClearStudentList())
    //     history.push("/teacher/dashboard")
    //   } else {
    //     alert("Attendance Marked  failed")
    //   }
    // } catch (error) {
    //   alert(error.message);
    // }
  };
export const ClearStudentList = () => async (dispatch) => {
  dispatch({ type: CLEAR_STUDENTLIST, payload: [] });
};
export const getStudentAttendaceList = (regno) => async (dispatch) => {
  try {
    dispatch(attendancePercentageLoading(true))
    const { data } = await attendance.getStudentAttendaceList(regno);
    if (data) {
      dispatch({
        type: STUDENTATTENDANCE,
        payload: { studentattendance: data },
      });
    dispatch(attendancePercentageLoading(false))
    } else {
      alert("Timetable load failed");
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
  }
};
export const attendancePercentageLoading = (val) => async (dispatch) => {
  dispatch({ type: ATTENDANCE_PERCENTAGE_LOADING, payload: val });
};
