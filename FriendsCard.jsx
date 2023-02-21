import React from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function FriendsCard(props) {
  const nav = useNavigate();
  const aFriend = props.friend;
  const onLocalFriendClicked = (e) => {
    e.preventDefault();
    props.onFriendClick(props.friend, e);
  };

  const onUpdateClicked = (e) => {
    e.preventDefault();
    const state = { type: "FRIEND_VIEW", payload: aFriend };
    nav(`/friends/${aFriend.id}/edit`, { state });
  };

  return (
    <div className="col-md-3">
      <div className="card">
        <img
          src={aFriend.primaryImage.imageUrl}
          class="card-img-top"
          alt="flower"
        />
        <div className="card-body">
          <h5 className="card-title">{aFriend.title}</h5>
          <p className="card-text">
            Some quick example text to build on the card...
          </p>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={onLocalFriendClicked}
          >
            Delete
          </button>
          <div>
            <button onClick={onUpdateClicked} className="btn btn-primary">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FriendsCard);
