import React, { useState, useEffect, useCallback } from "react";
import * as friendsService from "../users/friendsService";
import Person from "./FriendsCard";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";

function Friends() {
  const [friendsData, setFriendsData] = useState({
    arrayOfFriends: [],
    friendsComponents: [],
  });

  //            PAGINATION
  // create state for changing the currentPage
  // add pageIndex and pageSize properties to state

  const [pageSettings, setPageSettings] = useState({
    pageIndex: 0,
    pageSize: 3,
    current: 1,
    totalCount: 0,
  });

  const [count, setCount] = useState(0);

  const [toggle, setToggle] = useState(true);

  const onPageChange = (page) => {
    console.log("page", page);
    setPageSettings((prevState) => {
      let pd = { ...prevState };
      pd.current = page;
      pd.pageIndex = page - 1;

      return pd;
    });
  };

  //             SEARCH
  const [search, setSearch] = useState({
    search: "",
  });

  false && console.log(search);

  false && console.log(setSearch);

  const onDeleteRequest = useCallback((myFriend, e) => {
    console.log(myFriend.id, { myFriend, e });

    const handler = deleteSuccessHandler(myFriend.id);

    friendsService.deleteFriend(myFriend.id).then(handler).catch(onDeleteError);
  }, []);

  const deleteSuccessHandler = (idToBeDeleted) => {
    console.log("getDeleteSuccessHandler", idToBeDeleted);

    return () => {
      console.log("onDeleteSuccess", idToBeDeleted);

      setFriendsData((prevState) => {
        const pd = { ...prevState };

        pd.arrayOfFriends = [...pd.arrayOfFriends];

        const idxOf = pd.arrayOfFriends.findIndex((friend) => {
          let result = false;

          if (friend.id === idToBeDeleted) {
            result = true;
          }
          return result;
        });

        if (idxOf >= 0) {
          pd.arrayOfFriends.splice(idxOf, 1);
          pd.friendsComponents = pd.arrayOfFriends.map(mapFriend);
        }
        return pd;
      });
    };
  };

  const mapFriend = (aFriend) => {
    // console.log("mapping", aFriend);

    return (
      <Person
        friend={aFriend}
        key={aFriend.id}
        onFriendClick={onDeleteRequest}
      />
    );
  };

  useEffect(() => {
    console.log("firing effect");

    friendsService
      .getFriends(pageSettings.pageIndex, pageSettings.pageSize)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  }, [pageSettings.pageIndex]);

  const onGetFriendsSuccess = (response) => {
    console.log(response);

    //conditional chaining js*** mozilla
    //if (response?.data?.item?.pagedItems){

    let arrayOfPeeps = response.data.item.pagedItems;
    console.log({ arrayOfPeeps });

    setFriendsData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfFriends = arrayOfPeeps;
      pd.friendsComponents = arrayOfPeeps.map(mapFriend);
      return pd;
    });
  };

  const onGetFriendsError = (err) => {
    console.error(err);
  };

  const onDeleteError = (err) => {
    console.error("Deleting", err);
  };

  const onHeaderClicked = () => {
    setCount((prevState) => {
      return prevState + 1;
    });
  };

  // ================ searchBar ==============

  const onSearchChange = (e) => {
    console.log("We are searching", { syntheticEvent: e });
    const target = e.target;
    const newSearchValue = target.value;

    setSearch((prevState) => {
      const newSearchObject = {
        ...prevState,
      };

      newSearchObject.searchQuery = newSearchValue;
      return newSearchObject;
    });
  };

  const onSearchClick = () => {
    friendsService
      .searchFriend(search.searchQuery)
      .then(onGetFriendsSuccess)
      .catch(getSearchError);
  };
  const getSearchError = (err) => {
    console.log(err, "Search Error");
  };

  return (
    <React.Fragment>
      <h1>Friends </h1>
      <div>
        <form>
          <div className="row g-3 align-items-center">
            <div className="col-auto"></div>
            <div className="col-auto">
              <input
                type="text"
                id="searchBar"
                name="searchBar"
                className="form-control"
                aria-describedby="searchBarLine"
                onChange={onSearchChange}
              />
            </div>
            <div className="container">
              <Pagination
                defaultPageSize={1}
                total={4}
                locale={locale}
                onChange={onPageChange}
              />
            </div>
            <div className="col-auto">
              <Button
                className="btn btn-outline-light btn-sm"
                onClick={onSearchClick}
              >
                Search
              </Button>
            </div>
          </div>
        </form>
        <br></br>
        <button
          type="submit"
          onClick={() => setToggle(!toggle)}
          className="btn btn-primary"
          id="renderFriendsBtn"
        >
          Toggle
        </button>
        <div>
          <Link to="/friends/new">
            <button type="submit" className="btn btn-primary">
              Add Friend
            </button>
          </Link>
        </div>
      </div>
      {toggle && (
        <div className="container">
          <h3 onClick={onHeaderClicked}>Rendering{count}</h3>
          <div className="row">{friendsData.arrayOfFriends.map(mapFriend)}</div>
          <Pagination
            defaultPageSize={1}
            total={4}
            locale={locale}
            onChange={onPageChange}
          />
        </div>
      )}
    </React.Fragment>
  );
}
export default Friends;
