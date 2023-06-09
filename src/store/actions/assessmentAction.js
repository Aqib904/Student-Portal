import {TEACHERCOURSE,ASSESSMENTQUESTION,ALLTEACHERCOURSES,FEEDBACKTEACHER,TEACHER_LOADING} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
import { toast } from "react-toastify";
var assessment = RepositoryFactory.get("assessment");
export const getCourseTeacher = (regno) => async (dispatch) => {
    try {
      dispatch(teacherLoading(true))
      const {data} = await assessment.getCourseTeacher(regno)
      if (data) {
        dispatch({ type: TEACHERCOURSE, payload: { teacherdata: data } });
        dispatch(teacherLoading(false))
      } else {
        toast.error("DateSheet load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  export const getAssessmentQuestions = (id) => async (dispatch) => {
    try {
      const {data} = await assessment.getAssessmentQuestions(id)
      if (data) {
        dispatch({ type: ASSESSMENTQUESTION, payload: { question: data } });
      } else {
        toast.error("Question load failed");
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
        toast.success("Feedback added Successfully");
        history.push("/student/evaluation")
      } else {
        alert("Feedback added  failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const startNewEvaluation = (list) => async (dispatch) => {
    try {
      const {data} = await assessment.startNewEvaluation(list)
      if (data == "success") {
        toast.success("Evaluation Started Successfully");
      } else {
        toast.error("Evaluation Start  failed")
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
        toast.error("DateSheet load failed");
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
        toast.error("Feedback load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getTeachersIndividualFeedback = (id) => async (dispatch) => {
    try {
      const {data} = await assessment.getTeachersIndividualFeedback(id)
      if (data) {
        dispatch({ type: FEEDBACKTEACHER, payload: { feedback: data } });
      } else {
        toast.error("Feedback load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const teacherLoading = (val) => async (dispatch) => {
    dispatch({ type: TEACHER_LOADING, payload: val });
  };