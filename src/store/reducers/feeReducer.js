import { FEEDETAIL, FEE_LOADING, CHALLAN, CHALLAN_LOADING } from "../types";
const initialState = {
  feeDetail: [],
  challan: null,
  loading: false,
  challanloading: false,
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
    case CHALLAN:
      return {
        ...state,
        challan: action.payload.challan,
      };
    case CHALLAN_LOADING:
      return {
        ...state,
        challanloading: action.payload,
      };
    default:
      return state;
  }
};
export default feeReducer;
