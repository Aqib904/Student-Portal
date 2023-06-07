import { toastSuccess, toastWarning } from "../../components/global/Toast";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
import { toast } from "react-toastify";
import { LOGIN, LOGOUT,LOGIN_FAILURE,LOGIN_LOADING ,ENROLLMENTSTATUS,USER,CHILD} from "../types";
var auth = RepositoryFactory.get("auth");
export const login = (username, password) => async (dispatch) => {
  //console.log(username,password,'data')
  try {
    dispatch(loginLoading(true));
    const response = await fetch(`https://localhost:44374/api/Login/LoginUser/?username=${username}&password=${password}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(loginLoading(false));
      dispatch({ type: LOGIN, payload: { token: data } });
    } else {
      toast.error("Invalid User")
      throw new Error(data.error);
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: { error: error.message } });
  }
};
export const getEnrollmentStatus = (reg_no) => async (dispatch) => {
  try {
    const response = await fetch(`https://localhost:44374/api/Student/GetEnrollmentStatus?reg_no=${reg_no}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: ENROLLMENTSTATUS, payload: { statuss: data } });
    } else {
      alert("Enrollment load failed")
      throw new Error(data.error);
    }
  } catch (error) {
    alert(error.message);
  }
};
export const GetUser = (username, role) => async (dispatch) => {
  try {
    const { data } = await auth.GetUser(username, role)
    if (data) {
      dispatch({ type: USER, payload: { user: data } });
    } else {
      toastWarning("User Loaded Failed")
      throw new Error(data.error);
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: { error: error.message } });
  }
};
export const GetChilds = (username) => async (dispatch) => {
  try {
    dispatch(loginLoading(true))
    const { data } = await auth.GetChilds(username)
    if (data) {
      dispatch({ type: CHILD, payload: { childs: data } });
      dispatch(loginLoading(false))
    } else {
      toastWarning("Childs Loaded Failed")
      dispatch(loginLoading(false))
      throw new Error(data.error);
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: { error: error.message } });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

export const loginLoading = (val) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING, payload: val });
};