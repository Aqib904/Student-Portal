import React, { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import Header from "../components/global/Header";
import { Collapse } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
const Teacher = (props) => {
  const history = useHistory();
  const dashboardText = () => {
    if (history.location.pathname == "/admin/assistantrequest") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          Financial Assistance Requests
        </h4>
      );
    } else if (history.location.pathname == "/admin/datesheet") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          Manage Datesheet
        </h4>
      );
    } else if (history.location.pathname == "/admin/fine") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Manage Fine</h4>
      );
    } else if (history.location.pathname == "/admin/noticeboard") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          Manage Noticeboard
        </h4>
      );
    } else if (history.location.pathname == "/admin/timetable") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          Manage Timetable
        </h4>
      );
    } else if (history.location.pathname == "/admin/teacherevaluation") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          Teacher Evaluation
        </h4>
      );
    } else if (history.location.pathname == "/admin/checkevaluation") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          Check Evaluation
        </h4>
      );
    } else if (history.location.pathname == "/admin/courseallocation") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          Course Allocation
        </h4>
      );
    }else if (history.location.pathname == "/admin/course-advisor") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          Course Advisor
        </h4>
      );
    } else if (history.location.pathname == "/admin/finelist") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/admin/fine">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp;Students Fine List
        </h4>
      );
    } else if (history.location.pathname == "/admin/student_fee") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Student Fee</h4>
      );
    } else if (history.location.pathname == "/admin/installment-requests") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Installment Requests</h4>
      );
    } else if (history.location.pathname == "/admin/addfine") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          <Link className="text-dark" to="/admin/fine">
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
          &nbsp; Add Fine
        </h4>
      );
    } else if (history.location.pathname == "/admin/dashboard") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          {" "}
          Teacher Dashboard
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
          <Header/>
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

export default Teacher;
