import axios from "axios";

export const ad = axios.create({
  baseURL: "http://localhost:5000/api/ad",
});

export const user = axios.create({
  baseURL: "http://localhost:5000/api/user",
});

export const auth = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const article = axios.create({
  baseURL: "http://localhost:5000/api/article",
});

export const cart = axios.create({
  baseURL: "http://localhost:5000/api/cart",
});

export const category = axios.create({
  baseURL: "http://localhost:5000/api/category",
});

export const newsletter = axios.create({
  baseURL: "http://localhost:5000/api/newsletter",
});

export const order = axios.create({
  baseURL: "http://localhost:5000/api/order",
});

export const status = axios.create({
  baseURL: "http://localhost:5000/api/status",
});

export const checkout = axios.create({
  baseURL: "http://localhost:5000/api/checkout",
});

export const info = axios.create({
  baseURL: "http://localhost:5000/api/info",
});
