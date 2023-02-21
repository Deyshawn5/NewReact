import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Friends from "./components/friends/Friends";
import Blogs from "./components/blogs/Blogs";
import Jobs from "./components/jobs/Jobs";
import TechCompanies from "./components/techCompanies/TechCompanies";
import Events from "./components/events/Events";
import TestAjax from "./components/TestAjax";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import NewFriend from "./components/friends/NewFriend";
import "./assets.css";
//import Car from "./components/codeChallenge/Car";
import Product from "./components/productSender/ProductSender";
import CarsModel from "./components/CarsModel";
import Aircraft from "./components/Aircraft";
import Cars from "./components/codeChallenge/Cars";
import userService from "./components/users/userService";

function App() {
  const [currentUser, setCurrentUser] = useState({
    firstName: "Unknown ",
    lastName: "User",
    email: "fdeyshawn2@gmail.com",
    avatarUrl: "https://tinyurl.com/4zheyhhj",
    isLoggedIn: false,
  });

  const location = useLocation();

  useEffect(() => {
    userService
      .getCurrentUser()
      .then(onCurrentUserSuccess)
      .catch(onCurrentUserErr);
  }, [location]);

  const onCurrentUserSuccess = (response) => {
    console.log(response);
    const userId = response.data.item.id;
    userService.getById(userId).then(onGetByIdSuccess).catch(onGetByIdErr);
  };

  const onCurrentUserErr = (err) => {
    console.log(err);
  };

  const onGetByIdSuccess = (response) => {
    console.log(response);
    const user = response.data.item;
    setCurrentUser((prevState) => {
      const currentUser = { ...prevState };
      currentUser.firstName = user.firstName;
      currentUser.lastName = user.lastName;
      currentUser.isLoggedIn = true;

      return currentUser;
    });
  };

  const onGetByIdErr = (err) => {
    console.log(err);
  };

  const [cars] = useState([
    {
      make: "Kia",
      model: "Sorento",
      year: 2020,
    },
    {
      make: "Kia",
      model: "Optima",
      year: 2019,
    },
    {
      make: "Tesla",
      model: "Model 3",
      year: 2021,
    },
    {
      make: "Honda",
      model: "Civic",
      year: 2019,
    },
    {
      make: "Honda",
      model: "Accord",
      year: 2018,
    },
    {
      make: "Volkswagen",
      model: "Jetta",
      year: 2021,
    },
  ]);

  return (
    <React.Fragment>
      <SiteNav currentUser={currentUser} updateUser={setCurrentUser}></SiteNav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home user={currentUser} />}></Route>
          <Route path="/friends" element={<Friends />}></Route>
          <Route path="/friends/new" element={<NewFriend />}></Route>
          <Route path="/friends/:friendId/edit" element={<NewFriend />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/techCompanies" element={<TechCompanies />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/testAjax" element={<TestAjax />}></Route>
          <Route path="/login" element={<Login user={currentUser} />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/carsModel" element={<CarsModel user={cars} />}></Route>
          <Route path="/aircraft" element={<Aircraft />} />
          <Route path="/cars" element={<Cars />} />

          <Route
            path="/sender"
            element={<Product user={currentUser} />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
