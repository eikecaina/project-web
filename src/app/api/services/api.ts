import axios from "axios";
const api = axios.create({
  headers: { "Content-type": "Application/json", Accept: "Application/json" },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: '//dcqas012168.weg.net:3255/',
});

export default api;
