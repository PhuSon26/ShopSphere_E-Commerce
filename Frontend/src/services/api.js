import axios from "axios";

const AUTH_API = axios.create({
  baseURL: "/api",
});

const PRODUCT_API = axios.create({
  baseURL: "/api",
});

const ORDER_API = axios.create({
  baseURL: "/api",
});

const PAYMENT_API = axios.create({
  baseURL: "/api",
});

// Giữ API default để tương thích với các file cũ
const API = ORDER_API;

export {
  AUTH_API,
  PRODUCT_API,
  ORDER_API,
  PAYMENT_API,
};

export default API;
