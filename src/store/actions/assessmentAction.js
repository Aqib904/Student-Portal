import {TEACHERCOURSE,ASSESSMENTQUESTION,ALLTEACHERCOURSES,FEEDBACKTEACHER} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
var assessment = RepositoryFactory.get("assessment");
export const getCourseTeacher = (regno) => async (dispatch) => {
    try {
      const {data} = await assessment.getCourseTeacher(regno)
      if (data) {
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
      const {data} = await assessment.getAssessmentQuestions()
      if (data) {
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
      const {data} = await assessment.markEvaluation(list)
      if (data == "success") {
        alert("Feedback added Successfully");
        history.push("/student/evaluation")
      } else {
        alert("Feedback added  failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getTeachersCourses = (session) => async (dispatch) => {
    try {
      const {data} = await assessment.getTeachersCourses(session)
      if (data) {
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
      const {data} = await assessment.getTeachersFeedback(teacherId,courseCode,session)
      if (data) {
        dispatch({ type: FEEDBACKTEACHER, payload: { feedback: data } });
      } else {
        alert("Feedback load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };