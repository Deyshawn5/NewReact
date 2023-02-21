import React from "react";

function Home(props) {
  console.log(props.user);
  //     Optional Chaining Operator = ?.
  //    <h1>I am Home. Welcome {props.user?.firstName}</h1>
  // also equal   <h1>I am Home. Welcome {props.user && props.user.firstName}</h1>
  // or <h1>I am Home. Welcome {props.user ? props.user.firstName : ""}</h1>

  return (
    <React.Fragment>
      <h1>I am Home. Welcome {props.user.firstName}</h1>
    </React.Fragment>
  );
}

export default Home;
