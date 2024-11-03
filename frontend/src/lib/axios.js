import axios from "axios";

const axiosObj = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // send the cookies to server
});

export default axiosObj;
