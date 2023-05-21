import { COURSE_ADVISOR__LOADING } from "../types";
const initialState = {
    loading:false,
  };
  const courseAdvisorReducer = (state = initialState, action) => {
    switch(action.type) {
        case COURSE_ADVISOR__LOADING:
          return {
            ...state,
            loading: action.payload,
          };
      default:
        return state;
    }
  };
  export default courseAdvisorReducer;