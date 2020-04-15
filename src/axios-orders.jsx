import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-c9c68.firebaseio.com/",
});

export default instance;
