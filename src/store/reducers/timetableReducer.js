import {TIMETABLE, TIMETABLE_LOADING} from "../types";
const initialState = {
    todayTimetable:[],
    loading:false,
  };
  const timetableReducer = (state = initialState, action) => {
    switch(action.type) {
      case TIMETABLE:
        return {
          ...state,
          timetable: action.payload.timetable,
        };
        case TIMETABLE_LOADING:
          return {
            ...state,
            loading: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default timetableReducer;