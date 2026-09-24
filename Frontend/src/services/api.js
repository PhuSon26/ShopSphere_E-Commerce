import axios from "axios";

const AUTH_API = axios.create({
  baseURL: "http://localhost:8081/api",
});

const PRODUCT_API = axios.create({
  baseURL: "http://localhost:8082/api",
});

const ORDER_API = axios.create({
  baseURL: "http://localhost:8083/api",
});

// Giữ API default để các file cũ không bị lỗi import
const API = ORDER_API;

export { AUTH_API, PRODUCT_API, ORDER_API };

export default API;