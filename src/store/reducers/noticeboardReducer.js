import { SECTIONLIST,SECTION_LIST_LOADING,ADD_NOTICE_LOADING,NOTICEBOARD,NOTIFICATION,NOTIFICATION_LOADING} from "../types";
const initialState = {
   sectionList:[],
   loading:false,
   addloading:false,
   noticeboard:[],
   notification:[],
   notificationLoading:false
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
      case NOTICEBOARD:
      return {
        ...state,
        noticeboard: action.payload.noticeboard,
      };
      case NOTIFICATION:
      return {
        ...state,
        notification: action.payload.notification,
      };
      case NOTIFICATION_LOADING:
      return {
        ...state,
        notificationLoading: action.payload,
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
