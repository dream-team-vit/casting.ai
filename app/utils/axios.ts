import axios from "axios";

console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
