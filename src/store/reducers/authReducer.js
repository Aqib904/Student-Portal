import {  LOGIN_LOADING } from "../types";
const initialState = {
  // loading:false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN_LOADING:
    //   return {
    //     ...state,
    //     loading: action.payload,
    //   };
    default:
      return state;
  }
};

export default authReducer;
