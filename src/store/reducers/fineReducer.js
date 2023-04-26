import { FINELIST ,FINE_LIST_LOADING ,STUDENTSLIST,STUDENT_LIST_LOADING,ADD_FINE_LOADING,ACCEPT_FINE_LOADING,REJECT_FINE_LOADING} from "../types";
const initialState = {
    fineList:[],
    studentsList:[],
    loading:false,
    studentsloading:false,
    addFineloading:false,
    acceptFineloading:false,
    rejectFineloading:false,
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
        case ADD_FINE_LOADING:
          return {
            ...state,
            addFineloading: action.payload,
          };
          case ACCEPT_FINE_LOADING:
          return {
            ...state,
            acceptFineloading: action.payload,
          };
          case REJECT_FINE_LOADING:
          return {
            ...state,
            rejectFineloading: action.payload,
          };
    default:
      return state;
  }
};

export default fineReducer;
