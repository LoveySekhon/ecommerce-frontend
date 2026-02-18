import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-backend-api-1mbm.onrender.com/api"
});


export default api;
