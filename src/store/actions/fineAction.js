import {FINELIST,FINE_LIST_LOADING,STUDENTSLIST,STUDENT_LIST_LOADING,ADD_FINE_LOADING,ACCEPT_FINE_LOADING,REJECT_FINE_LOADING,STUDENTFINE} from "../types";
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
  export const getStudentFine= (reg_no) => async (dispatch) => {
    try {
        dispatch(fineListLoading(true))
      const {data} = await fine.getStudentFine(reg_no)
      if (data) {
        dispatch(fineListLoading(false))
        dispatch({ type: STUDENTFINE, payload: { studentFine: data } });
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
  export const addFine = (list) => async (dispatch) => {
    try {
      dispatch(addFineLoading(true))
      const {data} = await fine.addFine(list)
      if (data == "success") {
        alert("Fine added Successfully");
        dispatch(addFineLoading(false))
      } else {
        console.log("Fine added  failed")
        dispatch(addFineLoading(false))
      }
    } catch (error) {
      console.log(error.message);
      dispatch(addFineLoading(false))
    }
  };
  export const fineAcceptAction = (id,history) => async (dispatch) => {
    try {
      dispatch(acceptFineLoading(true))
      const { data } = await fine.fineAccept(id)
      if (data =="success") {
        alert("You Accepted the student Fine Request");
        history.push("/admin/finelist")
        dispatch(acceptFineLoading(false))
        
      } else {
        alert("Accept failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const fineRejectAction = (id,history) => async (dispatch) => {
    try {
      dispatch(rejectFineLoading(true))
      const { data } = await fine.fineReject(id)
      if (data =="success") {
        alert("You Rejected the student Fine Request");
        history.push("/admin/finelist")
        dispatch(rejectFineLoading(false))
       
      } else {
        alert("Rejected failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const fineListLoading = (val) => async (dispatch) => {
    dispatch({ type: FINE_LIST_LOADING, payload: val });
  };
  export const addFineLoading = (val) => async (dispatch) => {
    dispatch({ type: ADD_FINE_LOADING, payload: val });
  };
  export const studentsListLoading = (val) => async (dispatch) => {
    dispatch({ type: STUDENT_LIST_LOADING, payload: val });
  };
  export const acceptFineLoading = (val) => async (dispatch) => {
    dispatch({ type: ACCEPT_FINE_LOADING, payload: val });
  };
  export const rejectFineLoading = (val) => async (dispatch) => {
    dispatch({ type: REJECT_FINE_LOADING, payload: val });
  };