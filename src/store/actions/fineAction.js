import {FINELIST,FINE_LIST_LOADING,STUDENTSLIST,STUDENT_LIST_LOADING } from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
var fine = RepositoryFactory.get("fine")
export const getFineList= () => async (dispatch) => {
    try {
        dispatch(fineListLoading(true))
      const {data} = await fine.getFineList()
      if (data) {
        dispatch(fineListLoading(false))
        dispatch({ type: FINELIST, payload: { fineList: data } });
      } else {
        console.log("Fine List loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getStudentsList= () => async (dispatch) => {
    try {
        dispatch(studentsListLoading(true))
      const {data} = await fine.getStudentsList()
      if (data) {
        dispatch(studentsListLoading(false))
        dispatch({ type: STUDENTSLIST, payload: { studentsList: data } });
      } else {
        console.log("Student List loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const fineListLoading = (val) => async (dispatch) => {
    dispatch({ type: FINE_LIST_LOADING, payload: val });
  };
  export const studentsListLoading = (val) => async (dispatch) => {
    dispatch({ type: STUDENT_LIST_LOADING, payload: val });
  };