import axios from "axios";

const register = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

export { register };