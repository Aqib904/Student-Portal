import { ENROLLMENT  } from "../types";
const initialState = {
    enrollmentCourses:{},
};
  const enrollmentReducer = (state = initialState, action) => {
    switch(action.type) {
        case ENROLLMENT :
        return {
          ...state,
          enrollmentCourses: action.payload.enrollment,
        };
      default:
        return state;
    }
  };
  
  export default enrollmentReducer;