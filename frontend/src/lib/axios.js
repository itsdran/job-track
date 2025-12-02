import axios from "axios";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "";

const api = axios.create({
    baseURL: `${BASE_URL}/api`,
});

export default api;