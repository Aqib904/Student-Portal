import {TEACHERCOURSE,ASSESSMENTQUESTION,ALLTEACHERCOURSES,FEEDBACKTEACHER} from "../types";
export const getCourseTeacher = (regno) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:44374/api/Student/GetCourseAndTeachers?reg_no=${regno}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: TEACHERCOURSE, payload: { teacherdata: data } });
      } else {
        alert("DateSheet load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getAssessmentQuestions = () => async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:44374/api/Student/GetTeacherEvaluationQuestions`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: ASSESSMENTQUESTION, payload: { question: data } });
      } else {
        alert("Question load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const markEvaluation = (list,history) => async (dispatch) => {
    try {
      const response = await fetch('https://localhost:44374/api/Student/FeedbackTeacher', {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(list),
      })
     const data=response.json();
      if (response.ok) {
        alert("Feedback added Successfully");
        history.push("/student/assessment")
      } else {
        alert("Feedback added  failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getTeachersCourses = (session) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:44374/api/Admin/GetAllTeachersAndCourses?session=${session}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: ALLTEACHERCOURSES, payload: { teacher: data } });
      } else {
        alert("DateSheet load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getTeachersFeedback = (teacherId,courseCode,session) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:44374/api/Admin/GetTeacherFeedback?teacherId=${teacherId}&courseCode=${courseCode}&session=${session}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: FEEDBACKTEACHER, payload: { feedback: data } });
      } else {
        alert("Feedback load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };