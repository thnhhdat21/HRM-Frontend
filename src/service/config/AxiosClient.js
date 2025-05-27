import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../base/BaseURL";
const axiosClient = axios.create({
    baseURL: BASE_URL,
    // timeout: 10000
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


// axiosClient.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         const originalRequest = err.config;
//         if (err.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const refreshToken = Cookies.get("refreshToken")
//             if (!refreshToken) return Promise.reject(err);

//             try {
//                 const res = await axios.post(
//                     `${BASE_URL}/auth/refresh`,
//                     {},
//                     {
//                         headers: {
//                             'x-token': refreshToken
//                         }
//                     }
//                 );
//                 const newAccessToken = res.data.data.accessToken
//                 Cookies.set("token", newAccessToken);
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return axiosClient(originalRequest)
//             } catch (error) {
//                 Cookies.remove('token')
//                 Cookies.remove('refreshToken')
//                 return Promise.reject(error);
//             }
//         }
//     }
// )

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}


axiosClient.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = Cookies.get("refreshToken")
            if (!refreshToken) return Promise.reject(err);
            if (isRefreshing) {
                return new Promise((resolve) => {
                    addRefreshSubscriber((token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(axiosClient(originalRequest));
                    });
                });
            }
            isRefreshing = true;
            try {
                const res = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    {},
                    {
                        headers: {
                            'x-token': refreshToken
                        }
                    }
                );
                const newAccessToken = res.data.data.accessToken
                Cookies.set("token", newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                onRefreshed(newAccessToken);
                return axiosClient(originalRequest)
            } catch (error) {
                Cookies.remove('token')
                Cookies.remove('refreshToken')
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }
    }
)

export default axiosClient;