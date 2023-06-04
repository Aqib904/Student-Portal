import { SECTIONLIST,SECTION_LIST_LOADING,ADD_NOTICE_LOADING,NOTICEBOARD} from "../types";
const initialState = {
   sectionList:[],
   loading:false,
   addloading:false,
   noticeboard:[],
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
      //
      case NOTICEBOARD:
      return {
        ...state,
        noticeboard: action.payload.noticeboard,
      };
      case "PIN_NOTICE":
      return {
        ...state,
        noticeboard: action.payload,
      };
    default:
      return state;
  }
};

export default noticeboardReducer;
