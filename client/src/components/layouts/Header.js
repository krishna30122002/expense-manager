import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setLoginUser(user);
      }
    } catch (error) {
      console.error("Error retrieving user data from localStorage:", error);
    }
  }, []);

  const logoutHandler=()=>{
    localStorage.removeItem("user")
    message.success('Logout Successful')
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            Expense Manager<span className="mobile-info">   (mobile development under process)</span>
          </Link>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="userNameTitle nav-item">
              {" "}
              <p className="nav-item">{loginUser && loginUser.name}</p>{" "}
            </li>
            <li className="nav-item">
              <button
                className="btnlink"
                to="/logout"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
