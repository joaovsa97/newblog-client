import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: "https://newblog-api.onrender.com",
    // baseURL: "http://localhost:8800",
    withCredentials: true,
    Authorization: Cookies.get("access_token")
})