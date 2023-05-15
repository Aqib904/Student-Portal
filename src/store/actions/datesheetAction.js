import { DATESHEET ,DATESHEET_LOADING} from "../types";
import { toast } from "react-toastify";
export const getDatesheet = (regno) => async (dispatch) => {
  try {
    dispatch(datesheetLoading(true))
    const response = await fetch(
      `https://localhost:44374/api/Student/GetDateSheet?reg_no=${regno}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: DATESHEET, payload: { datesheet: data } });
      dispatch(datesheetLoading(false))
    } else {
      toast.error("DateSheet load failed");
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
  }
};
export const addDatesheet = (file, type) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("datesheetfile", file);
    formData.append("type", type);
    const response = await fetch(
      "https://localhost:44374/api/Admin/AddDateSheet",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      toast.success("Datesheet Uploaded Successfully");
    } else {
      toast.error("Datesheet uploaded  failed");
    }
  } catch (error) {
    alert(error.message);
  }
};
export const addCourseAllocation = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("courseallocationfile", file);
    const response = await fetch(
      "https://localhost:44374/api/Admin/AddCourseAllocation",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      toast.success("Courses Uploaded Successfully");
    } else {
      toast.error("Courses uploaded  failed");
    }
  } catch (error) {
    alert(error.message);
  }
};
export const datesheetLoading = (val) => async (dispatch) => {
  dispatch({ type: DATESHEET_LOADING, payload: val });
};
