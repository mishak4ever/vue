import axios from "axios";
import router from "./router";
const config = require("../../env.paths.json");

axios.defaults.baseURL = config.API_BASE_URL;

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

axios.interceptors.request.use(
  function(config) {
    // console.log("request", config);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("Refresh user token");
        let config = error.config;
        const response = await axios.post("/refreshToken");
        axios.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        localStorage.setItem("token", response.data.token);
        config.headers["Authorization"] = `Bearer ${response.data.token}`;

        return axios(config);
      }
      if (error.response.status === 400) {
        localStorage.setItem("token", "");
        router.replace("/login");
        console.log("Wrong token");
      }
    }
    return Promise.reject(error);
  }
);
// axios.interceptors.request.eject(myInterceptor);

export default axios;
