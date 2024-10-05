import axios from "axios";

const api = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com/",
  timeout: 7000,
});

export default api;
