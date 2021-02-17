import axios from "axios";
const config = require("../../env.paths.json");

axios.defaults.baseURL = config.API_BASE_URL;
axios.UserId = config.USER_ID;
export default axios;
