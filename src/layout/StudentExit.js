import React, { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import Header from "../components/global/ExitHeader";
import { Collapse } from "reactstrap";
import { useHistory } from "react-router-dom";
const Parent = (props) => {
  const history = useHistory();
  const dashboardText = () => {
    if (history.location.pathname == "/student/exit_form") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Exit Form</h4>
      );
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="d-lg-flex d-none">
        <div className="w-100 main-section">
          <Header />
          <div className="container">
            <h4 className="my-3 ">{dashboardText()}</h4>
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
          <div className="main-content py-2">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Parent;
