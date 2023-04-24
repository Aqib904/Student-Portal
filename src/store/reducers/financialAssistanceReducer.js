import {
    REQUEST_LOADING,
    ASSISTANCEREQUESTS,
    GET_REQUEST_LOADING,
    ASSISTANCEREQUESTSIMAGES,
    ACCEPT_REQUEST_LOADING,
    REJECT_REQUEST_LOADING
  } from "../types";
  const initialState = {
    requestloading:false,
    getRequestloading:false,
    acceptloading:false,
    rejectloading:false,
    requestList:[],
    requestImages:[],
  };
  const financialAssistanceReducer = (state = initialState, action) => {
    switch (action.type) {
      case REQUEST_LOADING:
        return {
          ...state,
          requestloading: action.payload,
        };
        case ASSISTANCEREQUESTS:
          return {
            ...state,
            requestList: action.payload.assistanceRequestList,
          };
          case ASSISTANCEREQUESTSIMAGES:
          return {
            ...state,
            requestImages: action.payload.assistanceRequestImages,
          };
          case GET_REQUEST_LOADING:
        return {
          ...state,
          getRequestloading: action.payload,
        };
        case ACCEPT_REQUEST_LOADING:
        return {
          ...state,
          acceptloading: action.payload,
        };
        case REJECT_REQUEST_LOADING:
        return {
          ...state,
          rejectloading: action.payload,
        };
      default:
        return state;
    }
  };
  export default financialAssistanceReducer;
  