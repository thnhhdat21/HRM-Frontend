import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/approval-reason";

export const getListApprovalReason = (type) => {
    const formData = new FormData();
    formData.append("type", type)
    return axios.post(`${REST_API_BASE_URL}/get-approval-reason`, formData)
}

export const createApprovalReason = (list) => {
    return axios.post(`${REST_API_BASE_URL}/create-approval-reason`, list)
}

export const updateApprovalReason = (id, values) => {
    const requestBody = {
        "id": id,
        "reason": values.reason || null,
        "symbol": values.symbol || null,
        "maximum": values.maximum || null,
        "unit": values.unit || null,
        "workDayEnabled": values.workDayEnabled || null,
        "goLate": values.goLate || null,
        "backEarly": values.backEarly || null,
        "type": values.type || null,
        "des": values.des || null
    }
    return axios.post(`${REST_API_BASE_URL}/update-approval-reason`, requestBody)
}

export const deleteApprovalReason = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-approval-reason`, formData)
}

export const getApprovalReasonDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/get-approval-reason-detail`, formData)
}