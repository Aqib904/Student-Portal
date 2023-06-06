import React, { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import Header from "../components/global/Header";
import { Collapse } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
const Student = (props) => {
  const history = useHistory();
  const dashboardText = () => {
    if (history.location.pathname == "/student/timetable") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/student/dashboard">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Timetable
        </h4>
      );
    } else if (history.location.pathname == "/student/assessment") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Evaluation</h4>
      );
    } else if (history.location.pathname == "/student/datesheet") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/student/dashboard">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Datesheet
        </h4>
      );
    }else if (history.location.pathname == "/student/setting") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/student/dashboard">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Update Profile
        </h4>
      );
    } else if (history.location.pathname == "/student/courses") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Courses</h4>
      );
    } else if (history.location.pathname == "/student/finance") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold"><Link className="text-dark" to="/student/dashboard">
        <i class="fas fa-arrow-alt-circle-left"></i>
      </Link>
      &nbsp;Finance</h4>
      );
    } else if (history.location.pathname == "/student/finance/fine") {
      return <h4 className="d-block d-md-block m-0 font-weight-bold">Fine</h4>;
    } else if (history.location.pathname == "/student/finance/fee") {
      return <h4 className="d-block d-md-block m-0 font-weight-bold">Fee</h4>;
    } else if (history.location.pathname == "/student/finance/financial") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Financial</h4>
      );
    } else if (history.location.pathname == "/student/attendance") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Attendance</h4>
      );
    } else if (history.location.pathname == "/student/evaluation") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/student/dashboard">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Evaluation
        </h4>
      );
    } else if (history.location.pathname == "/student/examresult") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/student/dashboard">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Exam Result
        </h4>
      );
    } else if (history.location.pathname == "/student/financial_assistance") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/student/finance">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Financial Assistance
        </h4>
      );
    } else if (history.location.pathname == "/student/uploadfine") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/student/finance">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Fine Details
        </h4>
      );
    } else if (history.location.pathname == "/student/viewnoticeboard") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/student/dashboard">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Noticeboard
        </h4>
      );
    } else if (history.location.pathname == "/student/advices") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/student/dashboard">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Advices
        </h4>
      );
    } else if (history.location.pathname == "/student/rating-courses") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/student/dashboard">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Rating Courses
        </h4>
      );
    } else if (history.location.pathname == "/student/dashboard") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold mx-3">
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
        <div className="container">
          <h4 className="my-3 d-block">{dashboardText()}</h4>
        </div>
        <div className=" position-relative">
          <Collapse
            isOpen={isOpen}
            className="position-absolute"
            style={{ zIndex: "100", top: "-135px" }}
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
