import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import userService from "./users/userService";

function SiteNav(props) {
  const navigate = useNavigate();

  let currentUser = props.currentUser;

  const onLogoutClick = (e) => {
    console.log("logout clicked");
    e.preventDefault();

    if (currentUser.isLoggedIn === true) {
      userService.logout().then(onLogoutSuccess).catch(onLogoutError);
    } else if (currentUser.isLoggedIn === false) {
      navigate("/Login");
    }
  };

  const resetUser = () => {
    props.updateUser(() => {
      let updatedUser = {
        firstName: "Unknown ",
        lastName: "User",
        email: "fdeyshawn2@gmail.com",
        avatarUrl: "https://tinyurl.com/4zheyhhj",
        isLoggedIn: false,
      };
      return updatedUser;
    });
  };

  const onLogoutSuccess = (response) => {
    console.log(response);
    resetUser();
    navigate("/");
    toastr.success("Successfully logged out!");
  };

  const onLogoutError = (err) => {
    console.log(err);
    toastr.error("Logout Failed!");
  };

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Fourth navbar example"
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="https://pw.sabio.la/images/Sabio.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Sabio"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/" className="nav-link px-2 text-white link-button">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Friends"
                  className="nav-link px-2 text-white link-button"
                >
                  Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Blogs"
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Jobs"
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/TechCompanies"
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Tech Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="Events"
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="TestAjax"
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Test and Ajax Call
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Car"
                  className="nav-link px-2 text-white link-button"
                >
                  Car
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/sender"
                  className="nav-link px-2 text-white link-button"
                >
                  Sender
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/cars"
                  className="nav-link px-2 text-white link-button"
                >
                  My Cars
                </Link>
              </li>
            </ul>
            <div className="text-end">
              <a
                href="/#"
                className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none"
              >
                {props.currentUser.isLoggedIn === true
                  ? `${props.currentUser.firstName} ${props.currentUser.lastName}`
                  : "Unknown User"}
              </a>
              <Link
                to="/Login"
                type="button"
                className="btn btn-outline-light me-2"
                onClick={onLogoutClick}
              >
                {props.currentUser.isLoggedIn === false ? "login" : "logout"}
              </Link>
              <Link to="/Register" type="button" className="btn btn-warning">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default SiteNav;
