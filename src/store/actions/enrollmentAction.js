import { ENROLLMENT } from "../types";
import { toast } from "react-toastify";
export const getEnrollment = (regno) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:44374/api/Student/GetEnrollmentCourses?reg_no=${regno}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: ENROLLMENT, payload: { enrollment: data } });
      } else {
        toast.error("Enrollment load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const AddEnrollment= (list,history) => async (dispatch) => {
    try {
      const response = await fetch('https://localhost:44374/api/Student/EnrollCourses', {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(list),
      })
     response.json();
      if (response.ok) {
        toast.success("Enroll Successfully")
        history.push("/")
      } else {
        toast.error("Enrollment failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };