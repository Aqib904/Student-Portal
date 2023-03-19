import { DATESHEET } from "../types";
const initialState = {
    datesheet:[]
  };
  const datesheetReducer = (state = initialState, action) => {
    switch(action.type) {
      case DATESHEET :
        return {
          ...state,
          datesheet: action.payload.datesheet,
        };
      default:
        return state;
    }
  };
  
  export default datesheetReducer;