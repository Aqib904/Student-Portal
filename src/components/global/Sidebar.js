import {
  Link,
  useHistory,
  Redirect,
  NavLink,
  useLocation,
} from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import {
  Col,
  Row,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  NavItem,
} from "reactstrap";
import users from "../../assets/img/user.png";
import { useEffect, useRef } from "react";
import routes from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { GetUser, logout } from "../../store/actions/authAction";
const Sidebar = (props) => {
  const { token,user } = useSelector((state) => state.authUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const contractRef = useRef();
  const handleClickOutside = (e) => {
    if (!contractRef.current?.contains(e.target)) {
      props.outsideClose();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  const [finance, setFinance] = useState(false);
  const toggleFinance = () => {
    setFinance(!finance);
  };
  const [collapseFinance, setCollapseFinance] = useState(true);
  const location = useLocation();
  const layout = location.pathname.split("/")[1];
  useEffect(() => {
    if (token?.role !== layout) {
      history.push("/auth_login/");
    }
  }, [token]);
  useEffect(()=>{
    dispatch(GetUser(token?.username,token?.role))
  },[token])
  const checkSideBarName = (routes) => {
    return routes.map((route, id) => {
      return (
        route.layout == layout &&
        // route.path=="/student/finance"||
        // route.path == "/student/finance/fine" ||
        // route.path== "/student/finance/fee" ||
        // route.path == "/student/finance/financial"?(
        //   <UncontrolledDropdown
        //     inNavbar
        //     className="text-light"
        //     isOpen={
        //       collapseFinance
        //         ? history.location.pathname == "/student/finance" ||
        //           history.location.pathname == "/student/finance/fine" ||
        //           history.location.pathname == "/student/finance/fee" ||
        //           history.location.pathname == "/student/finance/financial"
        //           ? true
        //           : finance
        //         : false
        //     }
        //     onClick={toggleFinance}
        //   >
        //     <DropdownToggle
        //       className="dropdown-togglenavbar text-light"
        //       nav
        //     >
        //       <NavLink
        //         to="/student/finance"
        //         activeClassName="active"
        //         className={`side-nav-item my-2 text-site-muted `}
        //         onClick={() => {
        //           setCollapseFinance(!collapseFinance);
        //         }}
        //       >
        //         <div className="sidebar-icon ">
        //         <i class="fas fa-money-check-alt icon-sty"></i>
        //         </div>
        //         <div className="sidebar-text">
        //           <span className="ml-3">Finanace</span>
        //         </div>
        //       </NavLink>
        //     </DropdownToggle>
        //     <DropdownMenu
        //       className="dropdown-togglenavbar  text-light"
        //     >
        //       <DropdownItem toggle={false}>
        //         <NavItem>
        //           <NavLink
        //             to="/student/finance/fine"
        //             activeClassName="active"
        //             className={`side-nav-item  text-site-muted 	`}
        //           >
        //             <div className="sidebar-icon ">
        //             <i class="fas fa-rupee-sign icon-sty"></i>
        //             </div>
        //             <div className="sidebar-text">
        //               <span className="ml-3">Fine</span>
        //             </div>
        //           </NavLink>
        //         </NavItem>
        //       </DropdownItem>
        //       <DropdownItem toggle={false}>
        //         <NavItem>
        //           <NavLink
        //             to="/student/finance/fee"
        //             activeClassName="active"
        //             className={`side-nav-item   text-site-muted 	`}
        //           >
        //             <div className="sidebar-icon ">
        //             <i class="fas fa-money-check-alt icon-sty"></i>
        //             </div>
        //             <div className="sidebar-text">
        //               <span className="ml-3">Fee</span>
        //             </div>
        //           </NavLink>
        //         </NavItem>
        //       </DropdownItem>
        //       <DropdownItem toggle={false}>
        //         <NavItem>
        //           <NavLink
        //             to="/student/finance/financial"
        //             activeClassName="active"
        //             className={`side-nav-item  text-site-muted 	`}
        //           >
        //             <div className="sidebar-icon ">
        //             <i class="fas fa-donate icon-sty"></i>
        //             </div>
        //             <div className="sidebar-text">
        //               <span className="ml-3">Financial</span>
        //             </div>
        //           </NavLink>
        //         </NavItem>
        //       </DropdownItem>
        //     </DropdownMenu>
        //   </UncontrolledDropdown>
        // ):(
          //
        (route.path != "/student/attendance/:id"&&route.path != "/teacher/evaluate/:id"&&route.path != "/teacher/manage_advises/:id"&&route.path != "/student/uploadfine"&&route.path != "/teacher/manage_advise_students/:id"&&route.path != "/admin/addfine"&&route.path != "/admin/fine_details/:id"&&route.path != "/admin/finelist"&&route.path != "/admin/manage_financial_assistance/:id"&&route.path != "/student/financial_assistance"&&route.path != "/admin/manage_fee/:id"&&route.path != "/student/fee_detail"&&route.path != "/student/fee_status"&&route.path != "/student/generate_challan/:id" && route.path != "/teacher/attendance/:id"&& route.path != "/teacher/evaluation/:id"&& route.path != "/student/evaluation/:id"&&route.path != "/student/assessment/:id"&&route.path != "/admin/evaluationpercentage/:id"&&route.path != "/student/enrollment"? (
          <NavLink
            to={route.path}
            activeClassName="active"
            className={`side-nav-item my-2 text-light`}
            onClick={(e) => props.outsideClose()}
          >
            <div className="sidebar-icon">
              <i className={`${route.icon}icon-sty`}></i>
            </div>
            <div className="fs--18 fw--500">
              <span className="ml-3">{route.name}</span>
            </div>
          </NavLink>
        ) : (
          ""
        ))
        // )
      );
    });
  };
  return (
    <>
      <div className={`sidebar pt-lg-3 bg-site-primary `} ref={contractRef}>
        <div>
          <div className="sidebar-logo d-block d-lg-none mb-4">
            <Row className="mt-5">
              <Col
                xs="4"
                className="d-flex justify-content-center align-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 7H13"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 12H17"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 17H21"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Col>
              <Col
                xs="4"
                className="d-flex justify-content-center align-items-center"
              ></Col>
              <Col xs="4">
                <div className="d-flex d-lg-none justify-content-end align-items-center px-3  cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      fill="#EDF1FA"
                      fill-opacity="0.4"
                    />
                    <path
                      d="M9.10205 14.7568L14.8977 9.24228"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.7572 14.8982C12.6037 12.6349 11.3962 11.3659 9.24268 9.10254"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </Col>
            </Row>
          </div>

          <div className=" sidebar-logo d-none d-lg-flex justify-content-center align-items-center flex-column mt-3  ">
            <Image
              src={user?.profile_photo?`https://localhost:44374/AttendanceImages/${user?.profile_photo}`:users}
              alt="Batch"
              height={80}
              width={80}
              className="img-fluid rounded-circle logo "
            />
            <h5 className="text-light my-1">{user?.first_name}</h5>
            {/* <h5 className="text-light">Aqib Siddique</h5> */}
          </div>
          <hr />
          <div className="side-nav-items">{checkSideBarName(routes)}</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
