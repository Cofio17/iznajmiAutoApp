import axios from "axios";

const base = import.meta.env.VITE_LOCAL_HOST;

const API = axios.create({
    baseURL: base,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default API;