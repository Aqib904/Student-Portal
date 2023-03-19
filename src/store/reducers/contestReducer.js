import { CONTESTLIST } from "../types";
const initialState = {
    contestList:[]
  };
  const contestReducer = (state = initialState, action) => {
    switch(action.type) {
      case CONTESTLIST :
        return {
          ...state,
          contestList: action.payload.contestList,
        };
      default:
        return state;
    }
  };
  
  export default contestReducer;