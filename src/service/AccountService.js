import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/account";

export const getListAccount = (type) => {
    const formData = new FormData();
    formData.append("type", type)
    return axios.post(`${REST_API_BASE_URL}/get-list-account`, formData)
}

export const getCountAccount = () => {
    return axios.post(`${REST_API_BASE_URL}/get-count-account`)
}

export const lockAccount = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/lock-account`, formData)
}

export const unlockAccount = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/unlock-account`, formData)
}

export const deleteAccount = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-account`, formData)
}

export const activeAccount = (employeeCode, password, roleId) => {
    const requestBody = {
        "employeeCode": employeeCode,
        "password": password,
        "roleId": roleId
    }
    return axios.post(`${REST_API_BASE_URL}/active-account`, requestBody)
}

export const getAccountDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/get-detail-account`, formData)
}

export const changePassword = (id, password) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("password", password);
    return axios.post(`${REST_API_BASE_URL}/change-password`, formData)
}

export const updatePermissionAccount = (id, permissions) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("permissions", permissions);
    return axios.post(`${REST_API_BASE_URL}/update-permission-user`, formData)
}