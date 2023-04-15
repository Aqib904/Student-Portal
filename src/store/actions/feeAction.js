import {FEEDETAIL,FEE_LOADING,CHALLAN,CHALLAN_LOADING,FEESTATUS,FEE_STATUS_LOADING,UPLOAD_CHALLAN_LOADING } from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
var fee = RepositoryFactory.get("fee")
export const getFeeDetail = (regno) => async (dispatch) => {
    try {
        dispatch(feeLoading(true))
      const {data} = await fee.getFeeDetail(regno)
      if (data) {
        dispatch(feeLoading(false))
        dispatch({ type: FEEDETAIL, payload: { feeDetail: data } });
      } else {
        alert("Fee Detail loaded failed");
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
          pathname: `/student/fee`
        })
        dispatch(challanLoading(false))
      } else {
        alert("Challan loaded failed");
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
        alert("Challan loaded failed");
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
        alert("Fee Status loaded failed");
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
        alert("Challan Uploaded Successfully");
        dispatch(uploadChallanLoading(false))
      } else {
        alert("Challan uploaded  failed");
      }
    } catch (error) {
      alert(error.message);
    }
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