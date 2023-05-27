import React, { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import Header from "../components/global/Header";
import { Collapse } from "reactstrap";
import { useHistory } from "react-router-dom";
const Parent = (props) => {
  const history = useHistory();
  const dashboardText = () => {
    if (history.location.pathname == "/parent/setting") {
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">Profile Setting</h4>
      );
    } else if (history.location.pathname == "/parent/dashboard"){
      return (
        <h4 className="d-block d-md-block m-0 font-weight-bold">
          {" "}
           Dashboard
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

export default Parent;
