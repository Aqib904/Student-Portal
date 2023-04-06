import {
    FEEDETAIL,
    FEE_LOADING
  } from "../types";
  const initialState = {
    feeDetail: [],
  };
  const feeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FEEDETAIL:
        return {
          ...state,
          feeDetail: action.payload.feeDetail,
        };
        case FEE_LOADING:
            return {
              ...state,
              loading: action.payload,
            };
      default:
        return state;
    }
  };
  export default feeReducer;
  