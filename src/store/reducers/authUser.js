import {
  LOGIN,
  LOGOUT,
  LOGIN_FAILURE,
  LOGIN_LOADING,
  ENROLLMENTSTATUS,
  USER,
  CHILD,
  QUESTIONS,
} from "../types";
const initialState = {
  isAuthenticated: false,
  token: "",
  error: "",
  loading: false,
  status: "",
  user: {},
  childs: [],
  questions:{},
};
const authUser = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        isAuthenticated: true,
        token: action.payload.token,
        error: "",
      };
    case LOGIN_FAILURE:
      return {
        isAuthenticated: false,
        token: "",
        error: action.payload.error,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        token: "",
        error: "",
      };
    case USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case CHILD:
      return {
        ...state,
        childs: action.payload.childs,
    };
    
    case QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
    };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ENROLLMENTSTATUS:
      return {
        ...state,
        status: action.payload.statuss,
      };
    default:
      return state;
  }
};

export default authUser;
