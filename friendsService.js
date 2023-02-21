import axios from "axios";
const endpoint = "https://api.remotebootcamp.dev/api/friends"

let getFriends = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

//`${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,

let deleteFriend = (id) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
}

let editFriend = (id, payload) => {
  const config = {
    method: "PUT",
    data: payload,
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  
  return axios(config)
}


let newFriend = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  
  return axios(config)
}


let searchFriend = (searchQuery) => {
  const config = {
    method: "GET",
    url:  `${endpoint}/search?pageIndex=0&pageSize=5&q=${searchQuery}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  
  return axios(config)
}

let getAllFriends = () => {
  const config = {
    method: "GET",
    url:  endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  
  return axios(config)
}


export { getFriends, deleteFriend, editFriend, newFriend, searchFriend, getAllFriends};  
