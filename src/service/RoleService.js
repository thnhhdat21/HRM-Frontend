import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "admin/role";

export const createRole = (name, code, desc, permissions) => {
    const requestBody = {
        "name": name,
        "code": code,
        "desc": desc,
        "permissions": permissions
    }
    console.log(requestBody)
    return axiosClient.post(`${REST_API_BASE_URL}/create-role`, requestBody)
}

export const getListRole = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/list-role`)
}

export const getRoleDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/role-detail`, formData)
}

export const deleteRole = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/delete-role`, formData)
}

export const updateRole = (id, name, code, desc, permissions) => {
    const requestBody = {
        "id": id,
        "name": name,
        "code": code,
        "desc": desc,
        "permissions": permissions
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-role`, requestBody)
}


export const updateRoleNoUpdatePermission = (id, name, code, desc, permissions) => {
    const requestBody = {
        "id": id,
        "name": name,
        "code": code,
        "desc": desc,
        "permissions": permissions
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-role-no-update-permission`, requestBody)
}

export const getPermission = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/get-permission`, formData)
}
