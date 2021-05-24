import axios from "axios";

const blog = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default blog;
