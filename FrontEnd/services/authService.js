import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  timeout: 10000,
});

export const registerUser = (data) => {
  return API.post("/register", data);
};

export const loginUser = (data) => {
  return API.post("/login", data);
};

export const getProfile = (token) => {
  return API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};