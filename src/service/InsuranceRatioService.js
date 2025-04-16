import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/insurance-ratio";

export const getInsuranceRatios = () => {
    return axios.post(`${REST_API_BASE_URL}/get-insurance-ratios`)
}

export const getInsuranceRatioDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/get-insurance-ratio-detail`, formData)
}

export const createInsuranceRatio = (list) => {
    return axios.post(`${REST_API_BASE_URL}/create-insurance-ratio`, list)
}

export const updateInsuranceRatio = (list) => {
    return axios.post(`${REST_API_BASE_URL}/update-insurance-ratio`, list)
}

export const deleteInsuranceRatio = (list) => {
    return axios.post(`${REST_API_BASE_URL}/delete-insurance-ratio`, list)
}
