import axios from "axios";
const endpoint = "https://api.remotebootcamp.dev/api/users/current"; 

const login = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload, 
    crossdomain: true,
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
  };
  return axios(config);
}

const getCurrentUser = () => {
  const config = {
    method: "GET",
    url:  endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  
  return axios(config)
}

const getById = (id) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/users/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  
  return axios(config)
}

const logout = () => {
  const config = {
    method: "GET",
    url:  "https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  
  return axios(config)
}

const userService = { login, getCurrentUser, getById, logout }

export default userService;
