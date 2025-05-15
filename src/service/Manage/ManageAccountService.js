import axiosClient from "../config/AxiosClient";
const REST_API_BASE_URL = "admin/account";

export const getListAccount = (type) => {
    const formData = new FormData();
    formData.append("type", type)
    console.log(type)
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-account`, formData)
}

export const getCountAccount = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-count-account`)
}

export const lockAccount = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/lock-account`, formData)
}

export const unlockAccount = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/unlock-account`, formData)
}

export const deleteAccount = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/delete-account`, formData)
}

export const activeAccount = (employeeCode, password) => {
    const requestBody = {
        "employeeCode": employeeCode,
        "password": password
    }
    return axiosClient.post(`${REST_API_BASE_URL}/active-account`, requestBody)
}

export const getAccountDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/get-detail-account`, formData)
}

export const changePassword = (id, password) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("password", password);
    return axiosClient.post(`${REST_API_BASE_URL}/change-password`, formData)
}

export const updatePermissionAccount = (id, permissions) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("permissions", permissions);
    return axiosClient.post(`${REST_API_BASE_URL}/update-permission-user`, formData)
}