import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/admin/job-position";

export const createJobPosition = (name, dutyId, roleId, salaryFrom, salaryTo, des) => {
    const requestBody = {
        "name": name,
        "dutyId": dutyId,
        "roleId": roleId,
        "salaryFrom": salaryFrom,
        "salaryTo": salaryTo,
        "des": des
    }
    return axiosClient.post(`${REST_API_BASE_URL}/create-job-position`, requestBody)
}

export const updateJobPosition = (id, name, dutyId, roleId, salaryFrom, salaryTo, des) => {
    const requestBody = {
        "id": id,
        "name": name,
        "dutyId": dutyId,
        "roleId": roleId,
        "salaryFrom": salaryFrom,
        "salaryTo": salaryTo,
        "des": des
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-job-position`, requestBody)
}

export const getJobPositionDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/get-job-position-detail`, formData)
}

export const deleteJobPosition = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/delete-job-position`, formData)
}
