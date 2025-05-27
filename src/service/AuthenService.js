import axios from "axios";
import { BASE_URL } from "./base/BaseURL";

const REST_API_BASE_URL = BASE_URL + "/auth";

export const login = (values) => {
    const requestBody = {
        username: values.username,
        password: values.password
    }
    return axios.post(`${REST_API_BASE_URL}/login`, requestBody)
}

export const logout = (refreshToken) => {
    return axios.post(`${REST_API_BASE_URL}/logout`, {}, {
        headers: {
            'x-token': refreshToken
        }
    })
}