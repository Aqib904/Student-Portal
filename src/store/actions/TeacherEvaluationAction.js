import { toast } from "react-toastify";
import { TEACHER_EVALUATION_LOADING,EVALUATINGTEACHER,EVALUATINGQUESTIONS} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
var teacherEvaluation = RepositoryFactory.get("teacherEvaluation");
export const addTecaherEvaluation= (file,onSuccess) => async (dispatch) => {
    try {
      dispatch(teacherEvaluationLoading(true))
      const formData = new FormData();
      formData.append("peerevaluationfile", file);
      const response = await fetch(
        "https://localhost:44374/api/Admin/AddPeerEvaluationTeachers",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Peer Evaluation file added successfully");
        dispatch(teacherEvaluationLoading(false))
        onSuccess()
      } else {
        toast.error("Peer Evaluation file added  failed");
        dispatch(teacherEvaluationLoading(false))
      }
    } catch (error) {
      alert(error.message);
      dispatch(teacherEvaluationLoading(false))
    }
  };
  export const getEvaluatingTeacher = (teacher_id) => async (dispatch) => {
    try {
      dispatch(teacherEvaluationLoading(true))
      const { data } = await teacherEvaluation.getEvaluatingTeacher(teacher_id)
      if (data) {
        dispatch({ type: EVALUATINGTEACHER, payload: { evaluatingTeacherList: data } });
        dispatch(teacherEvaluationLoading(false))
      } else {
        toast.error("Evaluating teacher loaded failed")
        dispatch(teacherEvaluationLoading(false))
        throw new Error(data.error); 
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getPeerEvaluationQuestions = () => async (dispatch) => {
    try {
      dispatch(teacherEvaluationLoading(true))
      const { data } = await teacherEvaluation.getTeacherQuestions()
      if (data) {
        dispatch({ type: EVALUATINGQUESTIONS, payload: { evaluatingQuestions: data } });
        dispatch(teacherEvaluationLoading(false))
      } else {
        toast.error("Evaluating questions loaded failed")
        dispatch(teacherEvaluationLoading(false))
        throw new Error(data.error); 
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const evaluatePeerTeacher = (list,onSuccess) => async (dispatch) => {
    try {
        dispatch(teacherEvaluationLoading(true))
      const {data} = await teacherEvaluation.evaluatePeerTeacher(list)
      if (data == "success") {
        dispatch(teacherEvaluationLoading(false))
        toast.success("Evaluate Successfully");
        onSuccess()
      } else {
        alert("Evaluation failed")
        dispatch(teacherEvaluationLoading(false))
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const teacherEvaluationLoading = (val) => async (dispatch) => {
    dispatch({ type: TEACHER_EVALUATION_LOADING, payload: val });
  };