import { CONTESTLIST,CONTESTDAYS } from "../types";
const initialState = {
    contestList:[],
    contestDay:null
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
      default:
        return state;
    }
  };
  
  export default contestReducer;