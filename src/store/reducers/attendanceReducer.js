import {
  TEACHERCOURSES,
  STUDENTLIST,
  CLEAR_STUDENTLIST,
  STUDENTATTENDANCE,
  ABSENTSLIST,
  ATTENDANCE_PERCENTAGE_LOADING,
  ATTENDANCE_MARK_LOADING
} from "../types";
const initialState = {
  teacherCourses: [],
  attendanceList: [],
  attendancelist: [],
  absentslist: [],
  loading:false,
  markloading:false,
};
const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEACHERCOURSES:
      return {
        ...state,
        teacherCourses: action.payload.teachercourses,
      };
    case STUDENTLIST:
      return {
        ...state,
        attendanceList: action.payload.studentLists,
      };
    case CLEAR_STUDENTLIST:
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
    case ATTENDANCE_PERCENTAGE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
      case ATTENDANCE_MARK_LOADING:
        return {
          ...state,
          markloading: action.payload,
        };
    default:
      return state;
  }
};
export default attendanceReducer;
