import {
    REQUEST_LOADING
  } from "../types";
  const initialState = {
    requestloading:false,
  };
  const feeReducer = (state = initialState, action) => {
    switch (action.type) {
      case REQUEST_LOADING:
        return {
          ...state,
          requestloading: action.payload,
        };
      default:
        return state;
    }
  };
  export default feeReducer;
  