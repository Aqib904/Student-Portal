import {
  FEEDETAIL,
  FEE_LOADING,
  CHALLAN,
  CHALLAN_LOADING,
  FEESTATUS,
  FEE_STATUS_LOADING,
  UPLOAD_CHALLAN_LOADING,
  STUDENTS,
  APPROVE_LOADING,
  REJECT_LOADING,
  INSTALLMENTSREQUESTS
} from "../types";
const initialState = {
  feeDetail: [],
  installmentRequests:[],
  challan: null,
  students: [],
  loading: false,
  challanloading: false,
  feeStatus: [],
  feeStatusloading: false,
  uploadloading: false,
  approveloading:false,
  rejectloading:false,
};
const feeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDETAIL:
      return {
        ...state,
        feeDetail: action.payload.feeDetail,
      };
      case INSTALLMENTSREQUESTS:
      return {
        ...state,
        installmentRequests: action.payload.installmentRequests,
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
    case STUDENTS:
      return {
        ...state,
        students: action.payload.students,
      };
    case FEE_STATUS_LOADING:
      return {
        ...state,
        feeStatusloading: action.payload,
      };
    case UPLOAD_CHALLAN_LOADING:
      return {
        ...state,
        uploadloading: action.payload,
      };
      case  APPROVE_LOADING:
        return {
          ...state,
          approveloading: action.payload,
        };
        case  REJECT_LOADING:
          return {
            ...state,
            rejectloading: action.payload,
          };
    default:
      return state;
  }
};
export default feeReducer;
