import React, { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import Header from "../components/global/Header";
import { Collapse } from "reactstrap";
import { useHistory } from "react-router-dom";
const Student = (props) => {
  const history = useHistory();
  const dashboardText = () => {
    if (history.location.pathname == "/student/timetable") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">Timetable</h4>
      );
    } else if (history.location.pathname == "/student/assessment") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">Evaluation</h4>
      );
    } else if (history.location.pathname == "/student/datesheet") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">Datesheet</h4>
      );
    } else if (history.location.pathname == "/student/courses") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">Courses</h4>
      );
    } else if (history.location.pathname == "/student/finance") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">Finance</h4>
      );
    } else if (history.location.pathname == "/student/finance/fine") {
      return <h4 className="d-none d-md-block m-0 font-weight-bold">Fine</h4>;
    } else if (history.location.pathname == "/student/finance/fee") {
      return <h4 className="d-none d-md-block m-0 font-weight-bold">Fee</h4>;
    } else if (history.location.pathname == "/student/finance/financial") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">Financial</h4>
      );
    } else if (history.location.pathname == "/student/attendance") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">Attendance</h4>
      );
    } else if (history.location.pathname == "/student/evaluation") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">Evaluation</h4>
      );
    } else if (history.location.pathname == "/student/examresult") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">Exam Result</h4>
      );
    } else if (history.location.pathname == "/student/financial_assistance") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">Financial Assistance</h4>
      );
    } else if (history.location.pathname == "/student/dashboard") {
      return (
        <h4 className="d-none d-md-block m-0 font-weight-bold">
          {" "}
          Student Dashboard
        </h4>
      );
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const outsideClose = () => {
    if (isOpen) {
      setIsOpen(false);
    } 
  };
  return (
    <>
      <div className="d-lg-flex d-none">
        <Sidebar sidebarToggle={toggle} outsideClose={outsideClose} />
        <div className="w-100 main-section">
          <Header />
          <div className="container">
            <h4 className="my-3">{dashboardText()}</h4>
          </div>
          <div className="main-content py-2">{props.children}</div>
        </div>
      </div>
      <div className="d-block d-lg-none  ">
        {" "}
        <Header toggle={toggle} />
        <div className=" position-relative">
          <Collapse
            isOpen={isOpen}
            className="position-absolute"
            style={{ zIndex: "100", top: "-90px" }}
          >
            <Sidebar sidebarToggle={toggle} outsideClose={outsideClose} />
          </Collapse>
          <div className="main-content py-2">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Student;
