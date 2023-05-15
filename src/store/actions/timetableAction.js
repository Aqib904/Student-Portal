import { TIMETABLE, TIMETABLE_LOADING } from "../types";
import { toast } from "react-toastify";
export const getWeeklyTimetable = (regno) => async (dispatch) => {
  try {
    dispatch(timetaleLoading(true));
    const response = await fetch(
      `https://localhost:44374/api/Student/GetTimeTable?reg_no=${regno}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch(timetaleLoading(false));
      dispatch({ type: TIMETABLE, payload: { timetable: data } });
    } else {
      alert("Timetable load failed");
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
  }
};
export const addTimetable = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("timetablefile", file);
    const response = await fetch(
      "https://localhost:44374/api/Admin/AddTimeTable",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      toast.success("Timetable Uploaded Successfully");
    } else {
      toast.error("Timetable uploaded  failed");
    }
  } catch (error) {
    alert(error.message);
  }
};
export const timetaleLoading = (val) => async (dispatch) => {
  dispatch({ type: TIMETABLE_LOADING, payload: val });
};
