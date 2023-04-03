import { CONTESTLIST,CONTESTDAYS,MARK_CONTEST_LOADING,ACCEPT_CONTEST_LOADING,REJECT_CONTEST_LOADING } from "../types";
const initialState = {
    contestList:[],
    contestDay:null,
    loading:false,
    acceptLoading:false,
    rejectLoading:false,
  };
  const contestReducer = (state = initialState, action) => {
    switch(action.type) {
      case CONTESTLIST :
        return {
          ...state,
          contestList: action.payload.contestList,
        };
      case CONTESTDAYS :
        return {
          ...state,
          contestDay: action.payload.contestDays,
        };
        case MARK_CONTEST_LOADING:
          return {
            ...state,
            loading: action.payload,
          };
          case ACCEPT_CONTEST_LOADING:
          return {
            ...state,
            acceptLoading: action.payload,
          };
          case REJECT_CONTEST_LOADING:
          return {
            ...state,
           rejectLoading: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default contestReducer;