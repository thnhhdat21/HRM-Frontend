import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/role";

export const createRole = (name, code, desc, permissions) => {
    const requestBody = {
        "name": name,
        "code": code,
        "desc": desc,
        "permissions": permissions
    }
    return axios.post(`${REST_API_BASE_URL}/create-role`, requestBody)
}

export const getListRole = () => {
    return axios.post(`${REST_API_BASE_URL}/list-role`)
}

export const getRoleDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/role-detail`, formData)
}

export const deleteRole = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-role`, formData)
}

export const updateRole = (id, name, code, desc, permissions) => {
    const requestBody = {
        "id": id,
        "name": name,
        "code": code,
        "desc": desc,
        "permissions": permissions
    }
    return axios.post(`${REST_API_BASE_URL}/update-role`, requestBody)
}


export const updateRoleNoUpdatePermission = (id, name, code, desc, permissions) => {
    const requestBody = {
        "id": id,
        "name": name,
        "code": code,
        "desc": desc,
        "permissions": permissions
    }
    return axios.post(`${REST_API_BASE_URL}/update-role-no-update-permission`, requestBody)
}

export const getPermission = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/get-permission`, formData)
}
