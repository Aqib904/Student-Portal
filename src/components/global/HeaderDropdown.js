import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../store/actions/authAction";

const HeaderDropdown = () => {
  const dispatch = useDispatch();
  const { token,user } = useSelector((state) => state.authUser);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="top-nav__dropdown position-absolute ">
      <div className="top-nav__dropdown-header py-4">
        <p className="mb-0 top-nav__dropdown-header__title">Student Portal</p>
      </div>
      <div className="top-nav__dropdown-links pt-4 py-0 my-2">
        <p className=" cursor-pointer px-4">
          <Link
            className="top-nav__dropdown-links__item"
            to={`/${token?.role}/setting`}
          >
            Personal Information
          </Link>{" "}
        </p>
      </div>

      <hr />
      <NavLink
        to="/auth_login/"
        activeClassName="active"
        className="text-decoration-none"
      >
        <div className="top-nav__dropdown-links ">
          <p
            className="top-nav__dropdown-links__secondary px-4  cursor-pointer"
            style={{ paddingTop: "5px" }}
            onClick={handleLogout}
          >
            Log out
          </p>
        </div>
      </NavLink>
    </div>
  );
};

export default HeaderDropdown;
