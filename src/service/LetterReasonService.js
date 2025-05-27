import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/letter-reason";

export const getListLetterReason = (type) => {
    const formData = new FormData();
    formData.append("type", type)
    return axiosClient.post(`${REST_API_BASE_URL}/get-letter-reason`, formData)
}

export const getLetterReasonDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/get-letter-reason-detail`, formData)
}