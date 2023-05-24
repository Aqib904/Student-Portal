import { toast } from "react-toastify";
import { COURSE_ADVISOR__LOADING,STUDENTCOURSEADVISOR,ADVICES} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
var courseAdvisor = RepositoryFactory.get("courseAdvisor");
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
  export const getStudentCourseAdvisor = (teacher_id) => async (dispatch) => {
    try {
      dispatch(courseAdvisorLoading(true))
      const { data } = await courseAdvisor.studentCourseAdvisor(teacher_id)
      if (data) {
        dispatch({ type: STUDENTCOURSEADVISOR, payload: { courseAdvisorList: data } });
        dispatch(courseAdvisorLoading(false))
      } else {
        toast.error("Contest load failed")
        dispatch(courseAdvisorLoading(false))
        throw new Error(data.error); 
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const addAdvisorDetailAction = (detail,onSuccess) => async (dispatch) => {
    try {
      dispatch(courseAdvisorLoading(true))
      const { data } = await courseAdvisor.addAdvisorDetail(detail)
      if (data =="Added") {
        toast.success("Advise added successfully");
        dispatch(courseAdvisorLoading(false))
        onSuccess()
      } else {
        alert("Advise failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getAdvices = (reg_no) => async (dispatch) => {
    try {
      dispatch(courseAdvisorLoading(true))
      const { data } = await courseAdvisor.getAdvices(reg_no)
      if (data) {
        dispatch({ type: ADVICES, payload: { advicesList: data } });
        dispatch(courseAdvisorLoading(false))
      } else {
        toast.error("Advices loaded failed")
        dispatch(courseAdvisorLoading(false))
        throw new Error(data.error); 
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const courseAdvisorLoading = (val) => async (dispatch) => {
    dispatch({ type: COURSE_ADVISOR__LOADING, payload: val });
  };