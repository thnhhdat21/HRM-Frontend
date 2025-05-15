import axios from "axios";
import Cookies from "js-cookie";
const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/v1/hrm',
    timeout: 10000
});

axiosClient.interceptors.request.use(async (config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
})


export default axiosClient;