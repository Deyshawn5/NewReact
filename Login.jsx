import React, { useState } from "react";
import userService from "./userService";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";

function Login() {
  const [userLoginData, setUserLoginData] = useState({
    email: "", //fdeyshawn2@gmail.com
    password: "", //Sabiosabio123!!
    tenantId: "U0408PL3YP6",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const newUserValue = e.target.value;
    const nameOfField = e.target.name;
    setUserLoginData((prevState) => {
      const newUserObject = {
        ...prevState,
      };
      newUserObject[nameOfField] = newUserValue;
      return newUserObject;
    });
  };

  const onLoginClicked = (e) => {
    e.preventDefault();
    let payload = userLoginData;
    userService.login(payload).then(onLoginSuccess).catch(onLoginError);
  };

  const onLoginSuccess = (response) => {
    console.log(response);
    navigate("/");
    toastr.success("Successfully logged in!");
  };

  const onLoginError = (err) => {
    console.log(err);
    toastr.error("Login Failed!");
  };

  return (
    <React.Fragment>
      <h1>Login</h1>

      <form>
        <div class="mb-3">
          <label htmlFor="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            name="email"
            value={userLoginData.email}
            onChange={onChange}
            placeholder="Please Enter Your Email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label htmlFor="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            name="password"
            id="exampleInputPassword1"
            placeholder="Please Enter Your Password"
            value={userLoginData.password}
            onChange={onChange}
          ></input>
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="exampleCheck1"
          ></input>
          <label class="form-check-label" htmlFor="exampleCheck1">
            Remember Me
          </label>
        </div>
        <button type="submit" onClick={onLoginClicked} class="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default Login;
