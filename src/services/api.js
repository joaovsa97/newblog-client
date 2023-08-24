import axios from "axios";

export const api = axios.create({
    baseURL: "https://newblog-api.onrender.com",
    // baseURL: "http://localhost:8800",
    withCredentials: true,
    // Authorization: document.cookie
    headers: {
        Authorization : document.cookie
    }
})