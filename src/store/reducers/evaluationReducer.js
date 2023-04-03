import { EVALUATIONGENERAL, EVALUATIONEXAM, SESSION,EXAMMARKS,EXAM_RESULT_LOADING} from "../types";
const initialState = {
    general:[],
    exam:[],
    session:[],
    exam:[],
    loading:false,
  };
  const evaluationReducer = (state = initialState, action) => {
    switch(action.type) {
      case EVALUATIONGENERAL:
        return {
          ...state,
          general: action.payload.general,
        };
        case EVALUATIONEXAM:
        return {
          ...state,
          exam: action.payload.exam,
        };
        case SESSION:
        return {
          ...state,
          session: action.payload.session,
        };
        case EXAMMARKS:
        return {
          ...state,
          exam: action.payload.examData,
        };
        case EXAM_RESULT_LOADING:
          return {
            ...state,
            loading: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default evaluationReducer;