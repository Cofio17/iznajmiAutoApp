import axios from "axios";

const base = process.env.NEXT_PUBLIC_SERVER;

const API = axios.create({
    baseURL: base,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default API;