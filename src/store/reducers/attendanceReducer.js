import { TEACHERCOURSES,STUDENTLIST ,CLEAR_STUDENTLIST,STUDENTATTENDANCE} from "../types";
const initialState = {
    teacherCourses:[],
    attendanceList:[],
    attendancelist:[],
  };
  const attendanceReducer = (state = initialState, action) => {
    switch(action.type) {
      case TEACHERCOURSES :
        return {
            ...state,
          teacherCourses: action.payload.teachercourses,
        };
        case STUDENTLIST :
        return {
            ...state,
          attendanceList: action.payload.studentLists,
        };
        case CLEAR_STUDENTLIST :
          return {
              ...state,
            attendanceList: action.payload,
          };
          case STUDENTATTENDANCE:
        return {
            ...state,
          attendancelist: action.payload.studentattendance,
        };
      default:
        return state;
    }
  };
  
  export default attendanceReducer;