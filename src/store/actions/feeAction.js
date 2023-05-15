import {FEEDETAIL,FEE_LOADING,CHALLAN,CHALLAN_LOADING,FEESTATUS,FEE_STATUS_LOADING,UPLOAD_CHALLAN_LOADING,STUDENTS,APPROVE_LOADING,REJECT_LOADING } from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
import { toast } from "react-toastify";
var fee = RepositoryFactory.get("fee")
export const getFeeDetail = (regno) => async (dispatch) => {
    try {
        dispatch(feeLoading(true))
      const {data} = await fee.getFeeDetail(regno)
      if (data) {
        dispatch(feeLoading(false))
        dispatch({ type: FEEDETAIL, payload: { feeDetail: data } });
      } else {
        toast.error("Fee Detail loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const generateChallan = (list,history) => async (dispatch) => {
    try {
      dispatch(challanLoading(true))
      const {data} = await fee.generateChallan(list)
      if (data) {
        // dispatch({ type: CHALLAN, payload: { challan: data } });
        window.open(`https://localhost:44374/ChallanFiles/${data}`, '_blank');
        history.push({
          pathname: `/student/fee_detail`
        })
        dispatch(challanLoading(false))
      } else {
        toast.error("Challan loaded failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getChallan = (regno) => async (dispatch) => {
    console.log(regno)
    try {
      const {data} = await fee.getChallan(regno)
      if (data) {
        window.open(`https://localhost:44374/ChallanFiles/${data}`, '_blank');
      } else {
        toast.error("Challan loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getFeeStatus = (regno) => async (dispatch) => {
    try {
      dispatch(feeStatusLoading(true))
      const {data} = await fee.getFeeStatus(regno)
      if (data) {
        dispatch({ type: FEESTATUS, payload: { feeStatus: data } });
        dispatch(feeStatusLoading(false))
      } else {
        toast.error("Fee Status loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const uploadChallan = (file,id) => async (dispatch) => {
    try {
      dispatch(uploadChallanLoading(true))
      const formData = new FormData();
      formData.append("challan", file);
      formData.append("id", id);
      const response = await fetch(
        "https://localhost:44374/api/Student/UploadChallan",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Challan Uploaded Successfully");
        dispatch(uploadChallanLoading(false))
      } else {
        toast.error("Challan uploaded  failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getStudent = () => async (dispatch) => {
    try {
      const {data} = await fee.getStudent()
      if (data) {
        dispatch({ type: STUDENTS, payload: { students: data } });
      } else {
        alert("Students loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const approveFeeStatus = (challanId) => async (dispatch) => {
    try {
      dispatch(approveLoading(true))
      const {data} = await fee.approveFeeStatus(challanId)
      if (data=="success") {
        toast.success("Status approved successfully")
        dispatch(approveLoading(false))
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const rejectFeeStatus = (challanId) => async (dispatch) => {
    try {
      dispatch(rejectLoading(true))
      const {data} = await fee.rejectFeeStatus(challanId)
      if (data=="success") {
        toast.success("Status reject successfully")
        dispatch(rejectLoading(false))
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const approveLoading = (val) => async (dispatch) => {
    dispatch({ type: APPROVE_LOADING, payload: val });
  };
  export const rejectLoading = (val) => async (dispatch) => {
    dispatch({ type: REJECT_LOADING, payload: val });
  };
  export const feeLoading = (val) => async (dispatch) => {
    dispatch({ type: FEE_LOADING, payload: val });
  };
  export const feeStatusLoading = (val) => async (dispatch) => {
    dispatch({ type: FEE_STATUS_LOADING, payload: val });
  };
  export const challanLoading = (val) => async (dispatch) => {
    dispatch({ type: CHALLAN_LOADING, payload: val });
  };
  export const uploadChallanLoading = (val) => async (dispatch) => {
    dispatch({ type: UPLOAD_CHALLAN_LOADING, payload: val });
  };