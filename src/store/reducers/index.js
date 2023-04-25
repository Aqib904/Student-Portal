// Root Reducer

import { combineReducers } from "redux";
import authUserReducer from "./authUser";
import authReducer from "./authReducer";
import timetableReducer from "./timetableReducer";
import  datesheetReducer from "./datesheetReducer"
import attendanceReducer from "./attendanceReducer"
import contestReducer from "./contestReducer"
import evaluationReducer from "./evaluationReducer";
import assessmentReducer from "./assessmentReducer";
import enrollmentReducer from "./enrollmentReducer";
import feeReducer from "./feeReducer";
import financialAssistanceReducer from "./financialAssistanceReducer"
import fineReducer from "./fineReducer"
export let rootReducer = combineReducers({
  authUser: authUserReducer,
  userAuth:authReducer,
  timetable:timetableReducer,
  datesheet: datesheetReducer,
  attendance:attendanceReducer,
  contest:contestReducer,
  evaluation:evaluationReducer,
  assessment:assessmentReducer,
  enrollment:enrollmentReducer,
  fee:feeReducer,
  financial:financialAssistanceReducer,
  fine:fineReducer,
});
export default rootReducer;
