import { DATESHEET ,DATESHEET_LOADING} from "../types";
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
      alert("DateSheet load failed");
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
      alert("Datesheet Uploaded Successfully");
    } else {
      alert("Datesheet uploaded  failed");
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
      alert("Courses Uploaded Successfully");
    } else {
      alert("Courses uploaded  failed");
    }
  } catch (error) {
    alert(error.message);
  }
};
export const datesheetLoading = (val) => async (dispatch) => {
  dispatch({ type: DATESHEET_LOADING, payload: val });
};
