import {
  FEEDETAIL,
  FEE_LOADING,
  CHALLAN,
  CHALLAN_LOADING,
  FEESTATUS,
  FEE_STATUS_LOADING,
  UPLOAD_CHALLAN_LOADING,
} from "../types";
const initialState = {
  feeDetail: [],
  challan: null,
  loading: false,
  challanloading: false,
  feeStatus: [],
  feeStatusloading:false,
  uploadloading:false,
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
    case FEESTATUS:
      return {
        ...state,
        feeStatus: action.payload.feeStatus,
      };
      case FEE_STATUS_LOADING:
        return {
          ...state,
          feeStatusloading: action.payload,
        };
        //
        case UPLOAD_CHALLAN_LOADING:
          return {
            ...state,
            uploadloading: action.payload,
          };
    default:
      return state;
  }
};
export default feeReducer;
