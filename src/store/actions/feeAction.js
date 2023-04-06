import {FEEDETAIL,FEE_LOADING } from "../types";
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
  export const feeLoading = (val) => async (dispatch) => {
    dispatch({ type: FEE_LOADING, payload: val });
  };