import { SECTIONLIST,SECTION_LIST_LOADING,ADD_NOTICE_LOADING} from "../types";
const initialState = {
   sectionList:[],
   loading:false,
   addloading:false,
};
const noticeboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SECTIONLIST:
      return {
        ...state,
        sectionList: action.payload.sectionList,
      };
      case SECTION_LIST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
      case ADD_NOTICE_LOADING:
      return {
        ...state,
        addloading: action.payload,
      };
    default:
      return state;
  }
};

export default noticeboardReducer;
