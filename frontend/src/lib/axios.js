import axios from "axios";

const axiosObj = axios.create({
  baseURL: import.meta.mode === "development" ? "http://localhost:8080/api" : "/api",
  withCredentials: true, // send the cookies to server
});

export default axiosObj;
