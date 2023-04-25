import { FINELIST ,FINE_LIST_LOADING ,STUDENTSLIST,STUDENT_LIST_LOADING} from "../types";
const initialState = {
    fineList:[],
    studentsList:[],
    loading:false,
    studentsloading:false,
};
const fineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINELIST:
      return {
        ...state,
        fineList: action.payload.fineList,
      };
      case STUDENTSLIST:
      return {
        ...state,
        studentsList: action.payload.studentsList,
      };
      case FINE_LIST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
      case STUDENT_LIST_LOADING:
        return {
          ...state,
          studentsloading: action.payload,
        };
    default:
      return state;
  }
};

export default fineReducer;
