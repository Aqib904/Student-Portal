import { EVALUATIONGENERAL, EVALUATIONEXAM, SESSION,EXAMMARKS} from "../types";
const initialState = {
    general:[],
    exam:[],
    session:[],
    exam:[],
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
        //EXAMMARKS
        case EXAMMARKS:
        return {
          ...state,
          exam: action.payload.examData,
        };
      default:
        return state;
    }
  };
  
  export default evaluationReducer;