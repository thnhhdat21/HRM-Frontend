import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/auth";

export const login = (values) => {
    const requestBody = {
        username: values.username,
        password: values.password
    }
    return axiosClient.post(`${REST_API_BASE_URL}/login`, requestBody)
}
