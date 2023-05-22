import React, { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import Header from "../components/global/Header";
import { Collapse } from "reactstrap";
import { useHistory } from "react-router-dom";
const Teacher = (props) => {
  const history = useHistory();
  const dashboardText = () => {
    if (history.location.pathname == "/teacher/timetable") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Timetable</h4>
      );
    }  else if (history.location.pathname == "/teacher/attendance/:id") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Manage Attendance</h4>
      );
    } else if (history.location.pathname == "/teacher/evaluation/:id") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Manage Evaluation</h4>
      );
    }  else if (history.location.pathname == "/teacher/advise-student") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Advise Student</h4>
      );
    } else if (history.location.pathname == "/teacher/dashboard"){
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
            style={{ zIndex: "100", top: "-132px" }}
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
