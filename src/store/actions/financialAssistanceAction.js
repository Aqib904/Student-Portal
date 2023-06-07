import { REQUEST_LOADING,ASSISTANCEREQUESTS,GET_REQUEST_LOADING,ASSISTANCEREQUESTSIMAGES,ACCEPT_REQUEST_LOADING,REJECT_REQUEST_LOADING} from "../types";
import { RepositoryFactory } from "../../repository/RepositoryFactory";
import { toast } from "react-toastify";
var financialAssistance = RepositoryFactory.get("financialAssistance")
export const requestFinancialAssistance =
  (reg_no,description, fileList,history) => async (dispatch) => {
    try {
      dispatch(requestLoading(true))
      const formData = new FormData();
      formData.append("reg_no", reg_no);
      formData.append("description", description);
      fileList.forEach((item) => {       
          formData.append(`${item.name}`, item.originFileObj);
      });
      const response = await fetch(
        "https://localhost:44374/api/Student/RequestFinancialAssistance",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Request send Successfully");
        dispatch(requestLoading(false));
        history.push("/student/finance");
      } else {
        toast.error("Request send failed");
      }
    } catch (error) {
      alert(error.message);
      dispatch(requestLoading(false));
    }
  };
  export const getFinancialAssistanceRequests = () => async (dispatch) => {
    try {
      dispatch(getRequestLoading(true))
      const { data } = await financialAssistance.getFinancialAssistanceRequests()
      if (data) {
        dispatch({ type: ASSISTANCEREQUESTS, payload: { assistanceRequestList: data } });
        dispatch(getRequestLoading(false))
      } else {
        //console.log("Request load failed")
        dispatch(getRequestLoading(false))
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getFinancialAssistanceImages = (id) => async (dispatch) => {
    try {
      const { data } = await financialAssistance.getFinancialAssistanceImages(id)
      if (data) {
        //console.log(data,'images')
        dispatch({ type: ASSISTANCEREQUESTSIMAGES, payload: { assistanceRequestImages: data } });
      } else {
        //console.log("Images loaded failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const requestAcceptAction = (id,history) => async (dispatch) => {
    try {
      dispatch(acceptRequestLoading(true))
      const { data } = await financialAssistance.requestAccept(id)
      if (data =="success") {
        toast.success("You Accepted the student Request");
        history.push("/admin/assistantrequest")
        dispatch(acceptRequestLoading(false))
        
      } else {
        alert("Accept failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const requestRejectAction = (id,reason,history) => async (dispatch) => {
    try {
      dispatch(rejectRequestLoading(true))
      const { data } = await financialAssistance.requestReject(id,reason)
      if (data =="Request Rejected") {
        toast.success("You Rejected the student Request");
        history.push("/admin/assistantrequest")
        dispatch(rejectRequestLoading(false))
       
      } else {
        alert("Rejected failed")
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const requestLoading = (val) => async (dispatch) => {
    dispatch({ type: REQUEST_LOADING, payload: val });
  };
  export const acceptRequestLoading = (val) => async (dispatch) => {
    dispatch({ type: ACCEPT_REQUEST_LOADING, payload: val });
  };
  export const rejectRequestLoading = (val) => async (dispatch) => {
    dispatch({ type: REJECT_REQUEST_LOADING, payload: val });
  };
  export const getRequestLoading = (val) => async (dispatch) => {
    dispatch({ type: GET_REQUEST_LOADING, payload: val });
  };