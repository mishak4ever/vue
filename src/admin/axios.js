import axios from "axios";

axios.defaults.baseURL = "https://webdev-api.loftschool.com"

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQzMCwiaXNzIjoiaHR0cDovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vbG9naW4iLCJpYXQiOjE2MTI0NjIwMjcsImV4cCI6MTYxMjQ2MjA4NywibmJmIjoxNjEyNDYyMDI3LCJqdGkiOiJKajZxTlZlZmpyN2FMSVdnIn0.QdFwGGnsRNgimqCo73lpipf7UzwDtGMHi3kEnw8u_DE";
// const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default axios;