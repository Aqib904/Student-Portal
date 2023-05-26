import { TEACHER_EVALUATION_LOADING,EVALUATINGTEACHER,EVALUATINGQUESTIONS,PEEREVALUATION} from "../types";
const initialState = {
    loading:false,
    teacherList:[],
    questions:[],
    teacherEvaluation:[],
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
          case PEEREVALUATION:
          return {
            ...state,
            teacherEvaluation: action.payload.teacherEvaluation,
          };
      default:
        return state;
    }
  };
  export default teacherEvaluationReducer;