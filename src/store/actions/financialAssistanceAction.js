import { REQUEST_LOADING} from "../types";
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
        alert("Request send Successfully");
        dispatch(requestLoading(false));
        history.push("/student/finance");
      } else {
        alert("Request send failed");
      }
    } catch (error) {
      alert(error.message);
      dispatch(requestLoading(false));
    }
  };
  export const requestLoading = (val) => async (dispatch) => {
    dispatch({ type: REQUEST_LOADING, payload: val });
  };