import { TEACHERCOURSE ,ASSESSMENTQUESTION,ALLTEACHERCOURSES,FEEDBACKTEACHER,TEACHER_LOADING} from "../types";
const initialState = {
    teachersData:[],
    questions:[],
    feedback:[],
    loading:false,
  };
  const assessmentReducer = (state = initialState, action) => {
    switch(action.type) {
      case TEACHERCOURSE :
        return {
          ...state,
          teachersData: action.payload.teacherdata,
        };
        case ASSESSMENTQUESTION:
        return {
          ...state,
          questions: action.payload.question,
        };
        case ALLTEACHERCOURSES:
        return {
          ...state,
          allTeachers: action.payload.teacher,
        };
        case FEEDBACKTEACHER:
        return {
          ...state,
          feedback: action.payload.feedback,
        };
        case TEACHER_LOADING:
          return {
            ...state,
            loading: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default assessmentReducer;