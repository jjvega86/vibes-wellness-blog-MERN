import axios from "axios";

const blog = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default blog;
