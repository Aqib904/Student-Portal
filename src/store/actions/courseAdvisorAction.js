import { toast } from "react-toastify";
import { COURSE_ADVISOR__LOADING} from "../types";
export const addCourseAdvisor = (file,onSuccess) => async (dispatch) => {
    try {
      dispatch(courseAdvisorLoading(true))
      const formData = new FormData();
      formData.append("courseadvisorsfile", file);
      const response = await fetch(
        "https://localhost:44374/api/Admin/AddCourseAdvisors",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Course Advisor added successfully");
        dispatch(courseAdvisorLoading(false))
        onSuccess()
      } else {
        toast.error("Course Advisor added  failed");
        dispatch(courseAdvisorLoading(false))
      }
    } catch (error) {
      alert(error.message);
      dispatch(courseAdvisorLoading(false))
    }
  };
  export const courseAdvisorLoading = (val) => async (dispatch) => {
    dispatch({ type: COURSE_ADVISOR__LOADING, payload: val });
  };