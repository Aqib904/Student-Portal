import { COURSE_ADVISOR__LOADING ,STUDENTCOURSEADVISOR,ADVICES} from "../types";
const initialState = {
    loading:false,
    courseAdvisorList:[],
    advicesList:[]
  };
  const courseAdvisorReducer = (state = initialState, action) => {
    switch(action.type) {
        case COURSE_ADVISOR__LOADING:
          return {
            ...state,
            loading: action.payload,
          };
          case STUDENTCOURSEADVISOR:
          return {
            ...state,
            courseAdvisorList: action.payload.courseAdvisorList,
          };
          case ADVICES:
            return {
              ...state,
              advicesList: action.payload.advicesList,
            };
      default:
        return state;
    }
  };
  export default courseAdvisorReducer;