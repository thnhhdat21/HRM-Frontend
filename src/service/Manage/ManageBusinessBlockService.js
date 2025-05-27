import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/admin/business";

export const createBusinessBlock = (name, code) => {
    const requestBody = {
        "name": name,
        "code": code,
    }
    return axiosClient.post(`${REST_API_BASE_URL}/create-business-block`, requestBody)
}

export const getBusinessBlock = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-business-block`)
}

export const deleteBusinessBlock = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/delete-business-block`, formData)
}

export const updateBusinessBlock = (id, name, code) => {
    const requestBody = {
        "id": id,
        "name": name,
        "code": code,
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-business-block`, requestBody)
}