import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import TogglerDark from "../../assets/img/TogglerDark.svg";
import logo from "../../assets/img/biit.png";
import HeaderDropdown from "./HeaderDropdown";
import ArrowDown from "../../assets/img/ArrowDown.svg";
import users from "../../assets/img/user.png";
import { useDispatch, useSelector } from "react-redux";
import { GetUser } from "../../store/actions/authAction";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  getNotification,
  seenNotification,
} from "../../store/actions/noticeboardAction";
import { NotificationImportant, Settings } from "@material-ui/icons";
import Logout from "@mui/icons-material/Logout";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { logout } from "../../store/actions/authAction";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import notify from "../../assets/img/notification.png";
import dots from "../../assets/img/dots.png";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
const Header = (props) => {
  const history = useHistory();
  const dropdownRef = useRef(null);
  const { token, user } = useSelector((state) => state.authUser);
  const { notification, notificationLoading } = useSelector(
    (state) => state.noticeboard
  );
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [sortNotification, setSortNotification] = useState([]);
  const [falseStatusCount, setFalseStatusCount] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleDropdown = () => {
    setProfileDropdown((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };
  useEffect(() => {
    updatePredicate();
    window.addEventListener("resize", updatePredicate);
    return () => window.removeEventListener("resize", updatePredicate);
  }, []);
  const handleLogout = () => {
    dispatch(logout());
  };
  const updatePredicate = () => {
    setIsMobile(window.innerWidth < 992);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(!profileDropdown);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileDropdown]);
  useEffect(() => {
    dispatch(GetUser(token?.username, token?.role));
  }, [token]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (token?.username) {
        dispatch(getNotification(token.username));
      }
    }, 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, token]);
  useEffect(() => {
    // Convert the notification array data into an array of objects
    const notifications = Object.values(notification);

    // Sort the notifications based on the 'dateTime' property in descending order
    notifications.sort((a, b) => {
      const dateA = moment(a.dateTime, "DD-MM-YYYY,HH:mm:ss");
      const dateB = moment(b.dateTime, "DD-MM-YYYY,HH:mm:ss");
      return dateB - dateA;
    });

    // Create a new array of updated notifications
    const updatedNotifications = notifications.map((notification) => {
      const notificationTime = moment(
        notification.dateTime,
        "DD-MM-YYYY,HH:mm:ss"
      );
      const timeDiff = moment().diff(notificationTime, "minutes");

      let formattedTimeDiff = "";

      if (timeDiff < 60) {
        formattedTimeDiff = `${timeDiff} minutes ago`;
      } else if (timeDiff < 1440) {
        const hours = Math.floor(timeDiff / 60);
        const minutes = timeDiff % 60;
        formattedTimeDiff = `${hours} hour${
          hours > 1 ? "s" : ""
          // } ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } ago`;
      } else {
        const days = Math.floor(timeDiff / 1440);
        formattedTimeDiff = `${days} day${days > 1 ? "s" : ""} ago`;
      }

      return {
        ...notification,
        dateTime: formattedTimeDiff,
      };
    });
    //console.log(updatedNotifications, "updatedNotifications");

    const falseCount = updatedNotifications.filter(
      (notification) => !notification.status
    ).length;
    setFalseStatusCount(falseCount);
    // Update the state with the sorted and updated notifications
    setSortNotification(updatedNotifications);
  }, [notification]);
  return (
    <>
      {isMobile ? (
        <>
          <div className="d-flex top-nav bg-white justify-content-between px-3">
            <div>
              <img
                onClick={props.toggle}
                src={TogglerDark}
                className="cursor-pointer py-3"
              />
            </div>
            <div className="">
              <Link to="/">
                <img
                  src={logo}
                  height={50}
                  width={50}
                  alt="logo"
                  className="logo"
                />
              </Link>
            </div>
            <div className="d-flex position-relative  justify-content-end">
              <div className=" bg-site-profilebg  profile-box d-flex align-items-center justify-content-center cursor-pointer">
                <img
                  src={ArrowDown}
                  alt="drop-down"
                  className="ml-3 cursor"
                  onClick={() => {
                    toggleDropdown();
                  }}
                />
              </div>
              <img
                src={
                  user?.profile_photo
                    ? `https://localhost:44374/AttendanceImages/${user?.profile_photo}`
                    : users
                }
                alt="profile"
                className="position-absolute headerProfileImg "
              />
            </div>
            {profileDropdown == true && (
              // <HeaderDropdown
              //   setProfileDropdown={setProfileDropdown}
              //   profileDropdown={profileDropdown}
              // />
              <div
                ref={dropdownRef}
                className="top-nav__dropdown position-absolute "
              >
                <div className="top-nav__dropdown-header py-3">
                  <p className="mb-0 top-nav__dropdown-header__title">
                    {user.first_name}
                  </p>
                </div>
                <div className="top-nav__dropdown-links pt-2">
                  <p className=" cursor-pointer  d-inline-block">
                    <MenuItem>
                      <Avatar
                        className="d-inline-block "
                        sx={{ width: 32, height: 32 }}
                        src={
                          user?.profile_photo
                            ? `https://localhost:44374/AttendanceImages/${user?.profile_photo}`
                            : users
                        }
                      ></Avatar>
                      &nbsp;&nbsp;&nbsp;
                      <Link
                        className="top-nav__dropdown-links__item"
                        to={`/${token?.role}/setting`}
                      >
                        Profile Setting
                      </Link>
                    </MenuItem>
                  </p>
                </div>
                <Divider />
                <MenuItem
                  onClick={() => {
                    toggle();
                    toggleDropdown();
                  }}
                >
                  <ListItemIcon>
                    <NotificationImportant fontSize="small" />
                  </ListItemIcon>
                  Notifications
                </MenuItem>

                <div className="top-nav__dropdown-links ">
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <Link
                      to="/auth_login/"
                      activeClassName="active"
                      className="text-decoration-none text-dark"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </MenuItem>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="container top-nav d-flex bg-white ">
          <img src={logo} height={50} width={50} alt="logo" className="logo" />
          <h4 className="d-none d-md-block mx-3 m-0 font-weight-bold ">
            Barani Institute of information technology
          </h4>
          {/* <i class="fas fa-bell" style={{ fontSize: "25px", width: "10px", height: "10px", marginTop:"-10px"}}></i> */}
          <Badge badgeContent={falseStatusCount} color="error">
            {falseStatusCount > 0 ? (
              <NotificationsIcon
                className="cursor vibrate"
                onClick={() => {
                  toggle();
                }}
              />
            ) : (
              <NotificationsIcon
                className="cursor"
                onClick={() => {
                  toggle();
                }}
              />
            )}
          </Badge>
          <div className="d-flex position-relative  ml-auto header__dropDown-bg">
            <div className=" headerProfile-box d-flex align-items-center justify-content-center cursor-pointer">
              <img
                src={
                  // user?.profile_photo
                  //   ? `https://localhost:44374/AttendanceImages/${user?.profile_photo}`
                  //   : users
                  dots
                }
                style={{ height: "30px" }}
                onClick={() => {
                  toggleDropdown();
                }}
                alt="profile"
                className="position-absolute headerProfileImg my-1 cursor"
              />
              {/* <h6 className="headerProfile__name mb-0 ">{user?.first_name}</h6> */}
              {/* <h6 className="headerProfile__name mb-0 ">Aqib Siddique</h6> */}
              {/* <img
                src={ArrowDown}
                className="headerProfile__arrImg  ml-md-2 ml-sm-0"
                alt="drop-down"
              /> */}
            </div>
            {profileDropdown == true && (
              // <HeaderDropdown
              //   setProfileDropdown={setProfileDropdown}
              //   profileDropdown={profileDropdown}
              // />
              <div
                ref={dropdownRef}
                className="top-nav__dropdown position-absolute "
              >
                <div className="top-nav__dropdown-header py-3">
                  <p className="mb-0 top-nav__dropdown-header__title">
                    {user.first_name}
                  </p>
                </div>
                <div className="top-nav__dropdown-links pt-2">
                  <p className=" cursor-pointer  d-inline-block">
                    <MenuItem>
                      <Avatar
                        className="d-inline-block "
                        sx={{ width: 32, height: 32 }}
                        src={
                          user?.profile_photo
                            ? `https://localhost:44374/AttendanceImages/${user?.profile_photo}`
                            : users
                        }
                      ></Avatar>
                      &nbsp;&nbsp;&nbsp;
                      <Link
                        className="top-nav__dropdown-links__item"
                        to={`/${token?.role}/setting`}
                      >
                        Profile Setting
                      </Link>
                    </MenuItem>
                  </p>
                </div>
                <Divider />
                {/* <MenuItem onClick={()=>{toggle()}}>
                  <ListItemIcon>
                    <NotificationImportant fontSize="small" />
                  </ListItemIcon>
                  Notifications
                </MenuItem> */}

                <div className="top-nav__dropdown-links ">
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <Link
                      to="/auth_login/"
                      activeClassName="active"
                      className="text-decoration-none text-dark"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </MenuItem>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Modal isOpen={modal} toggle={toggle} className="notification-modal">
        <ModalHeader className="notification-header" toggle={toggle}>
          <Row className="ml-2 mt-2">
            <h4 style={{ fontWeight: 700 }}>Notification</h4>
            <img className="mx-2 mt-1" src={notify} height={20} width={20} />
          </Row>
        </ModalHeader>
        <ModalBody className="custom-modal-body">
          {sortNotification.map((item, index) =>
            item.status == false ? (
              <LoadingOverlay
                active={notificationLoading}
                spinner
                text="Notification Loading...."
              >
                <div
                  key={index}
                  className={`notification-item   ${
                    item.status ? "status-true" : "status-false"
                  }`}
                  onClick={() => {
                    const typeParts = item.type.split("/");
                    if (typeParts[0] === "student") {
                      history.push({
                        pathname: `${item.type}`,
                      });
                    }else if(typeParts[0] === "teacher"){
                      history.push({
                        pathname: `${item.type}`,
                      });
                    }

                    dispatch(seenNotification(item.id));
                    toggle();
                  }}
                >
                  {item.status == false ? (
                    <i class="fas fa-envelope text-site-primary"></i>
                  ) : (
                    <i class="fas fa-envelope-open text-site-primary"></i>
                  )}
                  &nbsp;
                  <strong style={{ fontSize: "14px", fontWeight: 600 }}>
                    {item.detail.split("!")[0]}
                  </strong>
                  {item.status == false ? (
                    <span className="notification-dot float-right"></span>
                  ) : null}
                  <span className="notification-time float-right">
                    {item.dateTime}
                  </span>
                  <br />
                  <div style={{ marginLeft: "21px", maxWidth: "86%" }}>
                    <span style={{ fontSize: "13px", letterSpacing: 0.6 }}>
                      {item.detail.split("!")[1]}
                    </span>
                  </div>
                  <br />
                </div>
              </LoadingOverlay>
            ) : (
              ""
            )
          )}
        </ModalBody>
      </Modal>
    </>
  );
};
export default Header;
