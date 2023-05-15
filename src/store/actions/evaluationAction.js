import { EVALUATIONGENERAL, EVALUATIONEXAM,SESSION,EXAMMARKS,EXAM_RESULT_LOADING,MARK_GENERAL_LOADING,MARK_EXAM_LOADING } from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
import { toast } from "react-toastify";
var evaluation = RepositoryFactory.get("evaluation")
export const markGeneralExam = (list) => async (dispatch) => {
    try {
      dispatch(markGeneralLoading(true))
      const {data} = await evaluation.markGeneralExam(list)
      if (data == "success") {
        toast.success(" Marked Successfully")
        dispatch(markGeneralLoading(false))
      } else {
        alert(" Marked  failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const markMidFinal = (list) => async (dispatch) => {
    try {
      dispatch(markExamLoading(true))
      const {data} = await evaluation.markMidFinal(list)
      if (data =="success") {
        toast.success("Marked Successfully")
        dispatch(markExamLoading(false))
      } else {
        toast.error("Marked failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const AssignmentQuizEvaluation = (regno) => async (dispatch) => {
    try {
      const {data} = await evaluation.AssignmentQuizEvaluation(regno)
      if (data) {
        dispatch({ type: EVALUATIONGENERAL, payload: { general: data } });
      } else {
        toast.error("Assignment Quiz marks loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const ExamMarksEvaluation = (regno) => async (dispatch) => {
    try {
      const {data} = await evaluation.ExamMarksEvaluation(regno) 
      if (data) {
        dispatch({ type: EVALUATIONEXAM, payload: { exam: data } });
      } else {
        alert("Exam marks loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getSession = (regno) => async (dispatch) => {
    try {
      const {data} = await evaluation.getSession(regno)
      if (data) {
        dispatch({ type: SESSION, payload: { session: data } });
      } else {
        toast.error("Session loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getExamMarks = (regno,session) => async (dispatch) => {
    try {
      dispatch(examResultLoading(true))
      const {data} = await evaluation.getExamMarks(regno,session)
      if (data) {
        dispatch({ type: EXAMMARKS, payload: { examData: data } });
        dispatch(examResultLoading(false))
      } else {
        alert("Marks loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const examResultLoading = (val) => async (dispatch) => {
    dispatch({ type: EXAM_RESULT_LOADING, payload: val });
  };
  export const markGeneralLoading = (val) => async (dispatch) => {
    dispatch({ type: MARK_GENERAL_LOADING, payload: val });
  };
  export const markExamLoading = (val) => async (dispatch) => {
    dispatch({ type: MARK_EXAM_LOADING, payload: val });
  };
  