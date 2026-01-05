import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const client = axios.create({
  baseURL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default client;
