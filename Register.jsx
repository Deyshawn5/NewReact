import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./registerService";
import toastr from "toastr";

function Register() {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "U0408PL3YP6",
  });

  const onFormFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });

    //capture info you need from event here as the event object will fall out of scope quickly

    //the event.target will represent the input
    const target = event.target;

    //this is the value of the input, the value in the text box the user types into
    const newUservalue = target.value;

    //this is the name (so be sure to give your form fields a name attribute)
    const nameOfField = target.name;
    console.log({ nameOfField, newUservalue });

    //set the new state using the old property name / object key and using the new value (updatedFormData)
    setUserFormData((prevState) => {
      console.log("updater onChange");

      // copy the personData object from state using the spread operator
      const newUserObject = {
        ...prevState,
      };

      //change the value of the copied object using the name and using bracket notation
      newUserObject[nameOfField] = newUservalue;

      return newUserObject;
    });
    console.log("end onChange");
  };

  const onRegisterClicked = (e) => {
    e.preventDefault();
    let payload = userFormData;
    register(payload).then(onRegisterSuccess).catch(onRegisterError);
  };

  const nav = useNavigate();

  const onRegisterSuccess = () => {
    nav("/Login");
    toastr.success("Registration Success!");
  };

  const onRegisterError = () => {
    toastr.error("Registration Failed!");
  };
  //form control bootstrap for react***
  return (
    <React.Fragment>
      <h1>Register</h1>

      <form>
        <div class="mb-3">
          <label htmlFor="firstName" class="form-label">
            First Name
          </label>
          <input
            type="fName"
            className="form-control"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={userFormData.firstName}
            onChange={onFormFieldChange}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="lastName" class="form-label">
            Last Name
          </label>
          <input
            type="lName"
            className="form-control"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={userFormData.lastName}
            onChange={onFormFieldChange}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="email" class="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            value={userFormData.email}
            onChange={onFormFieldChange}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={userFormData.password}
            onChange={onFormFieldChange}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="passwordConfirm" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="Password Confirm"
            value={userFormData.passwordConfirm}
            onChange={onFormFieldChange}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="avatarUrl" class="form-label">
            Profile Url
          </label>
          <input
            type="profileUrl"
            className="form-control"
            id="avatarUrl"
            name="avatarUrl"
            placeholder="Avatar Url"
            value={userFormData.avatarUrl}
            onChange={onFormFieldChange}
          />
        </div>
        <button
          type="submit"
          onClick={onRegisterClicked}
          class="btn btn-primary"
        >
          Sign Up
        </button>
      </form>
    </React.Fragment>
  );
}

export default Register;
