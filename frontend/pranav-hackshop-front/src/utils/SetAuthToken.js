import axios from "axios";

const SetAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    localStorage.setItem("jwt", token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
  }
};

export default SetAuthToken;
