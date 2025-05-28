import axiosClient from "../config/AxiosClient";
const REST_API_BASE_URL = "admin/account";

export const getListAccount = (values) => {
    console.log(values)
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status === 0 || values.status === '' || !values.status ? 1 : values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
    }
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-account`, requestBody)
}


export const getCountAccountType = (values) => {
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
    }
    return axiosClient.post(`${REST_API_BASE_URL}/get-count-account-type`, requestBody)
}


export const getCountAccount = (values) => {
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
    }
    return axiosClient.post(`${REST_API_BASE_URL}/get-count-account`, requestBody)
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