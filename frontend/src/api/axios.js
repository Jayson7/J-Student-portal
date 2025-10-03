import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", // no /api here
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
