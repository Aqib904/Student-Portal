import { EVALUATIONGENERAL, EVALUATIONEXAM,SESSION,EXAMMARKS } from "../types";
export const markGeneralExam = (list) => async (dispatch) => {
    try {
      const response = await fetch('https://localhost:44374/api/Teacher/MarkAssignmentQuiz', {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(list),
      })
     const data=response.json();
      if (response.ok) {
        alert(" Marked Successfully")
      } else {
        alert(" Marked  failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const markMidFinal = (list) => async (dispatch) => {
    try {
      const response = await fetch('https://localhost:44374/api/Teacher/MarkMidFinal', {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(list),
      })
     const data=response.json();
      if (response.ok) {
        alert("Marked Successfully")
      } else {
        alert("Marked failed")
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const AssignmentQuizEvaluation = (regno) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:44374/api/Student/GetAssignmentQuizMarks?reg_no=${regno}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: EVALUATIONGENERAL, payload: { general: data } });
      } else {
        alert("DateSheet load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const ExamMarksEvaluation = (regno) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:44374/api/Student/GetExamsMarks?reg_no=${regno}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: EVALUATIONEXAM, payload: { exam: data } });
      } else {
        alert("DateSheet load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getSession = (regno) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:44374/api/Student/GetMySessions?reg_no=${regno}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: SESSION, payload: { session: data } });
      } else {
        alert("Session load failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  export const getExamMarks = (regno,session) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:44374/api/Student/GetMidFinalMarks?reg_no=${regno}&session=${session}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: EXAMMARKS, payload: { examData: data } });
      } else {
        alert("Marks loaded failed");
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };