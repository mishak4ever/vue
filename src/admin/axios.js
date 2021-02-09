import axios from "axios";

axios.defaults.baseURL = "https://webdev-api.loftschool.com"

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

/*
  axios.interceptors.response.use((response) => {
    console.log('response', response)
    return response
  }, (error) => {
    if (error.response.status == 401) {

    }
    console.log('1111error', error.response.status)
    // return Promise.reject(error);
  })
*/

export default axios;