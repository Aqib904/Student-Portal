import { DATESHEET,DATESHEET_LOADING } from "../types";
const initialState = {
    datesheet:[],
    loading:false,
  };
  const datesheetReducer = (state = initialState, action) => {
    switch(action.type) {
      case DATESHEET :
        return {
          ...state,
          datesheet: action.payload.datesheet,
        };
        case DATESHEET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default datesheetReducer;