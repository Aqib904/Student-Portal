import { COURSE_ADVISOR__LOADING ,STUDENTCOURSEADVISOR} from "../types";
const initialState = {
    loading:false,
    courseAdvisorList:[]
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
      default:
        return state;
    }
  };
  export default courseAdvisorReducer;