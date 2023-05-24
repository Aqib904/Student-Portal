import { TEACHER_EVALUATION_LOADING,EVALUATINGTEACHER,EVALUATINGQUESTIONS} from "../types";
const initialState = {
    loading:false,
    teacherList:[],
    questions:[],
  };
  const teacherEvaluationReducer = (state = initialState, action) => {
    switch(action.type) {
        case TEACHER_EVALUATION_LOADING:
          return {
            ...state,
            loading: action.payload,
          };
          case EVALUATINGTEACHER:
          return {
            ...state,
            teacherList: action.payload.evaluatingTeacherList,
          };
          case EVALUATINGQUESTIONS:
          return {
            ...state,
            questions: action.payload.evaluatingQuestions,
          };
      default:
        return state;
    }
  };
  export default teacherEvaluationReducer;