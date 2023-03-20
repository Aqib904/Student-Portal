import { EVALUATIONGENERAL, EVALUATIONEXAM,SESSION,EXAMMARKS } from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
var evaluation = RepositoryFactory.get("evaluation")
export const markGeneralExam = (list) => async (dispatch) => {
    try {
      const {data} = await evaluation.markGeneralExam(list)
      if (data == "success") {
        alert(" Marked Successfully")
      } else {
        alert(" Marked  failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const markMidFinal = (list) => async (dispatch) => {
    try {
      const {data} = await evaluation.markMidFinal(list)
      if (data =="success") {
        alert("Marked Successfully")
      } else {
        alert("Marked failed")
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
        alert("DateSheet load failed");
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
        alert("DateSheet load failed");
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
        alert("Session load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getExamMarks = (regno,session) => async (dispatch) => {
    try {
      const {data} = await evaluation.getExamMarks(regno,session)
      if (data) {
        dispatch({ type: EXAMMARKS, payload: { examData: data } });
      } else {
        alert("Marks loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };