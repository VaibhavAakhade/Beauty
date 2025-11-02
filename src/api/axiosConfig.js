// src/api/axiosInstance.ts
import axios from "axios";
// Create Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8085/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});
export default axiosInstance;
