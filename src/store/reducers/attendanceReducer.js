import { TEACHERCOURSES,STUDENTLIST ,CLEAR_STUDENTLIST,STUDENTATTENDANCE,ABSENTSLIST} from "../types";
const initialState = {
    teacherCourses:[],
    attendanceList:[],
    attendancelist:[],
    absentslist:[],
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
        //ABSENTSLIST
        case ABSENTSLIST:
          return {
              ...state,
            absentslist: action.payload.absentLists,
          };
      default:
        return state;
    }
  };
  
  export default attendanceReducer;