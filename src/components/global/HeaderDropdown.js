import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../store/actions/authAction";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import users from "../../assets/img/user.png";
import { NotificationImportant, Settings } from "@material-ui/icons";
import Logout from "@mui/icons-material/Logout";
const HeaderDropdown = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.authUser);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="top-nav__dropdown position-absolute ">
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
      <MenuItem>
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
  );
};

export default HeaderDropdown;
