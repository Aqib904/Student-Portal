import React, { useEffect, useState } from "react";
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
const Header = (props) => {
  const history = useHistory();
  const { token, user } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(-1);
  useEffect(() => {
    updatePredicate();
    window.addEventListener("resize", updatePredicate);
    return () => window.removeEventListener("resize", updatePredicate);
  }, []);
  const updatePredicate = () => {
    setIsMobile(window.innerWidth < 992);
  };
  useEffect(() => {
    dispatch(GetUser(token?.username, token?.role));
  }, [token]);
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
              <div
                className=" bg-site-profilebg  profile-box d-flex align-items-center justify-content-center cursor-pointer"
                onClick={() => {
                  if (profileDropdown == -1) {
                    setProfileDropdown(1);
                  } else {
                    setProfileDropdown(-1);
                  }
                }}
              >
                <img src={ArrowDown} alt="drop-down" className="ml-3" />
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
            {profileDropdown == 1 && (
              <HeaderDropdown
                setProfileDropdown={setProfileDropdown}
                profileDropdown={profileDropdown}
              />
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
          <Badge badgeContent={"3"} color="error">
            <NotificationsIcon />
          </Badge>
          <div className="d-flex position-relative  ml-auto header__dropDown-bg">
            <img
              src={
                user?.profile_photo
                  ? `https://localhost:44374/AttendanceImages/${user?.profile_photo}`
                  : users
              }
              alt="profile"
              className="position-absolute headerProfileImg "
            />
            <div
              className="bg-site-profilebg  headerProfile-box d-flex align-items-center justify-content-center cursor-pointer"
              onClick={() => {
                if (profileDropdown == -1) {
                  setProfileDropdown(1);
                } else {
                  setProfileDropdown(-1);
                }
              }}
            >
              <h6 className="headerProfile__name mb-0 ">{user?.first_name}</h6>
              {/* <h6 className="headerProfile__name mb-0 ">Aqib Siddique</h6> */}
              <img
                src={ArrowDown}
                className="headerProfile__arrImg  ml-md-2 ml-sm-0"
                alt="drop-down"
              />
            </div>
            {profileDropdown == 1 && (
              <HeaderDropdown
                setProfileDropdown={setProfileDropdown}
                profileDropdown={profileDropdown}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
