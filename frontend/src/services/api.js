import axios from "axios";

const api = axios.create({
  // this is the base URL for the backend API. Adjust if your backend is running on a different host or port.
  baseURL: "http://localhost:8000",
});

export default api;
